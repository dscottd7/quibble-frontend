import { Container, Burger, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';  // Import Link for navigation
import classes from '../styles/HeaderMenu.module.css';

export function Header() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header className={classes.header}>
      <Container size="responsive" className={classes.inner}>
        <div className={classes.logo}>
          <h1>Quibble</h1>
        </div>        

        {/* Mantine Menu - menu items are only visible when target (burger) is open */}
        <Menu opened={opened} onClose={toggle} position="bottom-end">
          <Menu.Target>
            <Burger lineSize={3} size="md" opened={opened} onClick={toggle} className={classes.burger}/>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Link to="/" className={classes.navLink} onClick={toggle}>Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about" className={classes.navLink} onClick={toggle}>About</Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

      </Container>
    </header>
  );
}
