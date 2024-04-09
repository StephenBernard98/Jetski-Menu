import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-blue-600">
      <div className="flex justify-center items-center text-white text-lg md:text-xl flex-col gap-1 w-full p-2 text-center sm:flex-row">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={45}
            height={35}
            className="mr-3"
          />
        </Link>
        <p> Alchemy of Codes &copy; {date} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
