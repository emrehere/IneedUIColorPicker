import React from 'react'
import NavbarWelcome from '@/app/components/NavbarWelcome'
import NavbarMain from '@/app/components/navbarMain'
import FooterMain from '@/app/components/footerMain'
import Link from 'next/link'

function Page() {
    return (

        <div className=' min-h-screen  bg-[#150027] sm:bg-[url("/home-banner.webp")] *
        bg-[url("/mobile_foto1.webp")] flex flex-col bg-cover  ' >

            <NavbarWelcome />
            <div className='sm:hidden flex'>
                <NavbarMain styleFromParent="none" propFromParent="Sign Up" />
            </div>
            <div className='sm:h-[60vh] h-[74vh] flex items-center sm:ml-[10vw]'>
                <div className='flex flex-col  sm:p-12 p-2  sm:mx-0 mx-auto w-[90vw]  sm:w-[50vw] 
              items-center text-lg bg-[#e7e7e9] text-[#150027] rounded-2xl
              shadow-xl shadow-gray-600'>
                    <div className='flex flex-row sm:py-0 py-4 '>
                        <p className='sm:text-5xl text-4xl font-bold'> Only 2% of resumes make it past the first round. Be in the top 2%</p>
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
