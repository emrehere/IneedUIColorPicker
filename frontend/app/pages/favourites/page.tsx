"use client"
import Navbar from "@/app/components/navbar";
import { useContextApi } from "@/app/store/contextApi";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";





export default function Page() {

    const { getData, colors, handleDelete } = useContextApi();
    const router = useRouter();


    const handleCopyClick = async (color: string) => {
        try {
            await navigator.clipboard.writeText(color);
            alert('Color copied to clipboard!');
        } catch (error) {
            console.error('Unable to copy to clipboard', error);
        }
    };


    useEffect(() => {
        const myToken = localStorage.getItem('token');
        console.log(myToken)
        if (!myToken) {
            router.push("/pages/signin");
        }

        if (myToken) {
            getData()
        }

    }, [router])





    return (
        <div>
            <Navbar />
            <div  >
                <h1 className="text-4xl bg-purple-50 flex justify-center p-4
            tracking-widest font-bold text-red-600  sm:h-16 h-32 items-center ">My Favourites</h1>
            </div>
            <div
                className="text-purple-50 mt-2  text-lg flex justify-center items-center  "
            >
               Click on the color to copy it !
            </div>
            <div className="flex  flex-row items-center justify-center flex-wrap ">

                {

                    colors.map((color: any, index: number) => {

                        const mycolor = color.colors

                        return (

                            <div className="mt-8 relative" key={index}>


                                <IoCloseSharp size={50} onClick={() => handleDelete(color._id)} className=" hover:scale-105 mx-8 -mb-12 
                                  rounded-xl bg-purple-50 text-red-600 cursor-pointer absolute" />
                                <div onClick={() => handleCopyClick(mycolor)} className="w-64 shadow-xl rounded-md h-64 mx-8  "
                                    style={{ backgroundColor: mycolor, boxShadow: `2px 2px 2px ${mycolor}` }}>
                                    <div className="flex justify-end">
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}