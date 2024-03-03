"use client"
import React,{ useEffect} from 'react'
import { IoIosColorPalette } from "react-icons/io";
import Link from 'next/link'

function NavbarMain({ propFromParent, styleFromParent }: { propFromParent: string, styleFromParent: string }) {
 
 
 
  return (
    <div className='bg-purple-50 w-full h-20 sm:h-16 overflow-x-hidden bg-opacity-85  flex flex-row '>
        <div className='w-full sm:w-[40vw] text-[#070717] sm:ml-8 ml-2 flex flex-row items-center ' >
        <IoIosColorPalette size={50} />
        <div className='sm:text-3xl text-2xl font-bold text-[#070717] ml-2 sm:ml-4 flex flex-col sm:flex-row'>
          <p className='mr-2'>UI Color </p>
          <p>Universe</p>
        </div>
        </div>
      <div style={{ display: styleFromParent }} className=' w-[60vw] flex justify-end items-center py-2 pr-8  text-[#070717] text-2xl font-semibold tracking-widest '>
       <Link href={propFromParent === "Sign In" ? '/pages/signin' : '/pages/signup'}>
        <p className='hover:bg-[#070717] hover:text-purple-50 hover:rounded-lg w-36 h-12 
         hover:cursor-pointer flex items-center justify-center' >{propFromParent}</p>
        </Link>
        <span className='border-r-4 opacity-10 border-purple-950 mx-4 h-full' ></span>
        <Link href={'/'}>
        <p style={{ display: styleFromParent }} className='hover:bg-[#070717] hover:text-purple-50 hover:rounded-lg w-36 h-12  hover:cursor-pointer
        flex items-center justify-center styleFromParent'>Go Back</p>
        </Link>
      </div>
    </div>
  )
}

export default NavbarMain
