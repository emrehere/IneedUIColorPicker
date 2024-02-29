import React from 'react'

function FooterMain() {
  return (
    <div className='bg-[#d5d0d9] w-full h-24 pt-1 overflow-x-hidden flex flex-row'>
      <div className='flex flex-col'>
        <p className=' text-[#070717] ml-[5vw] mt-3 font-semibold tracking-wider '>Prepared by Emrah Unurlu with <span className='text-red-600 ml-1 font-extrabold text-[18px] '>passion</span></p>
        <div className='w-[100vw] flex justify-center'>
        <p className='h-1  bg-purple-950 w-[90vw] mt-1 opacity-20  mx-auto'></p>
        </div>
        <div className='w-[100vw] flex justify-end text-[#070717] font-medium tracking-wider mt-1 '>
        <p className='mr-[5vw]'>© 2023 UI Color Universe</p>
        </div>
      </div>
    </div>
  )
}

export default FooterMain
