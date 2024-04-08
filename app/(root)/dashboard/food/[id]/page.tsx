import Collection from "@/components/shared/Collection";
import {
  getFoodById,
  getRelatedFoodByCategory,
} from "@/lib/actions/food.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { GiChiliPepper } from "react-icons/gi";
import { FaRegGrinTongueWink } from "react-icons/fa";
import Link from "next/link";

const FoodDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const food = await getFoodById(id);

  const relatedFood = await getRelatedFoodByCategory({
    categoryId: food.category._id,
    foodId: food._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="max-w-[1250px] mx-auto mt-3 rounded-xl flex justify-center bg-gray-200 bg-contain">
        <div className="flex justify-center items-center">
          <Image
            src={food.imageUrl}
            alt="hero image"
            width={700}
            height={700}
            className=" w-full min-h-[300px] object-cover object-center p-3 rounded-lg"
          />

          <div className="flex w-full flex-col font-bold gap-8 text-xl">
            <div className="flex flex-col gap-6">
              <div className="mt-4 flex ">
                <span className="font-bold mr-3">Food name:</span>
                <h2 className="font-bold">{food.foodName}</h2>
              </div>

              <div className="">
                <div>
                  {food.isSpicy ? (
                    <div className="font-bold flex items-center rounded-full bg-red-500/10 px-5 py-2 text-red-700 w-max">
                      <GiChiliPepper />
                      <span className="ml-2">Spicy</span>
                    </div>
                  ) : (
                    <div className="font-bold flex items-center rounded-full bg-green-500/10 px-5 py-2 text-green-700 w-max">
                      <FaRegGrinTongueWink />
                      <span className="ml-2">Not Spicy</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-1">Section:</span>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {food.category.name}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-bold mr-1">Price:</span>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    ₦{food.price}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-1">Description:</span>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {food.description}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Link href="/dashboard">
                    <button
                      className={`bg-blue-600 tracking-wider px-8 py-3 mt-7 rounded-lg hover:bg-blue-700 text-white font-bold font-roboto scale-in-center  `}
                    >
                      Go to Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOD with the same category */}
      <section className=" my-2 flex flex-col gap-2 max-w-[1250px] mx-auto md:gap-12">
        <h2 className="font-bold text-xl my-3"> Related Food </h2>

        <Collection
          data={relatedFood?.data}
          emptyTitle="No Food Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Food"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedFood?.totalPages}
        />
      </section>
    </>
  );
};

export default FoodDetails;