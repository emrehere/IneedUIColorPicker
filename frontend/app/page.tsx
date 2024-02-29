import React from 'react'
import NavbarMain from '@/app/components/navbarMain'
import FooterMain from '@/app/components/footerMain'
import Link from 'next/link'
import "./globals.css";


function Page() {
  return (
    <div style={{ backgroundImage: "url('/bgfoto2.jpg')" }} className='w-[100vw]  min-h-screen
    bg-cover  flex flex-col'>
      <NavbarMain propFromParent="Sign In" />
      <h1 className='text-5xl text-purple-50 font-bold tracking-widest text-center pt-16 pb-4 '>Welcome To UI Color Universe</h1>
      <p className='text-2xl text-purple-50 font-semibold tracking-wider text-center w-[50vw] mx-auto'> Innovation meets aesthetics. Immerse yourself in an impressive UI color picker experience. Sign up now and the spectrum of creativity at your fingertips!</p>
     <div className='flex justify-center mt-[10vh] '>
     <Link href={'/pages/signup'}>
     <button className='bg-purple-50  text-[#070717] w-[50vw] sm:w-[20vw] min-w-40 h-16 text-2xl font-semibold rounded-md bg-opacity-90 hover:bg-opacity-5 hover:border-2 hover:text-purple-50 hover:border-purple-50'>Get Started</button>
     </Link>
     </div>
     
      <p className='flex-grow'></p>
      <div className='mt-[10vh]'>
      <FooterMain />
      </div>
    </div>
  )
}

export default Page
