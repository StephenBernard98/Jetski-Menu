"use client";
import { useState, useEffect } from "react";
import { FoodMenuList } from ".";
import { SearchParamProps } from "@/types";
import Tab from "@/src/components/tabs";
import Image from "next/image";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import Link from "next/link";

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const FoodMenu = ({ searchParams, params }: SearchParamProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await FoodMenuList({ searchParams, params });
      setItems(fetchedItems || []);

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
                    {/* <Image
                      src={food.imageUrl}
                      alt="logo"
                      width={40}
                      height={40}
                      className={` w-[2rem] md:w-[3rem] h-[2rem] md:h-[3rem] rounded-full  mr-4`}
                    /> */}
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
    };
    fetchItems();
  }, [searchParams]);

  const onChange = (key: string) => {};

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 justify-between">
      <Link href="/">
        <div className="max-w-[400px]">
          <button
            className={` bg-blue-600 tracking-wider px-5 md:px-6 lg:px-8 mx-3 my-2 py-2 md:py-3 lg:py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white slide-in-top duration-300  `}
          >
            Drink
          </button>
        </div>
      </Link>
      <div className=" md:max-w-[800px] lg:max-w-[1200px] text-gray-700 lg:flex-1 bg-gray-50 font-bold text-4xl p-3 ">
        <Tab defaultActiveKey="1" items={itemList} onChange={onChange} />
      </div>
    </div>
  );
};

export default FoodMenu;
