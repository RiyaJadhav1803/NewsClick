const express=require("express");
const mongoose=require("mongoose");
const app=express();
require('dotenv').config();
const cookieParser=require("cookie-parser");
const PORT= process.env.PORT || 5000;
const cors=require("cors");
  

app.use(express.json());
app.use(cors({
    origin: "https://newsclick-frontend.onrender.com",
    credentials: true
  }));

app.use(cookieParser());

app.post("/",(req,res)=>{
    const {country,category}=req.body;
    res.cookie('news',JSON.stringify({country,category}),
    {
        maxAge:3*24*60*1000,
        httpOnly:true,
        secure:true,
        sameSite:"None",
    })
    console.log(country,category);
    console.log('cookie created');
    res.json({redirectto:'/news'});
})


app.get('/news',async(req,res)=>{
    const usercookie=req.cookies.news?JSON.parse(req.cookies.news):null;
    console.log("cookie is :",usercookie);
    if(usercookie)
    {
        const apiKey = process.env.NEWS_API_KEY;
        console.log(usercookie);
        const country =usercookie.country?usercookie.country:' ';
        const category = usercookie.category?usercookie.category:' ';
        console.log(country,category);
        const newsbunch=await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`)
        const data=await newsbunch.json();
        res.json({redirectto:'/news', message:data.articles})
    }
    else{
        res.json({redirectto:'/',msg:'No news. First submit the category'});
    }
})

app.post('/deletecookie',(req,res)=>{
    console.log('backbutton');
    const usercookie=req.cookies.news?JSON.parse(req.cookies.news):null;
    if(usercookie){
        res.clearCookie('news', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });
        res.setHeader('Cache-Control', 'no-store');
        res.json({redirectto:'/',message:"Cookie deleted",cookie:usercookie})
    }
    else{
        res.json({redirectt:'/',message:"NO COOKIE FIRST CREATE COOKIE",cookie:usercookie})
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
