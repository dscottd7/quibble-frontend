import React from 'react';
import PropTypes from 'prop-types';
import { Box, CloseButton, Text, Title, Card, Grid, Stack, Flex, Button, Space } from '@mantine/core';
import '../styles/ComparisonHistorySidebar.css';

const ComparisonHistorySidebar = ({ history, onDelete, onSelect, onClearAll }) => {
   // debug tool -- uncomment this to seewhat is being passed as history: console.log('History data in sidebar:', history);
  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Title order={4} c="cyan" >
          Saved Comparisons
        </Title>
        {history.length > 0 && (
          <Button 
            variant="subtle" 
            color="red" 
            size="xs" 
            onClick={onClearAll} 
            sx={{ cursor: 'pointer' }}
          >
            Clear All
          </Button>
        )}
      </Flex>
      <Space h="md" />
      <Stack
        align="stretch"
        justify="center"
        gap="md"
      >
        {history.map((item, index) => (
          <Card 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder 
            key={index}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              }}
            onClick={() => onSelect(item.data)}
          >
            <Grid>
              <Grid.Col span={10}>
                <Text
                  fw={500}
                  sx={{ fontSize: '16px', marginBottom: '10px' }}
                  onClick={() => onSelect(item.data)}
                >
                  {item.title || `Comparison ${index + 1}`}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Flex
                  gap="md"
                  justify="flex-end"
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                >
                  <CloseButton 
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }} 
                  />
                </Flex>
              </Grid.Col>
            </Grid>

            {/* Display the URLs used for the comparison */}
            {item.urls && (
              <Stack pt="10px" >
                {item.urls.url1 && (
                  <Text
                    c="cyan"
                    td="underline"
                    component='a'
                    href={item.urls.url1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.product1}

                  </Text>
                )}
                {item.urls.url2 && (
                  <Text
                    c="cyan"
                    td="underline"
                    component='a'
                    href={item.urls.url2}
                    target="_blank"
                  >
                      {item.product2}
                  </Text>
                )}
              </Stack>
            )}
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

ComparisonHistorySidebar.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      product1: PropTypes.string.isRequired,
      product2: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        url1: PropTypes.string.isRequired,
        url2: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
};


export default ComparisonHistorySidebar;


