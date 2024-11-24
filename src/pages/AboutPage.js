import React, { useState, useEffect, useRef } from 'react';
import { Progress, Grid, Button, Text, Title, Group, Box, Stack, Container, Space, Center, List, Anchor, Image } from '@mantine/core';

const AboutPage = () => {

  return (
    <Center>
      <Box maw="1200px" ml="10px" mr="10px" >
        <Grid gutter={{ base: 10, xs: 'md', md: 'xl', xl: 60 }}>
          <Center>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Title mb="20px" c="cyan" order={2}>Why?</Title>
              <List size="sm" mb="10px">
                <List.Item> 
                  While sites like Amazon make it easy to compare products within their platform, what about comparing products from multiple vendors?
                </List.Item>
                <List.Item>
                  A simple side-by-side view isn’t enough—what if you could compare products based on the features that matter most to <i>you</i>?
                </List.Item>
                <List.Item>
                  Even better—how about an unbiased recommendation to help you make the best choice?
                </List.Item>
              </List>
              <Title mb="20px" c="cyan" order={2}>How?</Title>
              <List size="sm" mb="10px">
                <List.Item> 
                  AI is the perfect tool for this challenge.
                </List.Item>
                <List.Item>
                  We gather product details from various sites using Selenium as a web scraping tool.
                </List.Item>
                <List.Item>
                  Combined with your preferences for what matters most, this data can help an AI model (like OpenAI’s ChatGPT) summarize key differences and similarities and offer personalized recommendations.
                </List.Item>
              </List>
              <Title mb="20px" c="cyan" order={2}>What?</Title>
              <List size="sm" mb="10px">
                <List.Item> 
                  Our app collects your preferences through a sleek React frontend.
                </List.Item>
                <List.Item>
                  Then, our FastAPI backend retrieves product info from web pages and uses OpenAI to create a personalized comparison just for you.
                </List.Item>
                <List.Item>
                  You can save comparisons, modify the comparison criteria, request new insights, and even retrieve past comparisons at any time.
                </List.Item>
              </List>
              <Space h="sm" />
              <Title mb="20px" c="cyan" order={1} style={{ fontStyle: "italic" }}>Make smarter decisions—compare, choose, and save time with Quibble.</Title>

          </Grid.Col>
          </Center>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title mb="20px" c="cyan" order={2}>Quibble Architecture</Title>
            <Image src="/quibblearchitecture.png" h={275} alt="architecture" />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
            <Title mb="20px" c="cyan" order={2}>About the authors</Title>
            <Text size="sm" c="dimmed" mb="10px">
              <p>Quibble was started as a capstone project for Oregon State University's CS 467, Fall 2024.</p>
              <p>The Quibble team is:</p>
              <List size="sm" mb="10px">
                <List.Item> 
                  <Anchor c="cyan" href="https://www.linkedin.com/in/dscottdiperna/" target="_blank" underline="hover">Scott DiPerna</Anchor>
                </List.Item>
                <List.Item>
                  <Anchor c="cyan" href="https://www.linkedin.com/in/xinruihou/" target="_blank" underline="hover">Xinrui Hou</Anchor>
                </List.Item>
                <List.Item>
                  <Anchor c="cyan" href="https://www.linkedin.com/in/edward-mai/" target="_blank" underline="hover">Edward Mai</Anchor>
                </List.Item>
                <List.Item>
                  <Anchor c="cyan" href="https://www.linkedin.com/in/joseph-brendan-heinz-92353976/" target="_blank" underline="hover">Brendan Heinz</Anchor>
                </List.Item>
              </List>
            </Text>
          </Grid.Col>
        </Grid>
      </Box>
    </Center>
  );
};

export default AboutPage;
