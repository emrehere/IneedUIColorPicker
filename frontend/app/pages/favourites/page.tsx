"use client"
import Navbar from "@/app/components/navbar";
import { useContextApi } from "@/app/store/contextApi";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";





export default function Page() {

    const { getData, colors, handleDelete } = useContextApi();
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const [copiedColor, setCopiedColor] = useState<string>("");
    const [browserNoSupport, setBrowserNoSupport] = useState(false);

    const router = useRouter();


    function copyMessageTiming() {
        setCopyMessage(" Copied !");
        setTimeout(() => {
            setCopyMessage(null);
        }, 600);      
}

    const handleCopyClick = async (color: string) => {
        setCopiedColor(color);
        try {
            await navigator.clipboard.writeText(color);
            copyMessageTiming();    
            setBrowserNoSupport(false);
        } catch (error) {
            setBrowserNoSupport(true);
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
            <Navbar myTitle={"Discover Colors"}  myLink={"/pages/all"} />
            <div  >
                <h1 className="text-4xl bg-purple-50 flex justify-center p-4
            tracking-widest font-bold text-red-600  sm:h-16 h-32 items-center ">My Favourites</h1>
            </div>
            <div
                className="text-purple-50 mt-2 px-2 text-xl font-bold flex justify-center items-center  "
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
                                    {
                                        copyMessage && copiedColor === mycolor &&  (
                                            <div className="flex w-full h-full justify-center items-center text-red-600 font-bold text-lg">{copyMessage}</div>
                                        )
                                    }
                                    {
                                        browserNoSupport && copiedColor === mycolor &&  (
                                            <div className="flex w-full  h-full justify-center items-center text-red-600 font-bold text-lg">
                                                <p className="bg-purple-50 px-4 py-2 flex items-center justify-center rounded-xl">{mycolor}</p>
                                            </div>
                                        )
                                    }
                                </div>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}