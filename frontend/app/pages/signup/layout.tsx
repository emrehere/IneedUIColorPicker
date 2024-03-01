import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../app/globals.css";
import NavbarMain from "@/app/components/navbarMain";
import FooterMain from "@/app/components/footerMain";


const inter = Inter({ subsets: ["latin"] });


export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
 
        <div className="overflow-x-hidden">
        <NavbarMain propFromParent="Sign In" />
        {children}
        <FooterMain/>
        </div>
        


  );
}
