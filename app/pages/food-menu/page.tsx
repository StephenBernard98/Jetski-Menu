"use client";
import { useState, useEffect } from "react";
import { FoodMenuList } from ".";
import { SearchParamProps } from "@/types";
import Tab from "@/src/components/tabs";
import Image from "next/image";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import Link from "next/link";
import "../../home.css";
import { useRouter } from "next/navigation";
import { ThreeCircles } from "react-loader-spinner";

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const FoodMenu = ({ searchParams, params }: SearchParamProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);
  const [show, handleShow] = useState(true);
  const [loading, setLoading] = useState(true); 
   const router = useRouter();

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
    const fetchItems = async () => {
      try {
        const fetchedItems = await FoodMenuList({ searchParams, params });
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
                FOOD MENU
              </h1>

              <h1
                key={`label-${index}`}
                className="text-xl font-normal uppercase text-center my-5"
              >
                {item.label}
              </h1>
            </div>,

            ...item.foods.map((food: any, foodIndex: number) => (
              <div key={foodIndex} className="max-w-[1100px] mx-auto">
                <Link href={`/dashboard/food/${food._id}`}>
                  <div className="mt-2 max-w-[900px] flex justify-between mx-auto items-start text-gray-700">
                    <div className="flex">
                      <Image
                        src={food.imageUrl}
                        alt="logo"
                        width={40}
                        height={40}
                        className={` w-[2rem] md:w-[3rem] h-[2rem] md:h-[3rem] rounded-full  mr-4`}
                      />
                      <div>
                        <p className="text-red-500 text-lg font-[700]">
                          {food.foodName}
                        </p>
                        <p className="max-w-[400px] text-base font-normal mt-2 leading-6">
                          {food.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-[540]">
                      ₦{formatPrice(food.price)}
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
      // Reload the page if itemList is empty
      if (!loading && itemList.length === 0) {
        router.refresh();
      }
    }, [itemList, loading, router]);

  const onChange = (key: string) => { };
  
    if (loading) {
      return (
        <div className="h-screen bg-white/10 text-blue-600 flex justify-center items-center">
          {" "}
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
    <div className="flex flex-col lg:flex-row myDiv bg-gray-50 justify-between">
      <div className="max-w-[400px]">
        <Link href="/">
          <button
            className={` bg-blue-600 tracking-wider px-5 md:px-6 lg:px-8 mx-3 my-2 py-2 md:py-3 lg:py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white slide-in-top duration-300  `}
          >
            Drink
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
      <div className=" md:max-w-[800px] lg:max-w-[1200px] myDiv text-gray-700 lg:flex-1 bg-gray-50 font-bold text-4xl p-3 right-0 ">
        <Tab defaultActiveKey="1" items={itemList} onChange={onChange} />
      </div>
    </div>
  );
};

export default FoodMenu;
