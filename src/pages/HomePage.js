import React, { useState, useEffect, useRef } from 'react';
import { UrlForm } from '../components/UrlForm';
import { Progress, Grid, Button, Text, Title, Group, Box, Stack, Space, Center } from '@mantine/core';
import ComparisonDisplay from '../components/ComparisonDisplay';
import ComparisonHistorySidebar from '../components/ComparisonHistorySidebar';

const HomePage = ({ saveComparison, setSelectedComparison, selectedComparison, history, deleteComparison, clearAllComparisons }) => {
  const STRUCTURED_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL_STRUCTURED || 'ws://localhost:8000/ws/compare/structured';
  const wsRef = useRef(null);
  
  const initialUrlsState = { url1: '', url2: '' };
  const initialPreferencesState = { selected_categories: [], user_preference: '' };
  const [urls, setUrls] = useState(initialUrlsState);
  const [preferences, setPreferences] = useState(initialPreferencesState);
  const [comparisonUrls, setComparisonUrls] = useState(null); // To store URLs used in the comparison
  
  const [status, setStatus] = useState({
    isProcessing: false,
    currentStep: '',  // For showing current progress description
    progressPercetage: 0,  // For showing progress bar % value
    error: '',
    comparison: ''
  });

  function handleWebSocketMessage(event) {
    const data = JSON.parse(event.data);

    switch (data.status) {
      case 'progress':
        // Update progress message
        setStatus(prev => ({
          ...prev,
          currentStep: data.message || 'Processing...'
        }));
        if (data.message === 'Gathering info...') {
          setStatus(prev => ({
            ...prev,
            progressPercetage: 25
          }));
        };
        if (data.message === 'Analyzing...') {
          setStatus(prev => ({
            ...prev,
            progressPercetage: 50
          }));
        };
        if (data.message === 'Generating comparison...') {
          setStatus(prev => ({
            ...prev,
            progressPercetage: 75
          }));
        };
        break;

      case 'comparison':
        // Final comparison received
        setStatus(prev => ({
          isProcessing: false,
          currentStep: '',
          error: '',
          comparison: data.data
        }));
        setComparisonUrls(urls); // Store the URLs used for the comparison
        closeWebSocket();
        break;

      case 'error':
        setStatus(prev => ({
          isProcessing: false,
          currentStep: '',
          error: data.message || 'Failed to compare products. Please try again.',
          comparison: ''
        }));
        closeWebSocket();
        break;

      default:
        console.log('Unknown message type:', data);
    }
  }

  const closeWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // Send close frame with code 1000 (normal closure)
      wsRef.current.close(1000, 'User cancelled operation');
    }
  };

  // Load selected comparison when a previous one is selected from the sidebar
  useEffect(() => {
    if (selectedComparison) {
      setStatus((prev) => ({
        ...prev,
        comparison: selectedComparison,
        isProcessing: false,
        error: '',
      }));
      setComparisonUrls(selectedComparison.urls); // Load the URLs for the selected comparison
      
      if (selectedComparison.title) {
        setStatus((prev) => ({
          ...prev,
          title: selectedComparison.title,
        }));
      }
    }
  }, [selectedComparison]);

  // Handle change events for input fields and preference selection
  const handleChange = (e) => {
    if (Array.isArray(e)) {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        selected_categories: e,
      }));
    } else {
      const { name, value } = e.target || {};
      if (name === 'url1' || name === 'url2') {
        setUrls((prevUrls) => ({
          ...prevUrls,
          [name]: value,
        }));
      } else if (name === 'user_preference') {
        setPreferences((prevPreferences) => ({
          ...prevPreferences,
          user_preference: value,
        }));
      }
    }
  };

  // Handle the form submission to trigger the comparison
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset state
    setStatus({
      isProcessing: true,
      currentStep: 'Starting comparison...',
      error: '',
      comparison: ''
    });
    
    // Close existing WebSocket if any
    closeWebSocket();

    // Create new WebSocket connection
    const ws = new WebSocket(STRUCTURED_WEBSOCKET_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        urls: {
          url1: urls.url1,
          url2: urls.url2
        },
        user_input: {
          selected_categories: preferences.selected_categories,
          user_preference: preferences.user_preference,
        },
      }));
    };

    ws.onmessage = handleWebSocketMessage;
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus(prev => ({
        isProcessing: false,
        currentStep: '',
        error: 'Connection error occurred',
        comparison: ''
      }));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  // Handle user cancelling request
  const handleCancel = () => {
    closeWebSocket();
    setStatus({
      isProcessing: false,
      currentStep: '',
      error: 'Comparison cancelled',
      comparison: ''
    });
  };

  // Clean up WebSocket on unmount
  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);

  // Handle saving the current comparison
  const handleSaveComparison = () => {
    if(status.comparison){
      const title = status.comparison.brief_comparison_title || `Comparison on ${new Date().toLocaleString()}`;
      // Extract the product titles (or assign default values if missing)
      const product1Title = status.comparison.product1 
      const product2Title = status.comparison.product2 
    saveComparison({
      title: title,
      data: status.comparison, // Use status.comparison to ensure you save the latest data.
      product1: product1Title,
      product2: product2Title,
      urls: { ...urls },// Save the URLs used during comparison
    });
    }
  };
  
  // Handle starting a new comparison by resetting the form
  const handleNewComparison = () => {
    resetForm();
  };

  // Reset the form and state to their initial values
  const resetForm = () => {
    setUrls(initialUrlsState);
    setPreferences(initialPreferencesState);
    setStatus({
      isProcessing: false,
      currentStep: '',
      progressPercentage: 0,
      error: '',
      comparison: ''
    });
  };

  return (
    <Center>
      <Box maw="1200px" ml="10px" mr="10px" >
        <Grid gutter={{ base: 10, xs: 'md', md: 'xl', xl: 60 }}>
          <Grid.Col span={history.length > 0 ? { base: 12, md: 8 } : { base: 12, md: 12 }}>
            <Title mb="20px" c="cyan" order={2}>Compare any two products!</Title>
            <Text size="sm" c="dimmed" mb="10px">
              Paste the URL of any two products in the fields below, and click COMPARE
            </Text>
            <Space h="sm" />
            <UrlForm
              urls={urls}
              preferences={preferences}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isDisabled={status.isProcessing}
            />
            <Space h="lg" />
      
            {/* WebSocket status */}
            {status.isProcessing && (
              <Box>
                <Space h="md" />
                <Stack
                  align="stretch"
                  justify="center"
                  gap="md"
                >
                  <Text c="cyan" size="sm">{status.currentStep}</Text>
                  <Progress size="xl" color="cyan" value={status.progressPercetage} striped animated />
                  <Button variant="outline" color="cyan" c="cyan" onClick={handleCancel}>
                    Cancel Request
                  </Button>
                </Stack>
              </Box>
            )}
      
            {/* Error message */}
            {status.error && (
              <Box>
                <Text c="red">{status.error}</Text>
              </Box>
            )}
      
            {/* Comparison Result Section */}
            {status.comparison && !status.error && (
              <Box>
                {/* Save Comparison / New Comparison Buttons */}
                <Group justify="space-between">
                  <Button variant="subtle" size="xs" c="cyan" onClick={handleSaveComparison} style={{ alignSelf: 'flex-start' }}>
                    Save Comparison
                  </Button>
                  <Button variant="subtle" size="xs" c="cyan" onClick={handleNewComparison} style={{ alignSelf: 'flex-end' }}>
                    New Comparison
                  </Button>
                </Group>
                {/* Comparison Content */}
                <Space h="md" />
                <ComparisonDisplay comparisonData={status.comparison}/>
                <Group>
                  {/* Comparison URLs */}
                  {comparisonUrls && (
                    <Box mt="20px">
                      <Title order={4}>Product Links:</Title>
                      {comparisonUrls.url1 && (
                        <Box mt="10px">
                          <Text 
                            component="a"
                            href={comparisonUrls.url1}
                            target="_blank"
                            c="cyan"
                            td="underline"
                          >
                            {/* {String(comparisonUrls.url1)} */}
                            {status.comparison.product1}
                          </Text>
                        </Box>
                      )}
                      {comparisonUrls.url2 && (
                        <Box mt="10px">
                          <Text 
                            component="a"
                            href={comparisonUrls.url2}
                            target="_blank"
                            c="cyan"
                            td="underline"
                          >
                            {/* {String(comparisonUrls.url2)} */}
                            {status.comparison.product2}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  )}
                  
                </Group>
              </Box>
            )}
          </Grid.Col>
          {history.length > 0 && (
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box mt="60px">
                <ComparisonHistorySidebar
                  history={history}
                  onDelete={deleteComparison}
                  onSelect={setSelectedComparison}
                  onClearAll={clearAllComparisons}
                />
              </Box>
            </Grid.Col>
          )}
        </Grid>
      </Box>
    </Center>
  );
};

export default HomePage;
