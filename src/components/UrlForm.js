import React from 'react'

export const UrlForm = ({urls, handleChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className='links'>
          <div>
            <input
              type='url'
              id='url1'
              name='url1'
              value={urls.url1}
              onChange={handleChange}
              placeholder='Product 1 URL'
              required
            />
          </div>
          
          <div>
            <input
              type='url'
              id='url2'
              name='url2'
              value={urls.url2}
              onChange={handleChange}
              placeholder='Product 2 URL'
              required
            />
          </div>
          <button type='submit'>Compare</button>
        </form>
  )
}
