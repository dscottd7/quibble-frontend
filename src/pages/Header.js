import {Container, Burger, Image, Title, Text, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/HeaderMenu.module.css';


export function Header() {
    const [opened, { toggle }] = useDisclosure();

    return (
    <header className={classes.header}>
        <Container size='responsive' className={classes.inner}>
            <Image src="/quibble.jpg" h={80} alt="logo" />
            <Stack gap="0px">
                <Title order={1} pl="20px" >Quibble</Title>
                <Text size="sm" c="cyan" fw={500} pl="20px" >AI-Based Product Comparison Tool</Text>
            </Stack>
            <Burger lineSize={3} size='md' opened={opened} onClick={toggle} className={classes.burger} /> 
        </Container>
        
    </header>
  );
}