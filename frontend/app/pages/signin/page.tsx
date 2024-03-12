"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSignInContext } from '@/app/store/signInContext'
import { useRouter } from 'next/navigation'
import { useContextApi } from '@/app/store/contextApi'
import ToggleInput from '@/app/components/toggleInput'
import dynamic from 'next/dynamic'

const Loading = dynamic(() => import("@/app/components/loading") ,{
  ssr : false
})


function Page() {

  const { dispatch, state, loginUser, signInError, loading, setLoading } = useSignInContext()
  const { inputType } = useContextApi()
  const [myToken, setMyToken] = useState<string | null>(null);

  const router = useRouter();



  useEffect(() => {
    const myToken = localStorage.getItem('token');
    setMyToken(myToken);


    if (myToken) {
      router.push("/pages/home");
    }
  }, [router])

  const handleEnter = (e : any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      loginUser(e); 
    }
  }
  




  return (
    <div style={{ backgroundImage: "url('/bgfoto1.webp')" }}
      className='sm:h-[90vh] h-[92vh] bg-cover bg-center flex items-center justify-center' >
      {
        !myToken && (
          <div className=' sm:w-[50vw] w-[90vw] h-[35rem] sm:h-[28rem] sm:ml-[5vw] border-4 border-purple-50 p-8 rounded-xl
          border-opacity-25 flex items-center justify-center  '>
            <form className='flex flex-col text-gray-900 w-[90%] '>
              <div className='flex flex-col mb-8 '>
                <h2 className='text-5xl font-semibold text-purple-50 '>Sign In</h2>
                <p className='h-1 bg-purple-50 opacity-35 w-full mt-2 '></p>
              </div>
              <label className='text-purple-50 text-lg font-semibold'> Email :  </label>
              <input onKeyDown={handleEnter} value={state.email}
                onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
                className='h-10 mb-4 px-2 font-medium' type="email" />
              <label className='text-purple-50 text-lg font-semibold'> Password :  </label>
              <div className='flex items-center'>
              <input onKeyDown={handleEnter} value={state.password}
                onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
                className='h-10 px-2 font-medium mb-2 w-full ' type={inputType} />
              <ToggleInput />
              </div>
              <button onClick={loginUser} className='bg-purple-50 w-full h-12 mt-8 font-semibold text-xl text-gray-900 tracking-wider
               hover:bg-opacity-5 border-2 hover:border-opacity-20 hover:border-purple-50 hover:text-purple-50 ' >
                {loading ? <Loading /> : "Sign In"}
               </button>
              {
                signInError && <p className='text-red-500 text-lg font-semibold mt-2'>{signInError} !</p>
              }
              <p className='text-purple-50 text-lg font-semibold mt-4'>Don&apos;t have an account ?
                <Link className='text-2xl text-orange-300 font-bold ' href="/pages/signup">Sign up</Link>
              </p>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default Page
