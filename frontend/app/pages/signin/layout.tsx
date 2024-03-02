import NavbarMain from "@/app/components/navbarMain";
import FooterMain from "@/app/components/footerMain";





export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    
     
        <div className="overflow-x-hidden">
        <div className="sm:hidden flex">
        <NavbarMain styleFromParent="none" propFromParent="Sign Up"/>     
        </div>  
        <div className="sm:flex hidden">
        <NavbarMain styleFromParent="" propFromParent="Sign Up"/>     
        </div>  
        {children}
        <FooterMain/>
        </div>
    

   
  );
}
