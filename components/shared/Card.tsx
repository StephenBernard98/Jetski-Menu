// import { IFood } from "@/lib/database/models/food.model";
// import { auth } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { SignedIn } from "@clerk/nextjs";
// import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

// type CardProps = {
//   food: IFood;
//   hasOrderLink?: boolean;
//   hidePrice?: boolean;
// };

// const Card = ({ food, hasOrderLink, hidePrice }: CardProps) => {
//   const { sessionClaims } = auth();
//   const userId = sessionClaims?.userId as string;
//   return (
//     <div className=" relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mx-2 ">
//       <Link
//         href={`/dashboard/food/${food._id}`}
//         style={{ backgroundImage: `url(${food.imageUrl})` }}
//         className="flex justify-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
//       />
//       <SignedIn>
//         <div className="absolute right-2 top-2 flex flex-col gap-[0.12rem] rounded-xl bg-white p-2 shadow-sm transition-all">
//           <Link href={`/dashboard/food/${food._id}/update`}>
//             <Image
//               src="/assets/icons/edit.svg"
//               alt="edit"
//               width={20}
//               height={20}
//             />
//           </Link>
//           <DeleteConfirmation foodId={food._id} />
//           <Link href={`/dashboard/food/${food._id}`}>
//             <Image
//               src="/assets/icons/link.svg"
//               alt="link"
//               width={20}
//               height={20}
//             />
//           </Link>
//         </div>
//       </SignedIn>

//       <div className="flex min-h-[50px] w-full justify-between p-5 font-semibold md:gap-4">
//         <div className="flex items-center justify-between gap-2">
//           <p className=" rounded-full bg-gray-500/10 px-4 py-1 text-gray-500 text-sm md:text-base">
//             {food.category !== undefined && food.category.name}
//           </p>
//           <p
//             className="
//                text-black"
//           >
//             {food.foodName}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import { IFood } from "@/lib/database/models/food.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { DeleteNewFood } from "@/components/shared/DeleteNewFood";

type CardProps = {
  food: IFood;
  isNewFoodPage: boolean; // Prop to decide if we should hide the images
};

const Card = ({ food, isNewFoodPage }: CardProps) => {
  return (
    <div className="relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mx-2 ">
      <div
        style={{ backgroundImage: `url(${food.imageUrl})` }}
        className="flex justify-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      <div className="absolute right-2 top-2 flex flex-col gap-[0.12rem] rounded-xl bg-white p-2 shadow-sm transition-all">
        {!isNewFoodPage ? (
          <SignedIn>
            <Link href={`/dashboard/food/${food._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
            <Link href={`/dashboard/food/${food._id}`}>
              <Image
                src="/assets/icons/link.svg"
                alt="link"
                width={20}
                height={20}
              />
            </Link>
            <DeleteConfirmation foodId={food._id} />
          </SignedIn>
        ) : (
          <DeleteNewFood foodId={food._id} />
        )}
      </div>

      <div className="flex min-h-[50px] w-full justify-between p-5 font-semibold md:gap-4">
        <div className="flex items-center justify-between gap-2">
          <p className="rounded-full bg-gray-500/10 px-4 py-1 text-gray-500 text-sm md:text-base">
            {food.category !== undefined && food.category.name}
          </p>
          <p className="text-black">{food.foodName}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
