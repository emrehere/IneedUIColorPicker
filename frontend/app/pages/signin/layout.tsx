import NavbarMain from "@/app/components/navbarMain";
import FooterMain from "@/app/components/footerMain";





export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    
     
        <div className="overflow-x-hidden">
        <NavbarMain propFromParent="Sign Up"/>     
        {children}
        <FooterMain/>
        </div>
    

   
  );
}
