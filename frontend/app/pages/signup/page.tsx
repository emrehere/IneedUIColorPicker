"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSignUpContext } from '@/app/store/signUpContext'
import { useRouter } from 'next/navigation'
import { useContextApi } from '@/app/store/contextApi'
import ToggleInput from '@/app/components/toggleInput'
import Loading from '@/app/components/loading'

function Page() {

  const { state, dispatch, saveTheUser, signUpError, loading1, setLoading1 } = useSignUpContext();
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

  const handleEnterSignup = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log("heyyy", state)
      saveTheUser(e)
    }
  }



  return (
    <div>
      {
        !myToken && (
          <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950
        min-h-screen   overflow-x-hidden flex sm:flex-row flex-col justify-center items-center">
            <div className='bg-purple-50 sm:w-[52vw] lg:w-[40vw] sm:h-[27rem] sm:rounded-xl sm:rounded-tr-[15rem]
        sm:rounded-bl-[10rem] bg-opacity-80 flex items-center sm:p-8 p-8 pt-48 sm:pt-0 sm:mt-0 -mt-40 '>
              <div>
                <h1 className='text-red-600 text-3xl  xl:text-5xl font-semibold mb-8 tracking-wide'>Are you ready ?</h1>
                <p className='text-gray-900 text-xl xl:text-2xl font-semibold'>Dive into a world of endless color possibilities with our Color Generator. Unleash your creativity and transform your projects with a spectrum of vibrant hues. Let the exploration begin!</p>
              </div>
            </div>
            <div className={` ${signUpError ? "sm:h-[42rem] lg:h-[35rem]" : "sm:h-[27rem]"} sm:w-[40vw] w-[90vw] sm:ml-[5vw] border-2 border-purple-50 p-8 rounded-xl
         border-opacity-20 flex items-center my-12`}>
              <form className='flex flex-col text-gray-900 w-full '>
                <div className='flex justify-center  '>
                  <h2 className='text-4xl font-semibold text-purple-50 mb-4'>Join Now !</h2>
                </div>
                <label className='text-purple-50 text-lg font-semibold'> Name :  </label>
                <input onKeyDown={handleEnterSignup} value={state.name}
                  onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
                  className='h-10 mb-2 px-2 font-medium' type="text" />
                <label className='text-purple-50 text-lg font-semibold'> Email :  </label>
                <input onKeyDown={handleEnterSignup} value={state.email}
                  onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
                  className='h-10 mb-2 px-2 font-medium' type="email" />
                <label className='text-purple-50 text-lg font-semibold'> Password :  </label>
                <div className='flex items-center w-full'>
                  <input onKeyDown={handleEnterSignup} value={state.password}
                    onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
                    className='h-10 px-2 font-medium mb-2 w-full' type={inputType} />
                  <ToggleInput />
                </div>
                <button type='submit' onClick={saveTheUser} className='bg-purple-50 w-full h-12 mt-4 font-semibold text-xl text-gray-900 tracking-wider
              hover:bg-opacity-5 border-2 hover:border-opacity-20 hover:border-purple-50 hover:text-purple-50 ' >
                  {loading1 ? <Loading /> : "Sign Up"}
                </button>

                {
                  signUpError && <p className='text-red-600 text-lg font-bold mt-2'>{signUpError} !</p>
                }
                <p className='text-purple-50 text-lg font-semibold mt-4'>Already have an account ? <Link className='text-2xl text-orange-300 font-bold ' href="/pages/signin">Sign In</Link></p>

              </form>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Page
