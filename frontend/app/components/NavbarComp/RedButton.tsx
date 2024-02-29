import { useRouter } from "next/navigation";

interface RedButtonProps {
    title: string;
}


export default function RedButton({ title }: RedButtonProps) {

    const router = useRouter();

    return (
        <button onClick={() => router.push("/pages/favourites")} className=" hover:bg-purple-50 hover:border-2
        hover:text-red-600 bg-red-600 w-[50vw] sm:w-[20vw] min-w-40   text-opacity-0 text-md
         font-semibold rounded-md bg-opacity-90 h-12 transition duration-500 ease-in-out">{title}</button>
    );
}