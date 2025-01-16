import FoodForm from "@/components/shared/FoodForm";
import { getFoodById } from "@/lib/actions/food.actions";
import { auth } from "@clerk/nextjs";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import Image from "next/image";

type UpdateToNewFoodProps = {
  params: {
    id: string;
  };
};

const AddNewFood = async ({ params: { id } }: UpdateToNewFoodProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const food = await getFoodById(id);

  return (
    <>
      <section className="bg-blue-500 bg-cover bg-center w-full flex justify-around items-center">
        <div>
          <Image
            src={logo}
            alt="logo"
            className={`my-2 object-contain logo_slide_in mt-5 lg:mt-3 w-[5rem] h-[5rem] z-10 `}
          />
        </div>
        <h3 className=" font-bold text-center text-3xl text-white font-mono sm:text-left">
          Add to New Food
        </h3>
      </section>
      <div className=" my-8 ">
        <FoodForm
          userId={userId}
          type="Add to New"
          food={food}
          foodId={food._id}
        />
      </div>
    </>
  );
};

export default AddNewFood;
