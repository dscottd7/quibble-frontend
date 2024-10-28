import React from 'react';

export const UrlForm = ({ urls, preferences, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="links">
      <div className="form-group">
        <input
          type="url"
          id="url1"
          name="url1"
          value={urls.url1}
          onChange={handleChange}
          placeholder="Product 1 URL"
          required
          className="url-input"
        />
      </div>
      
      <div className="form-group">
        <input
          type="url"
          id="url2"
          name="url2"
          value={urls.url2}
          onChange={handleChange}
          placeholder="Product 2 URL"
          required
          className="url-input"
        />
      </div>
      
      <div className="form-group">
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
        <small className="help-text">Hold Ctrl/Cmd to select multiple categories</small>
      </div>
      
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
      
      <button type="submit" className="submit-button">
        Compare
      </button>
    </form>
  );
};