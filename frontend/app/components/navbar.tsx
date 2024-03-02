"use client"
import { useRouter } from "next/navigation";
import RedButton from "./NavbarComp/RedButton";
import OrdinaryButton from "./NavbarComp/OrdinaryButton";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useContextApi } from "../store/contextApi";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function Navbar() {



    const { onFavPage, setOnFavPage, signOut } = useContextApi();


    const router = useRouter();

    const handlePushFav = () => {
        setOnFavPage(true);
        router.push("/pages/favourites");
    }

    const handlePushAll = () => {
        setOnFavPage(false);
        router.push("/pages/all");
    }


   

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
                    {
                        onFavPage ? <div onClick={handlePushAll}> <RedButton icon={""} title="Discover Colors" /></div>
                            : <div onClick={handlePushFav}> <RedButton icon={""} title="See My Favourites" />  </div>
                    }
                    <p className="h-full bg-purple-50 w-[2px] sm:hidden flex "></p>
                    <div onClick={signOut}>
                        <RedButton title="Sign Out" icon={<FaSignOutAlt />} />
                    </div>

                </div>
            </div>
        </div>
    );
}