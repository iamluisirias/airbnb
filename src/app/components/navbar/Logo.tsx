'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"; // New package from next 13

const Logo = () => {

  const router = useRouter()

  return (
   <Image src={'/images/logo.png'} alt="Airbnb" className="hidden md:block cursor-pointer" height={100} width={100} />
  );
};

export default Logo;