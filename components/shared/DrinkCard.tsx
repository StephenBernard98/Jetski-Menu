import { IDrink } from "@/lib/database/models/drink.model";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { DeleteNewDrink } from "@/components/shared/DeleteNewDrink";

type DrinkCardProps = {
  drink: IDrink;
  isNewDrinkPage: boolean; // Prop to decide if we should hide the images
};

const DrinkCard = ({ drink, isNewDrinkPage }: DrinkCardProps) => {
    const { isSignedIn } = useAuth(); 
  
  return (
    <div className="relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mx-2 ">
      {!isNewDrinkPage ? (
        <Link href={`/dashboard/drink/${drink._id}`}>
          <div
            style={{ backgroundImage: `url(${drink.imageUrl})` }}
            className="flex justify-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-[250px] md:h-[350px]"
          />
        </Link>
      ) : (
        <div>
          <div
            style={{ backgroundImage: `url(${drink.imageUrl})` }}
            className="flex justify-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-[250px] md:h-[350px]"
          />
        </div>
      )}

      <div
        className={`absolute right-2 top-2 hidden xl:flex flex-col gap-[0.12rem] rounded-xl p-2 shadow-sm transition-all  ${
          isSignedIn ? "bg-white" : "bg-none"
        }`}
      >
        {!isNewDrinkPage ? (
          <SignedIn>
            <Link href={`/dashboard/drink/${drink._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
                className="mb-2"
              />
            </Link>

            <DeleteConfirmation foodId={drink._id} />
          </SignedIn>
        ) : (
          <SignedIn>
            <DeleteNewDrink drinkId={drink._id} />
          </SignedIn>
        )}
      </div>
      <div className="flex min-h-[50px] w-full justify-between p-5 font-semibold md:gap-4">
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="rounded-full bg-gray-500/10 px-4 py-1 text-gray-500 text-sm md:text-base">
              {drink.category !== undefined && drink.category.name}
            </p>
            <p className="text-black">{drink.drinkName}</p>
          </div>
          <p className="text-black text-sm md:text-base">{drink.description}</p>
        </div>
        <div>
          <p className="text-black text-sm md:text-base">₦{drink.price}</p>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
