import { useRouter } from "next/navigation";

interface OrdinaryButtonProps {
    title: string;
  }

export default function OrdinaryButton({ title }: OrdinaryButtonProps) {

    const router = useRouter();

    return (
        <button onClick={() => router.push("/pages/all")} className=" hover:bg-opacity-5 
        hover:border-2 hover:text-purple-50 bg-purple-50 w-[50vw]  sm:w-[15vw] 
         text-gray-950 text-md font-semibold rounded-md bg-opacity-90 h-12 transition duration-700 ease-in-out">{title}</button>
    )
}