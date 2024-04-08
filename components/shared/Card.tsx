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

  // const isFoodCreator =
  //   food.organizer !== undefined && userId === food.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] ">
      <Link
        href={`/dashboard/food/${food._id}`}
        style={{ backgroundImage: `url(${food.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {!hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-2 shadow-sm transition-all">
          <Link href={`/dashboard/food/${food._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
            <DeleteConfirmation foodId={food._id} />
          </Link>
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green 60">
              {food.isSpicy ? "Spicy" : `Less/No Spice`}
            </span>
            <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
              {food.category !== undefined && food.category.name}
            </p>
          </div>
        )}
      
        <Link href={`/dashboard/food/${food._id}`}>
          <p
            className="p-medium-16 md:p-medium-20 line-clamp
               flex-1 text-black"
          >
            {food.foodName}
          </p>
        </Link>
        {/* <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {food.organizer?.firstName} {food.organizer?.lastName}
          </p>
          {hasOrderLink && (
            <>
              <Link
                href={`/orders?foodId=${food._id}`}
                className="text-primary-500"
              >
                Order Details
                <Image
                  src="assets/icons/arrow.svg"
                  alt="search"
                  width={10}
                  height={10}
                />
              </Link>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Card;
