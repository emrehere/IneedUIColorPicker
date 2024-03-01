import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../app/globals.css";



const inter = Inter({ subsets: ["latin"] });


export default function FavouritesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


        <div>
            {children}
        </div>

  );
}
