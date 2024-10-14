import React from 'react'

const HomePage = () => {
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

        <div className='links'>
            <h2> Products to compare </h2>
            <input name='link1' placeholder='Product URL 1'/>
            <input name='link2' placeholder='Product URL 2'/>
        </div>
    </div>


  )
}

export default HomePage