'use client';
import Image from "next/image";
import Logo from "../../public/logo/hor_logo2.png";
import String from "@/Strings/english";
const Navigation = () => {
    return (
     <header className="w-full flex fixed">
       <div className="p-4">
       <Image
          src={Logo}
          alt={String.Img.Logo}
          height={50}
        />
       </div>
     </header>
    );
}

export default Navigation;