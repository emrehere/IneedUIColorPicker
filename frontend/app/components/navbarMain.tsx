import React from 'react'
import { IoIosColorPalette } from "react-icons/io";
import Link from 'next/link'

function NavbarMain({ propFromParent }: { propFromParent: string }) {
  return (
    <div className='bg-purple-50 w-full h-16 overflow-x-hidden bg-opacity-85  flex flex-row '>
        <div className='w-[40vw] text-[#070717] ml-8 flex flex-row items-center ' >
        <IoIosColorPalette size={50} />
        <p className='text-3xl font-bold text-[#070717] ml-4'>UI Color Universe</p>
        </div>
      <div className=' w-[60vw] flex justify-end items-center py-2 pr-8  text-[#070717] text-2xl font-semibold tracking-widest '>
       <Link href={propFromParent === "Sign In" ? '/pages/signin' : '/pages/signup'}>
        <p className='hover:bg-[#070717] hover:text-purple-50 hover:rounded-lg w-36 h-12 
         hover:cursor-pointer flex items-center justify-center' >{propFromParent}</p>
        </Link>
        <span className='border-r-4 opacity-10 border-purple-950 mx-4 h-full' ></span>
        <Link href={'/'}>
        <p className='hover:bg-[#070717] hover:text-purple-50 hover:rounded-lg w-36 h-12  hover:cursor-pointer
        flex items-center justify-center'>Go Back</p>
        </Link>
      </div>
    </div>
  )
}

export default NavbarMain
