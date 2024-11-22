import {Container, Burger, Image, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/HeaderMenu.module.css';


export function Header() {
    const [opened, { toggle }] = useDisclosure();

    return (
    <header className={classes.header}>
        <Container size='responsive' className={classes.inner}>
            <Image src="/quibble.jpg" h={80} alt="logo" />
            <Title order={1} pl="20px" >Quibble</Title>
            <Burger lineSize={3} size='md' opened={opened} onClick={toggle} className={classes.burger} /> 
        </Container>
        
    </header>
  );
}