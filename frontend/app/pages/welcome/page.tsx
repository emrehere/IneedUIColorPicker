import React from 'react'
import NavbarWelcome from '@/app/components/NavbarWelcome'
import NavbarMain from '@/app/components/navbarMain'
import FooterMain from '@/app/components/footerMain'
import Link from 'next/link'

function Page() {
    return (

        <div className=' min-h-screen  bg-[#150027] bg-[url("/colorPic2.webp")] 
         flex flex-col bg-cover  ' >

            <NavbarWelcome />
            <div className='sm:hidden flex'>
                <NavbarMain styleFromParent="none" propFromParent="Sign Up" />
            </div>
            <div className=' h-full mt-24 sm:h-[60vh] flex items-center justify-center '>
                <div className='flex flex-col  sm:p-12 p-2  sm:mx-0 mx-auto w-[90vw]  sm:w-[70vw] 
              items-center text-lg bg-[#e7e7e9] text-[#150027] rounded-2xl
              shadow-xl shadow-gray-600'>
                    <div className='flex flex-row sm:py-0 py-4 '>
                        <p className=' sm:text-4xl text-3xl font-bold'>  Elevate user experience with an exceptional UI color picker. Skillfully blend aesthetics, create visual harmony, and evoke emotion for a design that stands out.</p>
                    </div>
                    <Link href="/pages/signup">
                        <button className='sm:hidden text-xl tracking-widest bg-white text-[#150027] px-16 py-2 font-bold rounded-md 
                shadow-sm shadow-gray-200 hover:bg-[#150027] hover:text-white mt-8'>Sign up</button>
                    </Link>
                    <Link href="/pages/signin">
                        <button className='sm:hidden tracking-widest text-xl bg-white text-[#150027] px-16 py-2 font-bold rounded-md 
                shadow-sm shadow-gray-200 hover:bg-[#150027] hover:text-white mt-8 sm:mb-0 mb-4'>Sign in</button>
                    </Link>
                </div>
            </div>
            <div className=' flex flex-grow'></div>
            <div className='sm:hidden flex  mt-48'>

                <FooterMain />
            </div>
            <p>

            </p>
        </div>

    )
}

export default Page
