"use client";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import React, { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineFastfood } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import Link from "next/link";
import "@/app/home.css";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
// import SearchDrinkLocation from "@/components/shared/SearchDrinklocation";
import { getAllFood } from "@/lib/actions/food.actions";
import { SearchParamProps } from "@/types";

const AdminDashboard = () => {
  const [nav, setNav] = useState(false);
  const [show, handleShow] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

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
        className="flex justify-between max-w-[1250px] mx-auto items-center p-4 z-10 transition-all duration-500 cursor-pointer
       bg-blue-500 fixed w-full top-0 rounded-br-xl rounded-bl-xl"
      >
        <div className="flex justify-between w-full items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <CiMenuFries size={30} className="text-white stroke-1  " />
          </div>
          <Link href="/">
            <h1 className="text-xl  sm:text-2xl font-bold lg:text-3xl text-white px-2 cursor-pointer flex ml-2 sm:ml-0">
              Admin<span className="font-bold"> &nbsp;Dashboard</span>
            </h1>
          </Link>
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
            <Link href="/dashboard/food/add">
              <li
                // onClick={handleClick}
                className="text-xl cursor-pointer py-4 flex items-center hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg"
              >
                <MdOutlineFastfood size={25} className="ml-4 mr-3 " />
                Add Food
              </li>
            </Link>
            <li className="text-xl cursor-pointer py-4 flex items-center mt-5 hover:bg-blue-500 hover:text-white/80 duration-500 hover:rounded-lg">
              <BiSolidDrink size={25} className="ml-4 mr-3" />
              Add Drink
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-[5rem]"> </div>
      {/* 

  */}
    </div>
  );
   
};

export const getServerSideProps = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  try {
    const food = await getAllFood({
      query: searchText,
      category,
      page,
      limit: 10,
    });

    return {
      props: {
        searchParams,
        food,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        searchParams,
        food: null, // or handle error state accordingly
      },
    };
  }
};

export default AdminDashboard;
