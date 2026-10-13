import React from 'react'
import { useState } from 'react'
import { TriangleAlert, CheckCircle, BrainCog } from 'lucide-react'

// Api
import { predict } from '../api/predict';

const Predict = () => {

  // States
  const [cartValue, setCartValue] = useState("");
  const [discount, setDiscount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [pastReturnRate, setPastReturnRate] = useState("");
  const [newsletter, setNewsletter] = useState("1");
  const [loyaltyCard, setLoyaltyCard] = useState("Silver");
  const [category, setCategory] = useState("Accessories");
  const [fitSentiment, setFitSentiment] = useState("True-to-Size");
  const [sizeBracketing, setSizeBracketing] = useState("1");
  const [browser, setBrowser] = useState("Chrome");
  const [device, setDevice] = useState("iOS-App");
  const [packaging, setPackaging] = useState("Kraft-Brown");


  // Response states
  const [loader, setLoader] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  // History
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || [])


  // Submit handler
  const submitHanler = async (e) => {
    e.preventDefault()
    setLoader(true)
    const payload = {
      cart_value_usd: Number(cartValue),
      discount_pct_applied: Number(discount),
      delivery_days_taken: Number(deliveryDays),
      past_return_rate: Number(pastReturnRate),
      newsletter_subscriber: Number(newsletter),
      loyalty_card_color: loyaltyCard,
      product_category: category,
      fit_review_sentiment: fitSentiment,
      size_bracketing_flag: Number(sizeBracketing),
      browser_used: browser,
      checkout_device: device,
      packaging_color: packaging,
    }

    const result = await predict(payload)

    if (!result.success) {
      setErrorMessage(result.message)
      setLoader(false)
    } else {
      setSuccessMessage(result.message)
      const newList = (
        [{
        ts: Date.now(),  
        cart_value_usd: Number(cartValue),
        discount_pct_applied: Number(discount),
        delivery_days_taken: Number(deliveryDays),
        past_return_rate: Number(pastReturnRate),
        newsletter_subscriber: Number(newsletter),
        loyalty_card_color: loyaltyCard,
        product_category: category,
        fit_review_sentiment: fitSentiment,
        size_bracketing_flag: Number(sizeBracketing),
        browser_used: browser,
        checkout_device: device,
        packaging_color: packaging,
        prediction: result.message.prediction,
        probability_class_0: result.message.probability_class_0,
        probability_class_1: result.message.probability_class_1
      },
      ...history
      ])

      setHistory(newList)
      localStorage.setItem('history', JSON.stringify(newList))
      setLoader(false)
  
    }

  }

  // Reset
  const reset = () => {
    setSuccessMessage("")
    setErrorMessage("")
    setCartValue("")
    setDiscount("")
    setDeliveryDays("")
    setPastReturnRate("")
    setNewsletter("1")
    setLoyaltyCard("Silver")
    setCategory("Accessories")
    setFitSentiment("True-to-Size")
    setSizeBracketing("1")
    setBrowser("Chrome")
    setDevice("iOS-App")
    setPackaging("Kraft-Brown")
  }

  return (

    <div className='w-full bg-[#F4F5F2]'>
      {/* Header */}
      <header className='sticky top-0 w-full flex items-center justify-between px-6 py-2 bg-white border-b border-[#E3E6E0]'>
        <div className="title flex flex-col gap-0">
          <h1 className='font-bold text-xl'>Predict</h1>
          <small className='text-[#717171]'>Workspace / Predict</small>
        </div>
      </header>

      {/* Main */}
      <main className='my-3 mx-3 md:mx-6 flex flex-col gap-3  md:flex-row md:items-center  md:justify-between md:gap-6'>
        <form onSubmit={submitHanler} className='w-full md:w-[60%] flex flex-col gap-4 bg-white border border-[#E3E6E0] rounded-xl p-6'>
          {/* Order */}
          <div className='flex flex-col gap-3'>
            <div className="title flex items-center gap-2">
              <span className='flex items-center justify-center h-6 w-6 rounded-md bg-[#8DC63F] text-sm font-bold'>1</span>
              <h2 className='font-bold text-sm'>Order</h2>
            </div>
            <hr className='text-[#E3E6E0]' />
            <div className="inputs grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="value flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Cart value (USD)</small>
                <input
                  value={cartValue}
                  onChange={(e) => setCartValue(e.target.value)}
                  required
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm [&::-webkit-inner-spin-button]:opacity-100' type="number" placeholder='129.99' />
                <small className='text-[#999] text-[12px]'>US dollars, 0 or more</small>
              </div>
              <div className="discount flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Discount applied (%)</small>
                <input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm [&::-webkit-inner-spin-button]:opacity-100' type="number" placeholder='10' />
                <small className='text-[#999] text-[12px]'>Whole number, 0 to 50</small>
              </div>
              <div className="delivery flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Delivery days taken</small>
                <input
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(e.target.value)}
                  required
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm [&::-webkit-inner-spin-button]:opacity-100' type="number" placeholder='3' />
                <small className='text-[#999] text-[12px]'>Whole days, 0 or more</small>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className='flex flex-col gap-3'>
            <div className="title flex items-center gap-2">
              <span className='flex items-center justify-center h-6 w-6 rounded-md bg-[#8DC63F] text-sm font-bold'>2</span>
              <h2 className='font-bold text-sm'>Customer</h2>
            </div>
            <hr className='text-[#E3E6E0]' />
            <div className="inputs grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="value flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Past return rate</small>
                <input
                  value={pastReturnRate}
                  onChange={(e) => setPastReturnRate(e.target.value)}
                  required
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm [&::-webkit-inner-spin-button]:opacity-100' type="number" placeholder='0.20' />
                <small className='text-[#999] text-[12px]'>0 to 0.90</small>
              </div>
              <div className="discount flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Newsletter subscriber</small>
                <select
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                <small className='text-[#999] text-[12px]'>Subscribed to the newsletter</small>
              </div>
              <div className="delivery flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Loyalty card color</small>
                <select
                  value={loyaltyCard}
                  onChange={(e) => setLoyaltyCard(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
                <small className='text-[#999] text-[12px]'>Loyalty tier</small>
              </div>
            </div>
          </div>

          {/* Product */}
          <div className='flex flex-col gap-3'>
            <div className="title flex items-center gap-2">
              <span className='flex items-center justify-center h-6 w-6 rounded-md bg-[#8DC63F] text-sm font-bold'>3</span>
              <h2 className='font-bold text-sm'>Product</h2>
            </div>
            <hr className='text-[#E3E6E0]' />
            <div className="inputs grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="value flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Product category</small>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="Accessories">Accessories</option>
                  <option value="Casual-Tops">Casual-Tops</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Formal-Eveningwear">Formal-Eveningwear</option>
                </select>
                <small className='text-[#999] text-[12px]'>Main item category</small>
              </div>
              <div className="discount flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Fit review sentiment</small>
                <select
                  value={fitSentiment}
                  onChange={(e) => setFitSentiment(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="True-to-Size">True-to-Size</option>
                  <option value="Runs-Slightly-Small">Runs-Slightly-Small</option>
                  <option value="Inconsistent-Sizing">Inconsistent-Sizing</option>
                </select>
                <small className='text-[#999] text-[12px]'>What reviews say about fit</small>
              </div>
              <div className="delivery flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Size bracketing</small>
                <select
                  value={sizeBracketing}
                  onChange={(e) => setSizeBracketing(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                <small className='text-[#999] text-[12px]'>Same item ordered in several sizes</small>
              </div>
            </div>
          </div>

          {/* Checkout */}
          <div className='flex flex-col gap-3'>
            <div className="title flex items-center gap-2">
              <span className='flex items-center justify-center h-6 w-6 rounded-md bg-[#8DC63F] text-sm font-bold'>4</span>
              <h2 className='font-bold text-sm'>Checkout</h2>
            </div>
            <hr className='text-[#E3E6E0]' />
            <div className="inputs grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="value flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Browser</small>
                <select
                  value={browser}
                  onChange={(e) => setBrowser(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="Chrome">Chrome</option>
                  <option value="Safari">Safari</option>
                  <option value="Firefox">Firefox</option>
                  <option value="Edge">Edge</option>
                </select>
                <small className='text-[#999] text-[12px]'>Browser used at checkout</small>
              </div>
              <div className="discount flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Checkout device</small>
                <select
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="iOS-App">iOS-App</option>
                  <option value="Android-App">Android-App</option>
                  <option value="Desktop-Web">Desktop-Web</option>
                </select>
                <small className='text-[#999] text-[12px]'>Device or app used</small>
              </div>
              <div className="delivery flex flex-col gap-1">
                <small className='font-bold text-[12px]'>Packaging color</small>
                <select
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  className='bg-white border border-[#D5D9D2] rounded-md px-3 py-2 text-sm appearance-none pr-8'>
                  <option value="Kraft-Brown">Kraft-Brown</option>
                  <option value="Minimal-White">Minimal-White</option>
                  <option value="Branded-Teal">Branded-Teal</option>
                </select>
                <small className='text-[#999] text-[12px]'>Packaging option chosen</small>
              </div>
            </div>
          </div>
          <hr className='text-[#E3E6E0]' />
          <div className='flex item-center gap-4'>
          <button type='submit' className='flex items-center justify-center bg-[#222] py-2 rounded-md text-white cursor-pointer w-30 font-bold text-sm active:scale-95'>
            {!loader
            ? "Predict"
            : <span className='block rounded-full h-4 w-4 bg-transparent border-2 border-gray-200 border-t-transparent animate-spin'></span>
            } 
          </button>
          <button 
          type='button'
          onClick={reset}
          className='text-xs py-2 px-4 rounded-md bg-white border border-[#D5D9D2] hover:bg-[#F4F5F2] cursor-pointer'>Reset</button>
          </div>
        </form>

        <div className='self-start w-full md:w-[40%] flex flex-col gap-6 bg-white border border-[#E3E6E0] rounded-xl p-5 min-h-50'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold'>Result</h2>
            <BrainCog size={50} />
          </div>

          {!successMessage && (
            <div className='mt-[4%] h-full w-full flex items-center justify-center'>
              <small className='text-gray-500'>Fill in the order details and press Predict.</small>
            </div>
          )}

          {successMessage && (
            <div className='flex flex-col gap-4'>
              <div className="output">
                {successMessage.prediction === 1
                  ? <span>
                    <p className='w-fit bg-[#D6452B] text-white text-xs font-medium px-2 py-0.5 rounded'>Return</p>
                  </span>
                  : <span>
                    <p className='w-fit bg-[#5FA32A] text-white text-xs font-medium px-2 py-0.5 rounded'>Keep</p>
                  </span>
                }
              </div>
              <div className="percentage">
                <h1 className='font-mono text-[40px] font-medium'>{(successMessage.probability_class_1 * 100).toFixed(0)}%</h1>
                <small>Return probability</small>
              </div>

              <div className='h-3 bg-gray-200 rounded-2xl'>
                <span
                  style={{ width: `${successMessage.probability_class_1 * 100}%`, background: `${successMessage.probability_class_1 * 100 > 50 ? "red" : "green"}`  }}
                  className={`flex h-full rounded-2xl`}></span>
              </div>

              <div className='p-4 bg-[#F4F5F2] border border-[#E3E6E0] rounded-lg'>
                {successMessage.prediction === 1
                  ?
                  <div className='flex items-center gap-2'>
                    <TriangleAlert size={18} className='text-[#D6452B]' />
                    <p className='text-sm font-bold'>Review this order before shipping</p>
                  </div>
                  : <div className='flex items-center gap-2'>
                    <CheckCircle size={18} className='text-[#5FA32A]' />
                    <p className='text-sm font-bold'>No action needed</p>
                  </div>
                }
              </div>

              <div className="threshold">
                <small>Decision threshold 0.50</small>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Predict
