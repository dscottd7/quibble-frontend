import {Container, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/FooterCentered.module.css';

export function Footer() {

  return (

    <footer className={classes.footer}>
      <Container size='responsive' className={classes.inner}>
        <Group gap="xs" justify="center" wrap="nowrap">
          <Text size="sm" fw={500} pl="20px" >
            This application is for informational purposes only. By using this service, you agree to follow all applicable laws and regulations. Unauthorized use is prohibited.  
            2024, 2025 © Scott DiPerna, Xinrui Hou, Edward Mai, Brendan Heinz.
          </Text>
        </Group>     
      </Container>
    </footer>
  );
}
