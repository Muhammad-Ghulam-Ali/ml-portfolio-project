import React from 'react'
import { Menu } from 'lucide-react'

const Navbar = ({ elem }) => {

    const {show, setShow} = elem

  return (
    <div className='flex items-center justify-between sticky top-0 z-40 px-3 w-full md:hidden py-4 bg-[#0F1512] text-white'>
        <p className='font-bold'>Return Risk Predictor</p>
        <Menu 
        onClick={() => setShow(!show)}
        className='cursor-pointer'/>
    </div>
  )
}

export default Navbar
