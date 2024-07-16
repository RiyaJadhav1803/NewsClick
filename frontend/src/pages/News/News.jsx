import React from 'react'
import { useState, useEffect } from 'react';
import './News.css'
import newsrotate from './news.jpg';
import { useNavigate } from 'react-router-dom';
const News = () => {

const [loading,setloading]=useState(true);
const [news,setnews]= useState([]);
const navigate=useNavigate();
  const backbutton=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch('https://newsclick-backend.onrender.com/news',{
        method:'post',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials:'include',
      });
      const data = await response.json();
      if(data.redirectto){
        navigate(data.redirectto);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://newsclick-backend.onrender.com/news',{
          credentials:'include'
        });
        const data = await response.json();
        console.log("hello");
         console.log("hello1");
        console.log(data.message);
        if(data.message){
          setnews(data.message);
        }
        if(data.redirectto){
          navigate(data.redirectto);
        }
        if(data.msg){
          navigate(data.redirectto);
          alert(data.msg);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setloading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
    <div className='news'>
      <div>
        <button onClick={backbutton} className='back-button'>Back</button>
      </div>
      <div className='scroll-image'>
        <marquee  behavior="scroll" direction="left" scrollamount="20">
          <img className='img' src={newsrotate}/>
          <img className='img' src={newsrotate}/>
          <img className='img' src={newsrotate}/>
          <img className='img' src={newsrotate}/>
          <img className='img' src={newsrotate}/>
          <img className='img' src={newsrotate}/>
          <img className='img' src={newsrotate}/>
        </marquee> 
      </div>
      <div className='all-news'>
      {loading
       ? ( <div>
              <div className='news-loading'>Loading...</div>
              <div className="loader"></div>
          </div>
        )
       : (news.map((single)=>(
            <div className='single-news'>
              <div className='news-image-left'>
                <img className='single-news-image' src={single.urlToImage} alt="No image loaded" />
              </div>
              <div className='news-msg-right'>
                <p>ID : {single.source.id}</p>
                <p>NAME : {single.source.name}</p>
                <p>AUTHOR : {single.author}</p>
                <p>TITLE : {single.title}</p>
                <p>DESCRIPTION : {single.description}</p>
                <a className='right-link' href={single.url}>Read more</a>
                <p>PUBLISHED AT : {single.publishedAt}</p>
                <p>CONTENT : {single.content}</p>
              </div>
            </div>
        )
        ))
      }
      </div>
    </div>
    </>
  )
}

export default News
