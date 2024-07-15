import React, { useState } from 'react'
import "./Home.css"
import news from './newsimage.jpeg';
import { Link, useNavigate } from 'react-router-dom';
const Home = ({country , setcountry ,category,setcategory}) => {
const navigate=useNavigate();
  const nextpage=async(e)=>{
    e.preventDefault();
    let response = await fetch(
      'https://newsclick-backend.onrender.com', {
          method: "post",
          body: JSON.stringify({country,category}),
          headers: {
              'Content-Type': 'application/json'
          },
          credentials:'include',
      })

      const data=await response.json();
      console.log(data);
      if(data.redirectto){
        console.log(data.redirectto);
        navigate(data.redirectto);
      }
  }

  return (
    <div>
    <div className='home-div-text'>
      <div className='middle-text1'>
        <p className='country-text'> Enter The country name(Only first two initial in lowercase) : </p>
        <input className='country-input' onChange={(e)=>setcountry(e.target.value)} type="text" placeholder='Country' />
      </div>
      <div className='middle-text2'>
        <p className='category-text'> Select The category choice : </p>
        <select className='country-category' onChange={(e)=>setcategory(e.target.value)}>
          <option value="">Choose</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="general">General</option>
        </select>
      </div>
        <div>
          <button onClick={nextpage} className='submit-button'>Submit</button>
        </div>
      <div>
        <img className='news-image' src={news} alt="no data" />
      </div>
    </div>
    </div>
  )
}

export default Home
