import type { Metadata } from "next";
import { Inter } from "next/font/google";




const inter = Inter({ subsets: ["latin"] });


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 

        <>
        {children}
        </>

   
  );
}
