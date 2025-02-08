import DrinkCollection from "@/components/shared/DrinkCollection";
import {
  createNewDrink,
  getDrinkById,
  getRelatedDrinkByCategory,
} from "@/lib/actions/drink.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import newImg from "@/public/assets/images/JPG/new-img.jpg";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DrinkDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const drink = await getDrinkById(id);
  const page = Number(searchParams?.page) || 1;

  const relatedDrink = await getRelatedDrinkByCategory({
    categoryId: drink.category._id,
    drinkId: drink._id,
    page: page,
  });

  return (
    <>
      <section className="lg:max-w-[1250px] lg:mx-auto mt-3 rounded-xl flex justify-center bg-gray-200 bg-contain mx-1 md:mx-3 relative">
        <div className="flex flex-col md:flex-row justify-center items-center p-2 ">
          <Image
            src={drink.imageUrl}
            alt="hero image"
            width={700}
            height={700}
            className=" md:w-1/2 lg:w-full w-full min-h-[300px] object-cover object-center md:mr-2  rounded-lg"
          />
          <SignedIn>
            <div className="hidden xl:block">
              <div className="absolute right-3 md:right-2 top-3 md:top-2 flex flex-col gap-[0.12rem] rounded-xl bg-white p-2 shadow-sm transition-all">
                <Link href={`/dashboard/drink/${drink._id}/update`}>
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href={`/pages/drink-menu`}>
                  <IoChevronBackCircleOutline
                    size={23}
                    className="text-blue-500 mt-1"
                  />
                </Link>
              </div>
              <div className="absolute right-3 md:right-2 top-9 md:top-9 flex flex-col gap-[0.12rem] rounded-xl bg-white p-2 shadow-sm transition-all">
                <Link href={`/dashboard/drink/${drink._id}/addNew`}>
                  <span className="text-blue-500">
                    <FaArrowRightToBracket size={19} />
                  </span>
                </Link>
                <Link href={`/pages/drink-menu`}>
                  <IoChevronBackCircleOutline
                    size={23}
                    className="text-blue-500 mt-1"
                  />
                </Link>
              </div>
            </div>
          </SignedIn>

          <div className="flex w-full flex-col font-bold gap-8 text-lg md:text-xl ">
            <div className="flex flex-col gap-6">
              <div className="mt-4 flex ">
                <span className="font-bold mr-3">Drink name:</span>
                <h2 className="font-bold">{drink.drinkName}</h2>
              </div>

              <div className="">
                <div>
                  {drink.isNew ? (
                    <div className="font-bold flex items-center rounded-full w-max">
                      <Image
                        src={newImg}
                        alt="drink-img"
                        width={40}
                        height={40}
                        className={` w-[2.5rem] md:w-[3rem] h-[2.5rem] md:h-[3rem] rounded-full  mr-1`}
                      />
                      <span className="ml-2 p-2 rounded-lg text-green-700 bg-green-500/10">
                        New Drink
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-1">Section:</span>
                  <p className="rounded-full px-4 py-2.5 text-gray-900">
                    {drink.category.name}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-bold mr-1">Price:</span>
                  <p className="rounded-full px-4 py-2.5 text-gray-900">
                    ₦{formatPrice(drink.price)}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold mr-1">Description:</span>
                  <p className="rounded-full text-lg mr-1 py-2.5 text-gray-900">
                    {drink.description}
                  </p>
                </div>

                <div>
                  <div className="flex justify-center items-center">
                    <SignedOut>
                      <Link href="/pages/drink-menu">
                        <button
                          className={` bg-blue-600 tracking-wider px-12 mx-2 py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white duration-300  `}
                        >
                          Go Back
                        </button>
                      </Link>
                    </SignedOut>
                  </div>

                  <div className="flex justify-center items-center">
                    <SignedIn>
                      <Link href="/dashboard">
                        <button
                          className={` bg-blue-600 tracking-wider px-12 mx-2 py-4 mt-3 rounded-lg cursor-pointer hover:bg-blue-700 text-white duration-300  `}
                        >
                          Go to Dashboard
                        </button>
                      </Link>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DRINK with the same category */}
      <section className=" my-2 flex flex-col gap-2 max-w-[1250px] mx-auto md:gap-12">
        <h2 className="font-bold text-center text-xl md:text-3xl lg:text-4xl my-3">
          {" "}
          <span className="text-blue-500">Related</span>
          <span className="bg-black text-white px-5 py-[0.02rem] ml-2 rounded-lg">
            {" "}
            Drink{" "}
          </span>
        </h2>

        <DrinkCollection
          data={relatedDrink?.data}
          emptyTitle="No Drink Found"
          emptyStateSubtext="Add a Drink"
          collectionType="All_Drink"
          limit={6}
          page={page}
          totalPages={relatedDrink?.totalPages}
        />
      </section>
    </>
  );
};

export default DrinkDetails;
