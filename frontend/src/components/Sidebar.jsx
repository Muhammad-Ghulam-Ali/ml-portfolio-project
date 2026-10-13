import React from 'react'
import { NavLink } from 'react-router-dom'

// Icons
import { LayoutDashboard, Sparkles, BrainCircuit } from 'lucide-react'

const Sidebar = ({ elem }) => {
  const {show, setShow} = elem

  return (
    
    <div className={`${show ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 fixed z-100 flex flex-col h-screen md:sticky top-0 self-start shrink-0 w-[80%] md:w-60 bg-[#0F1512] text-slate-300 px-3 py-6`}>
      {/* Header */}
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-center gap-2'>
          <span className="block logo w-8 h-8 rounded-md bg-[#8DC63F]"></span>
          <h1 className='text-[15px] font-semibold text-white'>Return Risk Predictor</h1>
        </div>
        <hr className='text-[#04301c]' />
      </div>

      {/* Workspace */}
      <div className='mt-[30%] flex flex-col gap-2 w-full'>
        <span className='text-[11px] uppercase tracking-[0.08em] text-[#6B7A72]'>WORKSPACE</span>

       <NavLink
       to='/'
       className={({isActive}) => 
      `flex items-center gap-2 py-2 px-4 rounded-md hover:bg-[#17201B] ${isActive ? "bg-[#1F3329]" : ""}`
      }>
      <LayoutDashboard size={18}/>
      <span className="text-sm font-semibold text-[#ecebeb]">Dashboard</span>
       </NavLink>

       <NavLink 
       to='/predict'
       className={({isActive})=>
       `flex items-center gap-2 py-2 px-4 rounded-md hover:bg-[#17201B] ${isActive ? "bg-[#1F3329]" : ""}`
       }>
        <Sparkles size={18}/>
        <span className="text-sm font-semibold text-[#ecebeb]">Predict</span>
       </NavLink>

       <NavLink
       to='/model'
       className={({isActive})=>
       `flex items-center gap-2 py-2 px-4 rounded-md hover:bg-[#17201B] ${isActive ? "bg-[#1F3329]" : ""}`
       }>
        <BrainCircuit size={18} />
        <span className="text-sm font-semibold text-[#ecebeb]">Model</span>
       </NavLink>
      </div>

      {/* Footer */}
      <div className='text-center mt-auto'>
        <hr className='text-[#04301c]' />
        <a href='https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216/' target='_blank' className='text-sm text-center text-[#b9b8b8] hover:underline'>Developed by<br /> Muhammad Ghulam Ali</a>
      </div>
    </div>
  )
}

export default Sidebar
