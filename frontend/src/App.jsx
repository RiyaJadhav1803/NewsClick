import News from './pages/News/News';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [country,setcountry] =useState('');
  const [category,setcategory]=useState('');
   return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home category={category} setcategory={setcategory} country={country} setcountry={setcountry}/>}></Route>
        <Route path='/news' element={<News/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
