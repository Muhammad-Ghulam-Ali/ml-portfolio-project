import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// API
import { serverWakeUp } from '../api/server'

const Dashboard = () => {

  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || [])

  const totalPrediction = history.length
  const flaggedReturn = history.length > 0 ? ((history.filter(item => item.prediction === 1).length / history.length) * 100).toFixed(2) : 0
  const avgReturn = history.length > 0 ? ((history.reduce((acc, obj) => acc + obj.probability_class_1, 0) / history.length) * 100).toFixed(2) : 0
  const hightRisk = history.length > 0 ? (history.filter(item => item.probability_class_1 >= 0.70).length) : 0


  useEffect(() => {
    serverWakeUp()
  },[])

  // Delete history
  const removeHistory = () => {
    localStorage.removeItem('history')
    setHistory([])
  }


  return (
    <div className='w-screen bg-[#F4F5F2]'>
      {/* Header */}
      <header className='w-full flex items-center justify-between px-6 py-2 bg-white border-b border-[#E3E6E0]'>
        <div className="title flex flex-col gap-0">
          <h1 className='font-bold text-xl'>Dashboard</h1>
          <small className='text-[#717171]'>Workspace / Dashboard</small>
        </div>
        <div className="button">
          <Link to={'/predict'} className='text-sm py-2 px-4 rounded-md bg-[#111] text-white hover:bg-[#333]'>New prediction</Link>
        </div>
      </header>


      {/* Main */}
      <main className='m-5 md:m-10'>

        {/* KPIS */}
        <div className="card grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className='bg-white border border-[#E3E6E0] rounded-xl p-2 md:p-5 border-t-[3px] border-t-[#8DC63F] flex flex-col gap-5'>
            <small>Predictions made</small>
            <h1 className='text-[28px] font-medium font-mono'>{totalPrediction}</h1>
            <small>Stored in this browser</small>
          </div>

          <div className='bg-white border border-[#E3E6E0] rounded-xl p-2 md:p-5 flex flex-col gap-5'>
            <small>Flagged likely returned</small>
            <h1 className='text-[28px] font-medium font-mono'>{flaggedReturn}%</h1>
            <small>Share of orders predicted returned</small>
          </div>

          <div className='bg-white border border-[#E3E6E0] rounded-xl p-2 md:p-5 flex flex-col gap-5'>
            <small>Average return probability</small>
            <h1 className='text-[28px] font-medium font-mono'>{avgReturn}%</h1>
            <small>Mean across all stored predictions</small>
          </div>

          <div className='bg-white border border-[#E3E6E0] rounded-xl p-2 md:p-5 flex flex-col gap-5'>
            <small>High risk orders</small>
            <h1 className='text-[28px] font-medium font-mono'>{hightRisk}</h1>
            <small>Probability above 70%</small>
          </div>

        </div>

        {/* History */}
        <div className='mt-[5%] w-full p-6 flex flex-col gap-4 bg-white border border-[#E3E6E0] rounded-2xl'>
          <div className="heading flex items-center justify-between">
            <h3 className='font-bold'>Prediction Log</h3>
            {history.length > 0 && (
              <button
                onClick={removeHistory}
                className='text-xs py-2 px-4 rounded-md bg-white border border-[#D5D9D2] hover:bg-[#F4F5F2] cursor-pointer'>Clear history</button>
            )}
          </div>

          <div className={`${history.length > 0 ? "rounded-xl border border-gray-200 max-h-80 overflow-auto": ""}`}>
            {history.length < 1 && (
              <div className='my-[10%] h-full w-full flex items-center justify-center'>
                <small>Your history will appear here.</small>
              </div>
            )}
            {history.length > 0 && (
              <table className='w-full text-sm'>
                <thead className='bg-gray-50'>
                  <tr className='text-left text-xs uppercase tracking-wide text-gray-500'>
                    <th className='px-4 py-3 font-medium'>Time</th>
                    <th className='px-4 py-3 font-medium'>Category</th>
                    <th className='px-4 py-3 font-medium'>Device</th>
                    <th className='px-4 py-3 font-medium'>Result</th>
                    <th className='px-4 py-3 font-medium text-right'>Cart Value</th>
                    <th className='px-4 py-3 font-medium text-right'>Return%</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(function (elem, index) {
                    return (
                      <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                        <td className='px-4 py-3'>{new Date(elem.ts).toLocaleString()}</td>
                        <td className='px-4 py-3'>{elem.product_category}</td>
                        <td className='px-4 py-3'>{elem.checkout_device}</td>
                        <td className='px-4 py-3'>
                          {elem.prediction === 1
                            ? <span className='bg-red-100 text-red-700 rounded-xl px-2 py-0.5 text-xs'>Return</span>
                            : <span className='bg-green-100 text-green-700 rounded-xl px-2 py-0.5 text-xs'>keep</span>}
                        </td>
                        <td className='px-4 py-3 text-right'>${elem.cart_value_usd}</td>
                        <td className='px-4 py-3 text-right'>{((elem.probability_class_1) * 100).toFixed(0)}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
