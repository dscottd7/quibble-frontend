import React, {useState} from 'react';
import { UrlForm } from '../components/UrlForm';



const HomePage = () => {

  const FETCH_URL = 'http://localhost:8000'

  // set state for urls
  const [urls, setUrls] = useState({
    url1: '',
    url2: ''
  });

  // set state for comparison result
  const [comparison, setComparison] = useState('');

  // change states for urls
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUrls((prevUrls) => ({
      ...prevUrls,
      [name]: value,
    }));
  }

  // perform action with the URLS
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('URL 1:', urls.url1);
    // console.log('URL 2:', urls.url2);
    try {
      const res = await fetch(`${FETCH_URL}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url1: urls.url1,
          url2: urls.url2,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch /compare');
      }

      const data = await res.json();
      setComparison(data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className='homepage'>
        <div className='navbar'> 
            <div> Quibble </div>
            <div> Hamburger Menu</div>
        </div> 

        <div className='description'>
            <h1> Provide Links to two Products to Compare </h1>
            <p> OpenAI will compare description information for these products and return a summary </p>
        </div>

        <UrlForm urls={urls} handleChange={handleChange} handleSubmit={handleSubmit} />
        
        <div>{comparison}</div>
    </div>
  )
}

export default HomePage