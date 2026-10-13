import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Components
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

// Pages
import Dashboard from './pages/Dashboard'
import Predict from './pages/Predict'
import Model from './pages/Model'

function App() {

  // Hamburger
  const [show, setShow] = useState(false)

  return (
    <>
      <BrowserRouter>
      <Navbar elem={{ show, setShow }} />
      <div className='flex'>
      <Sidebar elem={{ show, setShow }} />
      <Routes className='flex-1'>
        <Route path='/' element= {<Dashboard />} />
        <Route path='/predict' element = {<Predict />}  />
        <Route path='/model' element = {<Model />} />
      </Routes>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
