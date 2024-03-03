"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import Page from '../all/page'
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useContextApi } from "../../store/contextApi";



export default function Home() {

  const router = useRouter();

  const {onFavPage, setOnFavPage} = useContextApi();
  const [myToken, setMyToken] = useState<string | null>(null);

  const handlePushFav = () => {
    setOnFavPage(true);    
    router.push("/pages/favourites");
  }

  const handlePushAll = () => {
    setOnFavPage(false);
    router.push("/pages/all");
  }

  useEffect(() => {
    const myToken = localStorage.getItem('token');
    setMyToken(myToken);
    if (!myToken) {
        router.push("/pages/signin");
    }
  }, [ router ])


  return (
    <main className="overflow-x-hidden">
     {
        myToken && (
          <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950 min-h-screen ">
          <div className=" w-[100vw] flex items-center pt-[9vh] sm:mt-0 sm:pt-[2vh]  flex-col">
            <div className="my-12 font-semibold text-4xl sm:text-5xl flex flex-col items-center tracking-widest  ">
              <h1 className="m-1 ">Welcome To</h1>
              <h2> UI Color Picker</h2>
            </div>
            <p className="font-medium  mb-4 text-2xl mt-4  ">What do yo wanna do ?</p>
          </div>
          <div className="w-[100vw] sm:w-[70vw] sm:mx-auto   flex flex-wrap items-center flex-col mt-16 sm:flex-row">
  
            <button onClick={handlePushFav} className=" hover:bg-opacity-5 hover:border-2 sm:mr-20 hover:text-purple-50 bg-purple-50 w-[50vw] sm:w-[30vw] mt-2 mb-8 sm:mb-4 text-gray-950 text-xl font-semibold rounded-xl bg-opacity-90 h-16 ">See My Favourites</button>
            <button onClick={handlePushAll} className=" hover:bg-opacity-5 hover:border-2 hover:text-purple-50 bg-purple-50 w-[50vw] sm:mr-12 sm:w-[30vw] mt-2 mb-4 text-gray-950 text-xl font-semibold rounded-xl bg-opacity-90 h-16 ">Discover Colors</button>
          </div>
  
        </div>
        )
     }
    </main>
  );
}
