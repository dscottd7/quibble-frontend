import {React, useState } from 'react';
import { TextInput, Button, Textarea, Switch, Group} from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from '../styles/FormMenu.module.css';

export const UrlForm = ({ urls, preferences, handleChange, handleSubmit, isLoading}) => {
  
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.form_container}>
      <form onSubmit={handleSubmit}>
        <div >
          <TextInput 
            type='url'
            id='url1'
            name='url1'
            value={urls.url1}
            onChange={handleChange}
            placeholder='Product 1 URL'
            required
            className={classes.url_input}
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
          />
        </div>

        <Button onClick={() => setOpen(!open)} variant='transparent' color="black" size='md'>
          {open ? <label className={classes.options_label}>Hide comparison options</label> : <label className={classes.options_label}>More comparison options</label>}
          {open ? <IconChevronUp /> : <IconChevronDown />}
        </Button>
        { open && 
          (<div className={classes.options}>

            <Switch.Group
              value={preferences.selected_categories}
              onChange={handleChange}
              description='Select the categories you want to compare'
            >
              <Group mt="xs">
                <Switch value='Price' label='Price' />
                <Switch value='Model' label='Model' />
                <Switch value='Condition' label='Condition' />
                <Switch value='Features' label='Features' />
                <Switch value='Estimated Delivery' label='Delivery' />
              </Group>
            </Switch.Group>

            <div>
              <Textarea
                name="user_preference"
                mt="md"
                placeholder="Any additional comparison instructions?"
                onChange={handleChange}
                resize='vertical'
                autosize
                minRows={4}
              />
            </div>
        </div> 
      )}

        <br/>
        <button type="submit" className={classes.submit_button}>
          Compare
        </button>
      </form>
    </div>
  );
};