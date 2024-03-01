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
                    className="w-[50vw] flex flex-grow items-center"
                >
                    <div
                        onClick={() => router.push("/pages/home")}
                        className="bg-red-600 h-full px-2"
                    >
                        <FaArrowRightToBracket size={40} className="m-4 cursor-pointer" />
                    </div>

                </div>
                <div className="flex items-center space-x-8 h-20 px-8 " >
                    {
                        onFavPage ? <div onClick={handlePushAll}> <RedButton icon={""} title="Discover Colors" /></div>
                            : <div onClick={handlePushFav}> <RedButton icon={""} title="See My Favourites" />  </div>
                    }
                    <div onClick={signOut}>
                        <RedButton title="Sign Out" icon={<FaSignOutAlt />} />
                    </div>

                </div>
            </div>
        </div>
    );
}