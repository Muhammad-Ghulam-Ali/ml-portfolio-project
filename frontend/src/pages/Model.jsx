import React from 'react'
import { Link } from 'react-router-dom'

const Model = () => {
  return (
    <div className='w-full bg-[#F4F5F2]'>
      {/* Header */}
      <header className='sticky top-0 w-full flex items-center justify-between px-6 py-2 bg-white border-b border-[#E3E6E0]'>
        <div className="title flex flex-col gap-0">
          <h1 className='font-bold text-xl'>Model Details</h1>
          <small className='text-[#717171]'>Workspace / Model Details</small>
        </div>
        <div className="button">
          <Link to={'/predict'} className='text-sm py-2 px-4 rounded-md bg-[#111] text-white hover:bg-[#333]'>New prediction</Link>
        </div>
      </header>


      {/* Main */}
      <main className='m-5 md:m-5'>

        {/* Metrics + Confusion Matrix */}
        <div className="card grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Metrics */}
          <div className='bg-white border border-[#E3E6E0] rounded-xl p-5 flex flex-col gap-4'>
            <div className="heading">
              <h3 className='font-bold'>Metrics <span className='font-normal text-sm text-[#6B7280]'>(CV values are before tuning)</span></h3>
            </div>

            <div className='rounded-xl border border-gray-200 overflow-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-gray-50'>
                  <tr className='text-left text-xs uppercase tracking-wide text-gray-500'>
                    <th className='px-4 py-3 font-medium'>Metric</th>
                    <th className='px-4 py-3 font-medium text-right'>CV</th>
                    <th className='px-4 py-3 font-medium text-right'>Test</th>
                    <th className='px-4 py-3 font-medium text-right'>Difference</th>
                  </tr>
                </thead>
                <tbody className='font-mono'>
                  <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                    <td className='px-4 py-3 font-sans'>Accuracy</td>
                    <td className='px-4 py-3 text-right'>0.905</td>
                    <td className='px-4 py-3 text-right'>0.938</td>
                    <td className='px-4 py-3 text-right text-[#5FA32A]'>+0.033</td>
                  </tr>
                  <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                    <td className='px-4 py-3 font-sans'>Precision</td>
                    <td className='px-4 py-3 text-right'>0.924</td>
                    <td className='px-4 py-3 text-right'>0.940</td>
                    <td className='px-4 py-3 text-right text-[#5FA32A]'>+0.016</td>
                  </tr>
                  <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                    <td className='px-4 py-3 font-sans'>Recall</td>
                    <td className='px-4 py-3 text-right'>0.930</td>
                    <td className='px-4 py-3 text-right'>0.966</td>
                    <td className='px-4 py-3 text-right text-[#5FA32A]'>+0.036</td>
                  </tr>
                  <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                    <td className='px-4 py-3 font-sans'>F1</td>
                    <td className='px-4 py-3 text-right'>0.927</td>
                    <td className='px-4 py-3 text-right'>0.953</td>
                    <td className='px-4 py-3 text-right text-[#5FA32A]'>+0.026</td>
                  </tr>
                  <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                    <td className='px-4 py-3 font-sans'>ROC-AUC</td>
                    <td className='px-4 py-3 text-right'>0.972</td>
                    <td className='px-4 py-3 text-right'>0.986</td>
                    <td className='px-4 py-3 text-right text-[#5FA32A]'>+0.014</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Confusion Matrix */}
          <div className='bg-white border border-[#E3E6E0] rounded-xl p-5 flex flex-col gap-4'>
            <div className="heading">
              <h3 className='font-bold'>Confusion Matrix</h3>
              <small className='text-[#6B7280]'>Test set, 599 orders</small>
            </div>

            <div className='grid grid-cols-4 gap-2 text-center text-xs text-[#6B7280]'>
              {/* Column labels */}
              <div></div>
              <div className='flex items-center justify-center'>Predicted kept</div>
              <div className='flex items-center justify-center'>Predicted returned</div>
              <div className='flex items-center justify-center'>Total</div>

              {/* Row 1 */}
              <div className='flex items-center justify-start text-left'>Actually kept</div>
              <div className='bg-[#CFE6AE] text-[#2F5D0F] rounded-lg py-4 px-2'>
                <h1 className='text-2xl font-medium font-mono'>188</h1>
                <small>Correct keep</small>
              </div>
              <div className='bg-[#F9D3A8] text-[#8A4B0C] rounded-lg py-4 px-2'>
                <h1 className='text-2xl font-medium font-mono'>24</h1>
                <small>False alarm</small>
              </div>
              <div className='flex items-center justify-center font-mono'>212</div>

              {/* Row 2 */}
              <div className='flex items-center justify-start text-left'>Actually returned</div>
              <div className='bg-[#F9D3A8] text-[#8A4B0C] rounded-lg py-4 px-2'>
                <h1 className='text-2xl font-medium font-mono'>13</h1>
                <small>Missed return</small>
              </div>
              <div className='bg-[#CFE6AE] text-[#2F5D0F] rounded-lg py-4 px-2'>
                <h1 className='text-2xl font-medium font-mono'>374</h1>
                <small>Correct flag</small>
              </div>
              <div className='flex items-center justify-center font-mono'>387</div>

              {/* Totals row */}
              <div className='flex items-center justify-start text-left'>Total</div>
              <div className='flex items-center justify-center font-mono'>201</div>
              <div className='flex items-center justify-center font-mono'>398</div>
              <div className='flex items-center justify-center font-mono'>599</div>
            </div>
          </div>

        </div>

        {/* Model Comparison */}
        <div className='mt-[1%] w-full p-6 flex flex-col gap-4 bg-white border border-[#E3E6E0] rounded-2xl'>
          <div className="heading">
            <h3 className='font-bold'>Model Comparison</h3>
            <small className='text-[#6B7280]'>5 fold cross-validation</small>
          </div>

          <div className='rounded-xl border border-gray-200 max-h-80 overflow-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50'>
                <tr className='text-left text-xs uppercase tracking-wide text-gray-500'>
                  <th className='px-4 py-3 font-medium'>Model</th>
                  <th className='px-4 py-3 font-medium text-right'>Accuracy</th>
                  <th className='px-4 py-3 font-medium text-right'>Precision</th>
                  <th className='px-4 py-3 font-medium text-right'>Recall</th>
                  <th className='px-4 py-3 font-medium text-right'>F1</th>
                  <th className='px-4 py-3 font-medium text-right'>ROC-AUC</th>
                </tr>
              </thead>
              <tbody className='font-mono'>
                <tr className='border-t border-gray-100 bg-[#CFE6AE] text-[#2F5D0F]'>
                  <td className='px-4 py-3 font-sans font-semibold'>Logistic Regression</td>
                  <td className='px-4 py-3 text-right'>0.905</td>
                  <td className='px-4 py-3 text-right'>0.924</td>
                  <td className='px-4 py-3 text-right'>0.930</td>
                  <td className='px-4 py-3 text-right'>0.927</td>
                  <td className='px-4 py-3 text-right'>0.972</td>
                </tr>
                <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                  <td className='px-4 py-3 font-sans'>Random Forest</td>
                  <td className='px-4 py-3 text-right'>0.887</td>
                  <td className='px-4 py-3 text-right'>0.901</td>
                  <td className='px-4 py-3 text-right'>0.928</td>
                  <td className='px-4 py-3 text-right'>0.914</td>
                  <td className='px-4 py-3 text-right'>0.958</td>
                </tr>
                <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                  <td className='px-4 py-3 font-sans'>XGBoost</td>
                  <td className='px-4 py-3 text-right'>0.895</td>
                  <td className='px-4 py-3 text-right'>0.911</td>
                  <td className='px-4 py-3 text-right'>0.929</td>
                  <td className='px-4 py-3 text-right'>0.920</td>
                  <td className='px-4 py-3 text-right'>0.963</td>
                </tr>
                <tr className='border-t border-gray-100 hover:bg-gray-50 text-[#333]'>
                  <td className='px-4 py-3 font-sans'>LightGBM</td>
                  <td className='px-4 py-3 text-right'>0.889</td>
                  <td className='px-4 py-3 text-right'>0.909</td>
                  <td className='px-4 py-3 text-right'>0.920</td>
                  <td className='px-4 py-3 text-right'>0.914</td>
                  <td className='px-4 py-3 text-right'>0.961</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Model
