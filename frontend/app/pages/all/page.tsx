"use client"
import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import { useContextApi } from "@/app/store/contextApi";
import { IoMdHeart } from "react-icons/io";
import { motion } from "framer-motion";


export default function Page() {

    const [hexColors, setHexColors] = useState<string[]>([]);
    const [limit, setLimit] = useState(8);

    const { colors, addToFavs, deleteColorByHex } = useContextApi();


    const generateHex = () => {

        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setHexColors([...hexColors, color]);

    }


    if (hexColors.length < limit) {
        generateHex()
    }


    const see10More = () => {

        setLimit(limit + 8)

    }


    return (
        <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="bg-gradient-to-br from-black via-gray-950 to-purple-950
         min-h-screen pb-[10vh] overflow-x-hidden">
            <Navbar />
            <div>
                <div className="text-4xl flex justify-center items-center bg-purple-50 shadow-sm shadow-gray-400   h-16  font-bold mt-8">
                    <p className="text-gray-950">Most Preferred Colors</p>
                </div>
                <motion.div
                    initial={{ x: 1000 }}
                    animate={{ x: -1000 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}

                    className="text-purple-50 mt-2"
                >
                    Most preferred colors change every single second, if you like a color, make sure you add to your favourites
                </motion.div>
                <div className="flex  flex-row items-center justify-center flex-wrap">
                    {
                        hexColors.map((color, index) => {
                            return (
                                <div key={index}>
                                    <div className="w-64 shadow-xl rounded-md h-64 m-8"
                                        style={{ backgroundColor: color, boxShadow: `2px 2px 2px ${color}` }}>
                                        <div className="hover:scale-125 flex justify-center pt-16 items-center h-full"   >
                                            {
                                                colors.includes(color) ? <div onClick={() => deleteColorByHex(color)}> <IoMdHeart size={50} color="red" /> </div>
                                                    : <div onClick={() => addToFavs(color)} ><IoMdHeart size={50} color="white" /></div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>


            </div>
            <div className="flex justify-center mt-4">
                <button className="hover:bg-opacity-5 hover:border-2 hover:text-purple-50 bg-purple-50 w-[50vw] sm:w-[30vw] mt-2 mb-8 sm:mb-4 text-gray-950 text-xl font-semibold rounded-xl bg-opacity-90 h-16 " onClick={see10More}>See 10 More</button>
            </div>

        </motion.div>
    );
}