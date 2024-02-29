"use client"
import Navbar from "@/app/components/navbar";
import { useContextApi } from "@/app/store/contextApi";
import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";



export default function Page() {

    const {  getData, colors, handleDelete } = useContextApi();
  

    const handleCopyClick = async (color: string) => {
        try {
          await navigator.clipboard.writeText(color);
          alert('Copied to clipboard!');
        } catch (error) {
          console.error('Unable to copy to clipboard', error);
        }
      };


    useEffect(() => {
        getData()
        
    }, [])
   


    return (
        <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        >
            <Navbar />
            <div  >
            <h1 className="text-4xl bg-purple-50 flex justify-center p-4
            tracking-widest font-bold text-red-600 ">My Favourites</h1>
            </div>
            <div className="flex  flex-row items-center justify-center flex-wrap mt-4">                    
                
                {
                   
                   colors.map((color: Color, index: number) => {
                    const { _id: colorId, colors: colorToRender } = color;
                        
                        return (
                           
                            <div className="mt-8 relative" key={index}>
                                 

                                 <IoCloseSharp size={50} onClick={() => handleDelete(colorId)} className=" hover:scale-105 mx-8 -mb-12  rounded-xl bg-purple-50 text-red-600 cursor-pointer absolute" />
                                <div onClick={() => handleCopyClick(colorToRender)} className="w-64 shadow-xl rounded-md h-64 mx-8  "
                                    style={{ backgroundColor: colorToRender , boxShadow: `2px 2px 2px ${ colorToRender }` }}>
                                    <div className="flex justify-end">                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>
    );
}