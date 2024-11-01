import {React, useState } from 'react';
import { TextInput,Button} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from '../styles/FormMenu.module.css';

export const UrlForm = ({ urls, preferences, handleChange, handleSubmit }) => {
  
  const [open, setOpen] = useState(false);

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="links">
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

      <Button onClick={() => setOpen(!open)} variant='transparent' color="black" size='md' >
        {open ? 'Hide comparison options' : 'More comparison options'}
        <IconChevronDown />
      </Button>
      { open && 
        (<div >
          <label htmlFor="selected_categories">Select Categories:</label>
          <select
            id="selected_categories"
            name="selected_categories"
            multiple
            value={preferences.selected_categories}
            onChange={handleChange}
            className="categories-select"
          >
            <option value="Price">Price</option>
            <option value="Model">Model</option>
            <option value="Condition">Condition</option>
            <option value="Features">Features</option>
            <option value="Delivery">Delivery</option>
          </select>
          <div className="form-group">
          <input
            type="text"
            id="user_preference"
            name="user_preference"
            value={preferences.user_preference}
            onChange={handleChange}
            placeholder="Any additional comparison instructions?"
            className="preference-input"
          />
        </div>
        </div> 
      )}
        
    
        
        <br/>
        <button type="submit" className="submit-button">
          Compare
        </button>
      </form>
    </div>
  );
};