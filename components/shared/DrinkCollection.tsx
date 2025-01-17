
"use client";

import { usePathname } from "next/navigation"; // Client-side hook to get pathname
import DrinkCard from "./DrinkCard";
import Pagination from "./Pagination";
import { IDrink } from "@/lib/database/models/drink.model";

type DrinkCollectionProps = {
  data: IDrink[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType: "Drink_Added" | "My_Tickets" | "All_Drink";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const DrinkCollection = ({
  data,
  emptyTitle,
  page,
  totalPages,
  urlParamName,
}: DrinkCollectionProps) => {
  const pathname = usePathname(); 
  const isNewDrinkPage = pathname === "/pages/drink-menu/new-drink"; 

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-3">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-3">
            {data.map((drink) => (
              <li key={drink._id} className="flex justify-center">
                <DrinkCard drink={drink} isNewDrinkPage={isNewDrinkPage} />
              </li>
            ))}
          </ul>
          {totalPages !== undefined && totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="font-bold text-2xl md:text-3xl">{emptyTitle}</h3>
        </div>
      )}
    </>
  );
};

export default DrinkCollection;
