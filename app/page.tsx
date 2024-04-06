"use client";
import Image from "next/image";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import bgImg from "@/public/assets/images/WEBP/bg-img.webp";
import { useEffect, useState } from "react";
import { Inter, Mooli, Roboto_Mono } from "next/font/google";
import "./home.css";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const mooli = Mooli({ subsets: ["latin"], weight: "400" });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true); // Reset showLogo after 20 minutes
    }, 20 * 60 * 1000); // 20 minutes in milliseconds

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  const heroStyle = {
    backgroundImage: `url(${bgImg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: "0",
  };

  useEffect(() => {
    const hideUntil = localStorage.getItem("hideLogoUntil");
    const currentTime = Date.now();
    if (hideUntil && parseInt(hideUntil) > currentTime) {
      setShowLogo(false); // Hide the logo if still within the hiding period
      setTimeout(() => {
        setShowLogo(true); // Reset showLogo after 20 minutes
      }, parseInt(hideUntil) - currentTime);
    }
  }, []);

  const handleClick = () => {
    setSlideOut(true);
    localStorage.setItem("hideLogoUntil", `${Date.now() + 20 * 60 * 1000}`);
    setTimeout(() => {
      setShowLogo(false);
    }, 1000);
  };

  return (
    <div>
      <main className=" h-screen  relative" style={heroStyle}>
        {showLogo && (
          <div
            className={`fixed top-0 left-0 w-full h-full bg-black/90 z-10 flex flex-col items-center justify-center transition-all duration-700 ${
              slideOut ? "opacity-50" : "opacity-100"
            }`}
          >
            <Image
              src={logo}
              alt="logo"
              className={`my-2 object-contain logo_slide_in mt-20 lg:mt-3 w-[16rem] h-[16rem] z-10 ${
                slideOut && "logo_slide_out"
              }`}
            />
            <div className="flex justify-center">
              <button
                className={`bg-blue-600 tracking-wider px-16 py-4 mt-7 rounded-lg hover:bg-blue-700 text-white z-30 font-bold font-roboto duration-150 slide-in-button ${
                  mooli.className
                } ${inter.className} ${slideOut && "slide-out-button"}`}
                onClick={handleClick}
              >
                Welcome
              </button>
            </div>
          </div>
        )}

        <section className="flex relative flex-col h-full justify-center items-center">
          <div className="absolute top-2 right-3">
            {!showLogo && (
              <div>
                <SignedOut>
                  <Link href="/sign-in">
                    <button
                      className={`${mooli.className} ${inter.className} bg-blue-600 tracking-wider px-16 py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white z-30 font-bold font-roboto slide-in-right  `}
                    >
                      Admin
                    </button>
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link href="/pages/dashboard">
                    <button
                      className={`${mooli.className} ${inter.className} bg-blue-600 tracking-wider px-16 py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white z-30 font-bold font-roboto slide-in-right  `}
                    >
                      Dashboard
                    </button>
                  </Link>
                </SignedIn>
              </div>
            )}
          </div>
          {!showLogo && (
            <h1
              className={`${mooli.className} ${inter.className} text-white font-bold text-2xl pt-5 md:text-4xl text-center slide-in-fwd-left`}
            >
              Hello our Lovely member. Welcome to Jetski!!
            </h1>
          )}

          {!showLogo && (
            <h1
              className={`${mooli.className} ${inter.className} text-white font-bold text-2xl md:text-4xl text-center my-10 slide-in-left`}
            >
              What would you like to have?
            </h1>
          )}
          <section>
            {!showLogo && (
              <Link href="/pages/food-menu">
                <button
                  className={`${mooli.className} ${inter.className} bg-blue-600 tracking-wider px-16 py-4 mt-7 rounded-lg hover:bg-blue-700 text-white z-30 font-bold font-roboto scale-in-center  `}
                >
                  Food
                </button>
              </Link>
            )}
            {!showLogo && (
              <p
                className={`${mooli.className} ${inter.className} text-white font-bold text-base text-center scale-in-center  my-3`}
              >
                or
              </p>
            )}
            {!showLogo && (
              <button
                className={`${mooli.className} ${inter.className} bg-blue-600 tracking-wider px-16 py-4 mt-7 rounded-lg hover:bg-blue-700 text-white z-30 font-bold font-roboto scale-in-center  `}
              >
                Drink
              </button>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
