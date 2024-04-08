import { IFood } from "@/lib/database/models/food.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

type CardProps = {
  food: IFood;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ food, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mx-2 ">
      <Link
        href={`/dashboard/food/${food._id}`}
        style={{ backgroundImage: `url(${food.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      <div className="absolute right-2 top-2 flex flex-col gap-[0.12rem] rounded-xl bg-white p-2 shadow-sm transition-all">
        <Link href={`/dashboard/food/${food._id}/update`}>
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
        <DeleteConfirmation foodId={food._id} />
        <Link href={`/dashboard/food/${food._id}`}>
          <Image
            src="/assets/icons/link.svg"
            alt="link"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <div className="flex min-h-[50px] flex-col gap-3 p-5 font-semibold md:gap-4">
        <div className="flex items-center flex-wrap gap-2">
          <span
            className={`font-semibold w-max rounded-full px-5 py-1 ${
              food.isSpicy
                ? "bg-red-300 text-red-800"
                : "bg-green-300 text-green-900"
            }`}
          >
            {food.isSpicy ? "Spicy" : `Not Spicy`}
          </span>
          <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
            {food.category !== undefined && food.category.name}
          </p>
          <p
            className="
              flex-1 text-black"
          >
            {food.foodName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
