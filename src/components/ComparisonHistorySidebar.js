import React from 'react';
import PropTypes from 'prop-types';
import { Box, CloseButton, Text, Title, Card, Grid, Stack, Flex } from '@mantine/core';
import '../styles/ComparisonHistorySidebar.css';

const ComparisonHistorySidebar = ({ history, onDelete, onSelect }) => {
  return (
    <Box>
      <Title order={3}>
        Previous Comparisons
      </Title>
      <Stack
        align="stretch"
        justify="center"
        gap="md"
      >
        {history.map((item, index) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={index} sx={{ position: 'relative' }}>
            <Grid>
              <Grid.Col span={10}>
                <Text
                  className="comparison-title"
                  onClick={() => onSelect(item.data)}
                  fw={500} // font-weight: 500
                  sx={{ fontSize: '16px', marginBottom: '10px' }}
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
                    onClick={() => onDelete(index)} 
                    sx={{ position: 'absolute', top: 10, right: 10 }} 
                  />
                </Flex>
              </Grid.Col>
            </Grid>

            {/* Display the URLs used for the comparison */}
            {item.urls && (
              <div className="comparison-urls">
                {item.urls.url1 && (
                  <div className="product-link">
                    <a href={item.urls.url1} target="_blank" rel="noopener noreferrer">
                      Product 1
                    </a>
                  </div>
                )}
                {item.urls.url2 && (
                  <div className="product-link">
                    <a href={item.urls.url2} target="_blank" rel="noopener noreferrer">
                      Product 2
                    </a>
                  </div>
                )}
              </div>
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
      uurls: PropTypes.shape({
        url1: PropTypes.string.isRequired,
        url2: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export default ComparisonHistorySidebar;


