import { useRouter } from "next/navigation";
import { useState } from "react";

interface RedButtonProps {
    title: string;
    icon: any;
}


export default function RedButton({ title, icon }: RedButtonProps) {

    const [buttonClicked, setButtonClicked] = useState<boolean>(false);



    const router = useRouter();

    const disableFunction = () => {
        setButtonClicked(true);
        setTimeout(() => {
            setButtonClicked(false);
        }, 3000);
    }

    return (
        <button style={buttonClicked ? { cursor: "not-allowed" } : { cursor: "pointer" }} onClick={disableFunction} disabled={buttonClicked} className=" hover:bg-purple-50 hover:border-2
        hover:text-red-600 bg-red-600 w-[37vw] sm:w-[20vw] sm:min-w-40   text-lg sm:text-md
         sm:font-semibold font-bold sm:rounded-md bg-opacity-90 sm:h-12 h-20 transition duration-500 ease-in-out flex items-center 
         justify-center sm:space-x-4 sm:px-0 px-2 ">
            <p className="text-3xl">{icon}</p>
            <p>{title}</p>
         </button>
    );
}