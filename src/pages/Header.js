import {Container, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/HeaderMenu.module.css';


export function Header() {
    const [opened, { toggle }] = useDisclosure();

    return (
    <header className={classes.header}>
        <Container size='responsive' className={classes.inner}>
            <div className={classes.logo}><h1>Quibble</h1></div>
            {/* <Burger lineSize={3} size='md' opened={opened} onClick={toggle}/> */}
        </Container>
        
    </header>
  );
}