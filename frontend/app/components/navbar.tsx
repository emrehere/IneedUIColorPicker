"use client"
import { useRouter } from "next/navigation";
import RedButton from "./NavbarComp/RedButton";
import OrdinaryButton from "./NavbarComp/OrdinaryButton";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useContextApi } from "../store/contextApi";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";

interface NavbarProps {
    myTitle: string;
    myLink: string;
}

export default function Navbar({ myTitle, myLink } : NavbarProps) {



    const { onFavPage, setOnFavPage, signOut } = useContextApi();


    const router = useRouter();


    const handlePush = () => {
        router.push(myLink);
    }

    useEffect(() => {
        console.log(myLink, myTitle)
    },[])

   

    return (
        <div>
            <div className=" h-20 w-full bg-purple-100 bg-opacity-10 flex flex-row">
                <div
                    className="sm:w-[50vw] flex flex-grow items-center"
                >
                    <div
                        onClick={() => router.push("/pages/home")}
                        className="bg-red-600 h-full sm:px-2 "
                    >
                        <FaArrowRightToBracket size={40} className="mt-4 m-2  sm:m-4  cursor-pointer" />
                    </div>

                </div>
                <div className="flex items-center sm:space-x-8 h-20 sm:px-8  " >
                      
                     <div onClick={handlePush}> <RedButton icon={""} title={myTitle} />  </div> 

                    <p className="h-full bg-purple-50 w-[2px] sm:hidden flex "></p>
                    <div onClick={signOut}>
                        <RedButton title="Sign Out" icon={<FaSignOutAlt />} />
                    </div>

                </div>
            </div>
        </div>
    );
}