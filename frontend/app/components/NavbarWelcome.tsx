import React from 'react'
import Link from 'next/link'

function NavbarWelcome() {
  return (
    <div className='bg-white h-16 w-full bg-opacity-90  '>
      <div>
        <Link href={'/pages/signin'}>
            <button className='hover:bg-white hover:bg-opacity-90 hover:text-[#070717]  bg-[#070717] px-12 h-16 font-semibold text-xl tracking-wider'>Sign in</button>
        </Link>
        <Link href={'/pages/signup'}>
            <button className='hover:bg-white hover:bg-opacity-90 hover:text-[#070717] bg-[#070717] px-12 h-16 font-semibold text-xl tracking-wider'>Sign up</button>
        </Link>
      </div>
    </div>
  )
}

export default NavbarWelcome
