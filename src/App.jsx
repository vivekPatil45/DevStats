import React, { useEffect ,useState} from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Profile from './components/Profile';

function App() {

  
  return (
    <BrowserRouter>
      <div className='flex flex-col justify-between h-screen '>
        <Navbar/>
        <main className='container mx-auto px-3 pb-12 '>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/:username' element={<Profile/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
