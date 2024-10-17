import React, {useState} from 'react';
import { UrlForm } from '../components/UrlForm';


const HomePage = () => {

  // set state for urls
  const [urls, setUrls] = useState({
    url1: '',
    url2: ''
  });

  // change states for urls
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUrls((prevUrls) => ({
      ...prevUrls,
      [name]: value,
    }));
  }

  // perform action with the URLS
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('URL 1:', urls.url1);
    console.log('URL 2:', urls.url2);
  }

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
        
    </div>
  )
}

export default HomePage