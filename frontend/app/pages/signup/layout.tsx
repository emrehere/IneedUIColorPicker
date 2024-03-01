import NavbarMain from "@/app/components/navbarMain";
import FooterMain from "@/app/components/footerMain";




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
