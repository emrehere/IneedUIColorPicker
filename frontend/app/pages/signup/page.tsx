"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSignUpContext } from '@/app/store/signUpContext'
import { useRouter } from 'next/navigation'

function Page() {

  const { state, dispatch, saveTheUser } = useSignUpContext();
  const [myToken, setMyToken] = useState<string | null>(null);
 
  const router = useRouter();
     
  useEffect(() => {
    const myToken = localStorage.getItem('token');
    setMyToken(myToken);
    if (myToken) {
        router.push("/pages/home");
    }        
  }, [ router])

  return (
    <div>
     {
       myToken && (
        <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950
        min-h-screen   overflow-x-hidden flex sm:flex-row flex-col justify-center items-center">
       <div className='bg-purple-50 sm:w-[40vw] sm:h-[27rem] sm:rounded-xl sm:rounded-tr-[15rem]
        sm:rounded-bl-[10rem] bg-opacity-80 flex items-center sm:p-8 p-8 pt-60 sm:mt-0 -mt-40 '>
         <div>
           <h1 className='text-red-600 text-5xl font-semibold mb-8 tracking-wide'>Are you ready ?</h1>
           <p className='text-gray-900 text-2xl font-semibold'>Dive into a world of endless color possibilities with our Color Generator. Unleash your creativity and transform your projects with a spectrum of vibrant hues. Let the exploration begin!</p>
         </div>
       </div>
       <div className=' sm:w-[40vw] w-[90vw] sm:h-[27rem] sm:ml-[5vw] border-2 border-purple-50 p-8 rounded-xl
         border-opacity-20 flex items-center my-12 '>
         <form className='flex flex-col text-gray-900 w-full '>
           <div className='flex justify-center  '>
             <h2 className='text-4xl font-semibold text-purple-50 mb-4'>Join Now !</h2>
           </div>
           <label className='text-purple-50 text-lg font-semibold'> Name :  </label>
           <input value={state.name}
             onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
             className='h-10 mb-2 px-2 font-medium' type="text" />
           <label className='text-purple-50 text-lg font-semibold'> Email :  </label>
           <input value={state.email}
             onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
             className='h-10 mb-2 px-2 font-medium' type="email" />
           <label className='text-purple-50 text-lg font-semibold'> Password :  </label>
           <input value={state.password}
             onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
             className='h-10 px-2 font-medium mb-2' type="password" />

           <button type='submit' onClick={saveTheUser} className='bg-purple-50 w-full h-12 mt-4 font-semibold text-xl text-gray-900 tracking-wider
              hover:bg-opacity-5 border-2 hover:border-opacity-20 hover:border-purple-50 hover:text-purple-50 ' >Sign up</button>
           <p className='text-purple-50 text-lg font-semibold mt-6'>Already have an account ? <Link className='text-2xl text-orange-300 font-bold ' href="/pages/signin">Sign In</Link></p>

         </form>
       </div>
     </div>
       )
     }
    </div>
  )
}

export default Page
