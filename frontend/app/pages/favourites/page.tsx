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
                   
                   colors.map((color, index) => {

                    const mycolor : any = color.colors
                            
                        return (
                           
                            <div className="mt-8 relative" key={index}>
                                 

                                 <IoCloseSharp size={50} onClick={() => handleDelete(color._id)} className=" hover:scale-105 mx-8 -mb-12 
                                  rounded-xl bg-purple-50 text-red-600 cursor-pointer absolute" />
                                <div onClick={() => handleCopyClick(mycolor)} className="w-64 shadow-xl rounded-md h-64 mx-8  "
                                    style={{ backgroundColor: mycolor , boxShadow: `2px 2px 2px ${ mycolor }` }}>
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