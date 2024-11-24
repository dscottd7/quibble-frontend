import {React, useState } from 'react';
import { TextInput, Button, Textarea, Switch, Group, Box, Space, ActionIcon } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react';
import classes from '../styles/FormMenu.module.css';

export const UrlForm = ({ urls, preferences, handleChange, handleSubmit, loading, progress}) => {
  
  const [open, setOpen] = useState(false);

  // Added action to clear a unwanted or wrong user url
  const handleClearUrl = (urlKey) => {
    handleChange({ target: { name: urlKey, value: '' } });
  };

  return (
    // <div className={classes.form_container}>
    <Box>
      <form onSubmit={handleSubmit}>
        <Box >
          <TextInput 
            type='url'
            id='url1'
            name='url1'
            value={urls.url1}
            onChange={handleChange}
            placeholder='Product 1 URL'
            required
            className={classes.url_input}
            rightSection={
              <ActionIcon onClick={() => handleClearUrl('url1')} variant="transparent" aria-label="Settings" c="cyan" >
                <IconX size={16} />
              </ActionIcon>
            }
          />
          <TextInput 
            type='url'
            id='url2'
            name='url2'
            value={urls.url2}
            onChange={handleChange}
            placeholder='Product 2 URL'
            required
            className={classes.url_input}
            rightSection={
              <ActionIcon onClick={() => handleClearUrl('url2')} variant="transparent" aria-label="Settings" c="cyan" >
                <IconX size={16} />
              </ActionIcon>
            }
          />
        </Box>

        <Button onClick={() => setOpen(!open)} variant='transparent' color="grey" size='md'>
          {open ? <label className={classes.options_label}>Hide comparison options</label> : <label className={classes.options_label}>More comparison options</label>}
          {open ? <IconChevronUp /> : <IconChevronDown />}
        </Button>
        { open && 
          (<Box>
            <Box>
            <Switch.Group
              value={preferences.selected_categories}
              onChange={handleChange}
              description='Select the categories you want to compare'
            >
              <Group mt="xs">
                <Switch value='Price' label='Price' color="cyan" />
                <Switch value='Model' label='Model' color="cyan" />
                <Switch value='Condition' label='Condition' color="cyan" />
                <Switch value='Features' label='Features' color="cyan" />
                <Switch value='Estimated Delivery' label='Delivery' color="cyan" />
              </Group>
            </Switch.Group>
            </Box>
            <Box>
              <Textarea
                name="user_preference"
                mt="md"
                placeholder="Any additional comparison instructions?"
                onChange={handleChange}
                resize='vertical'
                autosize
                minRows={4}
              />
            </Box>
            <Space h="md" />
        </Box> 
      )}
        <Box>
          <Button fullWidth type="submit" color="cyan" >
            Compare
          </Button>
        </Box>
      </form>

    </Box>
    // </div>
  );
};