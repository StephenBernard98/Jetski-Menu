"use client";
import Image from "next/image";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import bgImg from "@/public/assets/images/WEBP/bg-img.webp";
import { useEffect, useState } from "react";
import ".././home.css";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ThreeCircles } from "react-loader-spinner";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [foodIsLoading, setFoodIsLoading] = useState(false);
  const [drinkIsLoading, setDrinkIsLoading] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 24 * 60 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();

  const load = () => {
    setIsLoading(true);
  };

  const foodLoad = () => {
    setFoodIsLoading(true);
  };
  const drinkLoad = () => {
    setDrinkIsLoading(true);
  };

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
      setShowLogo(false);
      const timeUntilShow = parseInt(hideUntil) - currentTime;
      if (timeUntilShow > 0) {
        setTimeout(() => {
          setShowLogo(true);
        }, timeUntilShow);
      } else {
        setShowLogo(true);
      }
    }
  }, []);

  useEffect(() => {
    const stopAnimation = localStorage.getItem("stopAnimationUntil");
    const currentTime = Date.now();
    if (stopAnimation && parseInt(stopAnimation) > currentTime) {
      setEndAnimation(true);
      const timeUntilStartAnimation = parseInt(stopAnimation) - currentTime;
      if (timeUntilStartAnimation > 0) {
        setTimeout(() => {
          setEndAnimation(false);
        }, timeUntilStartAnimation);
      } else {
        setEndAnimation(false);
      }
    }
  }, []);

  const handleClick = () => {
    setSlideOut(true);
    localStorage.setItem(
      "hideLogoUntil",
      `${Date.now() + 24 * 60 * 60 * 1000}`
    );
    setTimeout(() => {
      setShowLogo(false);
      setTimeout(() => {
        setShowLogo(true);
      }, 24 * 60 * 60 * 1000);
    }, 1000);
  };

  const handleClickFired = () => {
    localStorage.setItem(
      "stopAnimationUntil",
      `${Date.now() + 24 * 60 * 60 * 1000}`
    );
    setTimeout(() => {
      setEndAnimation(true);
      setTimeout(() => {
        setEndAnimation(false);
      }, 24 * 60 * 60 * 1000);
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
                className={`bg-blue-600 tracking-wider px-16 py-4 mt-7 rounded-lg hover:bg-blue-700 text-white duration-150 slide-in-button ${
                  slideOut && "slide-out-button"
                }`}
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
              <div className="hidden xl:block">
                <SignedOut>
                  <Link href="/sign-in">
                    <button
                      className={`bg-blue-600 tracking-wider px-12 mx-2 py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white ${
                        !endAnimation && " slide-in-top"
                      } duration-300`}
                      onClick={() => {
                        load();
                        handleClickFired();
                      }}
                    >
                      {!isLoading ? (
                        "Admin"
                      ) : (
                        <ThreeCircles
                          visible={true}
                          height="30"
                          width="30"
                          color="white"
                          ariaLabel="three-circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      )}
                    </button>
                  </Link>
                </SignedOut>

                <div className="flex items-center">
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <Link href="/dashboard">
                      <button
                        className={`bg-blue-600 tracking-wider px-12 mx-2 py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white ${
                          !endAnimation && " slide-in-top"
                        } duration-300`}
                        onClick={() => {
                          load();
                          handleClickFired();
                        }}
                      >
                        {!isLoading ? (
                          "Dashboard"
                        ) : (
                          <ThreeCircles
                            visible={true}
                            height="30"
                            width="30"
                            color="white"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        )}
                      </button>
                    </Link>
                  </SignedIn>
                </div>
              </div>
            )}
          </div>
          {!showLogo && (
            <h1
              className={` text-white font-bold text-2xl pt-5 md:text-4xl text-center ${
                !endAnimation && " slide-in-fwd-left"
              }`}
            >
              Hello our Lovely member. Welcome to Jetski!!
            </h1>
          )}

          {!showLogo && (
            <h1
              className={` text-white font-bold text-2xl md:text-4xl text-center my-10 ${
                !endAnimation && " slide-in-left"
              }`}
            >
              What would you like to have?
            </h1>
          )}
          <section>
            {!showLogo && (
              <Link href="/pages/food-menu">
                <button
                  className={` bg-blue-600 tracking-wider px-12 py-4 mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white ${
                    !endAnimation && "scale-in-center"
                  } duration-300  `}
                  onClick={() => {
                    foodLoad();
                    handleClickFired();
                  }}
                >
                  {!foodIsLoading ? (
                    "Food"
                  ) : (
                    <ThreeCircles
                      visible={true}
                      height="30"
                      width="30"
                      color="white"
                      ariaLabel="three-circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </button>
              </Link>
            )}
            {!showLogo && (
              <p
                className={` text-white font-bold text-base text-center ${
                  !endAnimation && "scale-in-center"
                }  my-3`}
              >
                or
              </p>
            )}
            {!showLogo && (
              <Link href="/pages/drink-menu">
                <button
                  className={` bg-blue-600 tracking-wider px-12 py-4 mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white ${
                    !endAnimation && "scale-in-center"
                  } duration-300  `}
                  onClick={() => {
                    drinkLoad();
                    handleClickFired();
                  }}
                >
                  {!drinkIsLoading ? (
                    "Drink"
                  ) : (
                    <ThreeCircles
                      visible={true}
                      height="30"
                      width="30"
                      color="white"
                      ariaLabel="three-circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </button>
              </Link>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
