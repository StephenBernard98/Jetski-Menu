import { IFood } from "@/lib/database/models/food.model";
import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { DeleteNewFood } from "@/components/shared/DeleteNewFood";
import { useAuth } from "@clerk/nextjs";
type CardProps = {
  food: IFood;
  isNewFoodPage: boolean;
};

const Card = ({ food, isNewFoodPage }: CardProps) => {
  const { isSignedIn } = useAuth(); 
  
  return (
    <div
      className={`relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mx-2}`}
    >
      {!isNewFoodPage ? (
        <Link href={`/dashboard/food/${food._id}`}>
          <div
            style={{ backgroundImage: `url(${food.imageUrl})` }}
            className="flex justify-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-[250px] md:h-[350px]"
          />
        </Link>
      ) : (
        <div>
          <div
            style={{ backgroundImage: `url(${food.imageUrl})` }}
            className="flex justify-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-[250px] md:h-[350px]"
          />
        </div>
      )}

      <div
        className={`absolute right-2 top-2 flex-col gap-[0.12rem] rounded-xl hidden xl:flex p-2 shadow-sm transition-all  ${
          isSignedIn ? "bg-white" : "bg-none"
        }`}
      >
        {!isNewFoodPage ? (
          <SignedIn>
            <Link href={`/dashboard/food/${food._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
                className="mb-2"
              />
            </Link>

            <DeleteConfirmation foodId={food._id} />
          </SignedIn>
        ) : (
          <SignedIn>
            <DeleteNewFood foodId={food._id} />
          </SignedIn>
        )}
      </div>

      <div className="flex min-h-[50px] w-full justify-between p-5 font-semibold md:gap-4">
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="rounded-full bg-gray-500/10 px-4 py-1 text-gray-500 text-sm md:text-base">
              {food.category !== undefined && food.category.name}
            </p>
            <p className="text-black">{food.foodName}</p>
          </div>
          <p className="text-black text-sm md:text-base">{food.description}</p>
        </div>
        <div>
          <p className="text-black text-sm md:text-base">₦{food.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
