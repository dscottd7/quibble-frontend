import React, { useState, useEffect, useRef } from 'react';
import { Progress, Grid, Button, Text, Title, Group, Box, Stack, Container, Space, Center, List, Anchor, Image, Card } from '@mantine/core';

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
            <Title mb="20px" c="cyan" order={2}>Quibble's Tech Stack</Title>
            <List size="sm" mb="10px">
              <List.Item> 
                <Text>
                  The frontend of Quibble is built using <Anchor c="cyan" href="https://react.dev/" target="_blank" underline="hover">React</Anchor>, 
                  leveraging <Anchor c="cyan" href="https://mantine.dev/" target="_blank" underline="hover">Mantine</Anchor> components for a modern, responsive, and accessible user interface.
                </Text>
              </List.Item>
              <List.Item> 
                <Text>
                  The backend of Quibble is powered by <Anchor c="cyan" href="https://fastapi.tiangolo.com/" target="_blank" underline="hover">FastAPI</Anchor> for high-performance APIs and uses  <Anchor c="cyan" href="https://www.selenium.dev/" target="_blank" underline="hover">Selenium</Anchor> for dynamic web scraping and automation tasks.
                </Text>                
              </List.Item>
              <List.Item>
                <Text> 
                  Frontend and backend connected via <Anchor c="cyan" href="https://fastapi.tiangolo.com/reference/websockets/" target="_blank" underline="hover">websockets</Anchor>.
                </Text>
              </List.Item>
            </List>
            <Stack align="center">
              <Image src="/quibblearchitecture.png" alt="logo" maxWidth="100%" />
              <Text>Quibble Architecture</Text>
            </Stack>
            <Space h={75} />
            <Stack align="center">
              <Image src="/deployment.png" alt="logo" maxWidth="100%" />
              <Text>Backend Deployment to Google Cloud Run</Text>
            </Stack>

          
          </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>

            <Title mb="20px" c="cyan" order={2}>Fork It, Run It, Love It</Title>
            <List size="sm" mb="10px">
              <List.Item> 
                <Text>Quibble <Anchor c="cyan" href="https://github.com/dscottd7/quibble-frontend" target="_blank" underline="hover">Frontend</Anchor> and <Anchor c="cyan" href="https://github.com/dscottd7/quibble-backend" target="_blank" underline="hover">Backend</Anchor> on GitHub.
                </Text>
              </List.Item>
              <List.Item> 
                <Text>Quibble <Anchor c="cyan" href="https://hub.docker.com/r/jbh14/quibble-frontend/tags" target="_blank" underline="hover">Frontend</Anchor> and <Anchor c="cyan" href="https://hub.docker.com/r/jbh14/quibble-backend/tags" target="_blank" underline="hover">Backend</Anchor> Docker Images.
                </Text>
              </List.Item>
            </List>
            
            <Space h="md" />

            <Title mb="20px" c="cyan" order={2}>The Quibble Crew</Title>
            
              <Text>
                Quibble was built as a capstone project for Oregon State University's CS 467, Fall 2024.
                The Quibble team is:
              </Text>
              <Space h="md" />
              <Grid gutter="lg">
                {/* Row 1 */}
                <Grid.Col span={{ base: 12, md: 6, sm: 6 }}>
                  <Card shadow="sm" padding="lg" style={{ margin: '0 auto', maxWidth: '100%' }}>
                    <Card.Section>
                      <Image src="/scott_bw.jpg" h={200} alt="Scott DiPerna" />
                    </Card.Section>
                    <Title order={4} mt="md">
                      <Anchor c="cyan" href="https://www.linkedin.com/in/dscottdiperna/" target="_blank" underline="hover">Scott DiPerna</Anchor>
                    </Title>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, sm: 6 }}>
                  <Card shadow="sm" padding="lg" style={{ margin: '0 auto', maxWidth: '100%' }}>
                    <Card.Section>
                      <Image src="/xinrui.png" h={200} alt="Xinrui Hou" />
                    </Card.Section>
                    <Title order={4} mt="md">
                      <Anchor c="cyan" href="https://www.linkedin.com/in/xinruihou/" target="_blank" underline="hover">Xinrui Hou</Anchor>
                    </Title>
                  </Card>
                </Grid.Col>

                {/* Row 2 */}
                <Grid.Col span={{ base: 12, md: 6, sm: 6 }}>
                  <Card shadow="sm" padding="lg" style={{ margin: '0 auto', maxWidth: '100%' }}>
                    <Card.Section>
                      <Image src="/edward.png" h={200} alt="Edward Mai" />
                    </Card.Section>
                    <Title order={4} mt="md">
                      <Anchor c="cyan" href="https://www.linkedin.com/in/edward-mai/" target="_blank" underline="hover">Edward Mai</Anchor>
                    </Title>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, sm: 6 }}>
                  <Card shadow="sm" padding="lg" style={{ margin: '0 auto', maxWidth: '100%' }}>
                    <Card.Section>
                      <Image src="/brendan.jpg" h={200} alt="Brendan Heinz" />
                    </Card.Section>
                    <Title order={4} mt="md">
                      <Anchor c="cyan" href="https://www.linkedin.com/in/joseph-brendan-heinz-92353976/" target="_blank" underline="hover">Brendan Heinz</Anchor>
                    </Title>
                  </Card>
                </Grid.Col>
              
              </Grid>
            
          </Grid.Col>
        </Grid>
      </Box>
    </Center>
  );
};

export default AboutPage;
