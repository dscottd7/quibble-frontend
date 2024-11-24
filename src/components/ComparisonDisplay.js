import React from 'react';
import { Card, List, Title, Text, Divider, Grid, Box } from '@mantine/core';

const ComparisonDisplay = ({comparisonData}) => {

  const {
    brief_comparison_title,
    product1,
    product2,
    pros_product1,
    pros_product2,
    cons_product1,
    cons_product2,
    comparison_summary,
  } = comparisonData;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md" c="cyan" >
        {brief_comparison_title}
      </Title>

      <Text mt="md" weight={700} >
        <strong>Summary</strong>
      </Text>
      <Text mt="sm" mb="lg">
        {comparison_summary}
      </Text>

      <Divider my="sm" />

      <Grid gutter="lg">
        <Grid.Col span={5.5}>
          <Box pl="10px">
            <Title order={4} c="cyan" >{product1}</Title>
            <Text weight={700} mt="sm" ><strong>Pros:</strong></Text>
            <List spacing="xs">
              {pros_product1.map((pro, index) => (
                <List.Item key={index}>{pro}</List.Item>
              ))}
            </List>

            <Text weight={700} mt="sm" ><strong>Cons:</strong></Text>
            <List spacing="xs">
              {cons_product1.map((con, index) => (
                <List.Item key={index}>{con}</List.Item>
              ))}
            </List>
          </Box>
        </Grid.Col>

        <Grid.Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
          <Divider orientation="vertical" />
        </Grid.Col>

        <Grid.Col span={5.5}>
          <Box pr="10px">
            <Title order={4} c="cyan" >{product2}</Title>
            <Text weight={500} mt="sm" ><strong>Pros:</strong></Text>
            <List spacing="xs">
              {pros_product2.map((pro, index) => (
                <List.Item key={index}>{pro}</List.Item>
              ))}
            </List>

            <Text weight={500} mt="sm" ><strong>Cons:</strong></Text>
            <List spacing="xs">
              {cons_product2.map((con, index) => (
                <List.Item key={index}>{con}</List.Item>
              ))}
            </List>
          </Box>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default ComparisonDisplay;
