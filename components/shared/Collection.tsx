"use client"; 

import { usePathname } from "next/navigation"; 
import Card from "./Card";
import Pagination from "./Pagination";
import { IFood } from "@/lib/database/models/food.model";

type CollectionProps = {
  data: IFood[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType: "Food_Added" | "My_Tickets" | "All_Food";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  page,
  totalPages,
  urlParamName,
}: CollectionProps) => {
  const pathname = usePathname();
  const isNewFoodPage = pathname === "/pages/food-menu/new-food"; 

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-3">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-3">
            {data.map((food) => (
              <li key={food._id} className="flex justify-center">
                <Card food={food} isNewFoodPage={isNewFoodPage} />
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

export default Collection;
