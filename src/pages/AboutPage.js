import React, { useState, useEffect, useRef } from 'react';
import { Progress, Grid, Button, Text, Title, Group, Box, Stack, Container, Space } from '@mantine/core';

const AboutPage = () => {

  return (
    <Container
      size="lg"
      styles={{
        maxWidth: '1200px',
      }}
    >
      <Grid gutter={{ base: 10, xs: 'md', md: 'xl', xl: 60 }}>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Title order={2}>About Page!</Title>
          <Text h="xxl">
            More text
          </Text>
          <Space h="md" />
          <Text h="xxl">
            Even more text
          </Text>
          <Space h="lg" />
        </Grid.Col>
    
        <Grid.Col span={{ base: 12, md: 4 }}>
        <Text h="xxl">
            Side column
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AboutPage;
