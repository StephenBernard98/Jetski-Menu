"use client";
import { useState, useEffect } from "react";
import { DrinkMenuList } from ".";
import { SearchParamProps } from "@/types";
import Tab from "@/src/components/tabs";
import Image from "next/image";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import Link from "next/link";
import "../../home.css";
import { useRouter } from "next/navigation";
import { ThreeCircles } from "react-loader-spinner";
import { FaMessage } from "react-icons/fa6";
import Modal from "@/components/shared/Modal";

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DrinkMenu = ({ searchParams, params }: SearchParamProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);
  const [show, handleShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [endAnimation, setEndAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newDrinkPopUp, setNewDrinkPopUp] = useState(false);
  let [isPending, setIsPending] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const lastShownTime = localStorage.getItem("lastModalShowTime");
    if (
      !lastShownTime ||
      Date.now() - parseInt(lastShownTime) > 24 * 60 * 60 * 1000
    ) {
      setNewDrinkPopUp(true);
    } else {
      setNewDrinkPopUp(false);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem("lastModalShowTime", Date.now().toString());
    setNewDrinkPopUp(false);
  };

  const handleButtonClick = () => {
    setIsPending(true);
    localStorage.setItem("lastModalShowTime", Date.now().toString());
    setTimeout(() => {
      router.push("/pages/food-menu/new-food");
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(false);
      } else handleShow(true);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [show]);

  useEffect(() => {
    const stopAnimation = localStorage.getItem("drinkStopAnimationUntil");
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

  const load = () => {
    setIsLoading(true);
  };

  const handleClick = () => {
    localStorage.setItem(
      "drinkStopAnimationUntil",
      `${Date.now() + 24 * 60 * 60 * 1000}`
    );
    setTimeout(() => {
      setEndAnimation(true);
      setTimeout(() => {
        setEndAnimation(false);
      }, 24 * 60 * 60 * 1000);
    }, 1000);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await DrinkMenuList({ searchParams, params });
        setItems(fetchedItems);
        setLoading(false);

        const dynamicItemList = fetchedItems.map((item, index) => ({
          key: String(index),
          label: item.label,
          children: [
            <div key={`label-${index}`} className="">
              <div className="flex justify-center items-center">
                <Image
                  src={logo}
                  alt="logo"
                  className={`my-2 object-contain mt-5 lg:mt-3 w-[5rem] h-[5rem] z-10 `}
                />
              </div>
              <h1
                key=""
                className="text-2xl text-center text-gray-800 py-3 pb-1 font-bold"
              >
                DRINK MENU
              </h1>

              <h1
                key={`label-${index}`}
                className="text-xl font-normal uppercase text-center my-5"
              >
                {item.label}
              </h1>
            </div>,

            ...item.drinks.map((drink: any, drinkIndex: number) => (
              <div key={drinkIndex} className="max-w-[1100px] mx-auto">
                <Link href={`/dashboard/drink/${drink._id}`}>
                  <div className="mt-2 max-w-[900px] flex justify-between mx-auto items-start text-gray-700">
                    <div className="flex">
                      <Image
                        src={drink.imageUrl}
                        alt="drink-img"
                        width={40}
                        height={40}
                        className={` w-[2rem] md:w-[3rem] h-[2rem] md:h-[3rem] rounded-full  mr-4`}
                      />
                      <div>
                        <p className="text-red-500 text-lg font-[700]">
                          {drink.drinkName}
                        </p>
                        <p className="max-w-[400px] text-base font-normal mt-2 leading-6">
                          {drink.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-[540]">
                      ₦{formatPrice(drink.price)}
                    </p>
                  </div>
                </Link>
              </div>
            )),
          ],
        }));

        setItemList(dynamicItemList);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, [searchParams, params]);

  useEffect(() => {
    if (!loading && itemList.length === 0) {
      router.refresh();
    }
  }, [itemList, loading, router]);

  const onChange = (key: string) => {};

  if (loading) {
    return (
      <div className="h-screen bg-white/10 text-blue-600 flex justify-center items-center">
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color="rgb(7,127,187)"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const handleClickFired = () => {
    var element = document.querySelector(".myDiv");
    if (element) {
      var headerOffset = 80;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error("Element with class '.myDiv' not found.");
    }
  };

  return (
    <div>
      {newDrinkPopUp ? (
        <div>
          <div
            className={
              newDrinkPopUp
                ? "fixed top-0 left-0 w-[100%]  h-screen bg-black/50 -z-10 duration-700 overflow-y-scroll"
                : "fixed top-0 left-[-100%] w-[100%] h-screen bg-black/50 -z-10 duration-700 overflow-y-scroll delay-200"
            }
          ></div>
          <div
            className={
              newDrinkPopUp
                ? "fixed top-0 left-0 w-[100%] md:w-[100%] h-screen bg-white z-10 duration-700 overflow-y-scroll delay-200 rounded-tr-3xl rounded-br-3xl"
                : "fixed top-0 left-[-100%] w-[100%] md:w-[100%] h-screen bg-white z-10 duration-700 overflow-y-scroll"
            }
          >
            <Modal>
              <div className="bg-white text-black px-5 py-20 rounded-xl relative">
                <div className="flex items-center justify-center">
                  <FaMessage size={30} />
                  <h1 className="text-xl font-semibold ml-3">
                    Hey there Member!!! Check our our new drink cataglog.
                  </h1>
                </div>
                <div className="absolute bottom-0 right-1">
                  <button
                    className={` bg-transparent border-2 border-gray-400 text-black tracking-wider px-5 md:px-6 lg:px-8 mx-3 my-2 py-2 md:py-1 lg:py-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500 transition-all delay-75 font-semibold`}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={` bg-blue-600 tracking-wider px-5 md:px-6 lg:px-8 mx-3 my-2 py-2 md:py-1 lg:py-2 rounded-lg cursor-pointer hover:bg-blue-900 hover:border-blue-00 text-white border-2 border-blue-600 transition-all delay-75`}
                    onClick={handleButtonClick}
                  >
                    {!isPending ? (
                      "View"
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
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row myDiv bg-gray-50 justify-between">
          <div className="flex">
            <div className="max-w-[400px]">
              <Link href="/pages/food-menu">
                <button
                  className={` bg-blue-600 tracking-wider px-2 md:px-4 lg:px-3 mx-1 my-2 py-2 md:py-2 lg:py-3 mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white ${
                    !endAnimation && " slide-in-top"
                  } duration-200  `}
                  onClick={() => {
                    load();
                    handleClick();
                  }}
                >
                  Food
                </button>
              </Link>
              <span
                className={`text-3xl bg-blue-900 font-[900] rounded-full py-[14px] md:py-[10px] px-[25px] md:px-[21px] fixed bottom-3 right-3 cursor-pointer slide-in-blurred-top ${
                  show && "hidden"
                }`}
                onClick={handleClickFired}
              >
                &#8593;
              </span>
            </div>
            <div className="max-w-[400px]">
              <Link href="/pages/drink-menu/new-drink">
                <button
                  className={` bg-blue-600 tracking-wide px-2 md:px-4 lg:px-3 mx-1 my-2 py-2 md:py-2 lg:py-3 mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white ${
                    !endAnimation && " slide-in-top"
                  } duration-200  `}
                  onClick={() => {
                    load();
                    handleClick();
                  }}
                >
                  New Drink
                </button>
              </Link>
              <span
                className={`text-3xl bg-blue-900 font-[900] rounded-full py-[14px] md:py-[10px] px-[25px] md:px-[21px] fixed bottom-3 right-3 cursor-pointer slide-in-blurred-top ${
                  show && "hidden"
                }`}
                onClick={handleClickFired}
              >
                &#8593;
              </span>
            </div>
          </div>
          <div className=" md:max-w-[800px] lg:max-w-[1200px] myDiv text-gray-700 lg:flex-1 bg-gray-50 font-bold text-4xl p-3 right-0 ">
            <Tab defaultActiveKey="0" items={itemList} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkMenu;
