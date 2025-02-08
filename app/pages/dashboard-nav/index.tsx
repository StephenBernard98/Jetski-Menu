"use client";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import React, { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose, IoHomeOutline, IoFastFood } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineFastfood, MdOutlineMenuBook } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { BsCupStraw } from "react-icons/bs"; 
import { PiBowlFoodThin } from "react-icons/pi";
import Link from "next/link";
import "@/app/home.css";

const DashboardNav = () => {
  const [nav, setNav] = useState(false);
  const [show, handleShow] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 25) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
 

  return (
    <div className="max-w-[1250px] mx-auto">
      <div
        className="flex justify-between max-w-[1250px] mx-auto items-center p-4 z-10 transition-all duration-500 
       bg-blue-500 fixed w-full top-0 rounded-br-xl rounded-bl-xl"
      >
        <div className="flex justify-between w-full items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <CiMenuFries size={30} className="text-white stroke-1  " />
          </div>
          <h1 className="text-xl  sm:text-2xl font-bold lg:text-3xl text-white px-2 flex ml-2 sm:ml-0">
            Admin<span className="font-bold"> &nbsp;Dashboard</span>
          </h1>
        </div>
      </div>
      {/*Starting  Mobile Menu */}
      {/* This overlays the page to return the menu list */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}
      {/* Side Drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white/80 z-10 duration-500 overflow-y-scroll"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white/80 z-10 duration-500 overflow-y-scroll"
        }
      >
        <IoClose
          onClick={() => setNav(!nav)}
          size={25}
          className="absolute right-4 top-4 cursor-pointer"
        />
        {nav && (
          <div
            className={` z-10 flex flex-col items-center justify-center transition-all duration-500 ${
              slideOut ? "opacity-50" : "opacity-100"
            }`}
          >
            <Image
              src={logo}
              alt="logo"
              className={`my-2 object-contain logo_slide_in mt-5 lg:mt-3 w-[5rem] h-[5rem] z-10 ${
                slideOut && "logo_slide_out"
              }`}
            />
          </div>
        )}
        <nav>
          <ul className="flex flex-col p-4 text-gray-800 font-semibold">
            <Link href="/">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <IoHomeOutline size={25} className="ml-4 mr-3 " />
                Home
              </li>
            </Link>
            <Link href="/dashboard/food/add">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <MdOutlineFastfood size={25} className="ml-4 mr-3 " />
                Add Food
              </li>
            </Link>
            <Link href="dashboard/drink/add">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <BiSolidDrink size={25} className="ml-4 mr-3" />
                Add Drink
              </li>
            </Link>
            <Link href="/pages/food-menu">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <MdOutlineMenuBook size={25} className="ml-4 mr-3" />
                Food Menu
              </li>
            </Link>
            <Link href="/pages/drink-menu">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <MdOutlineMenuBook size={25} className="ml-4 mr-3" />
                Drink Menu
              </li>
            </Link>
            <Link href="/pages/food-menu/new-food">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <PiBowlFoodThin size={25} className="ml-4 mr-3" />
                New Food
              </li>
            </Link>
            <Link href="/pages/drink-menu/new-drink">
              <li className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
                <BsCupStraw size={25} className="ml-4 mr-3" />
                New Drink
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
   
};


export default DashboardNav;
