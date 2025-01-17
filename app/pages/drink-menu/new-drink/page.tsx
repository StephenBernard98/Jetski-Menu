import { getAllNewDrink } from "@/lib/actions/drink.actions";
import { SearchParamProps } from "@/types";
import DrinkCollection from "@/components/shared/DrinkCollection";
import Link from "next/link";

const NewDrink = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const drink = await getAllNewDrink({
    query: searchText,
    category: category,
    page: page,
    limit: 12,
  });
  return (
    <main className="max-w-[1250px] mx-auto">
      <div className="flex bg-blue-200 mb-5 mt-[1rem] rounded-xl items-center justify-between px-3 mx-1">
        <Link href="/dashboard">
          <div className="mt-5 bg-blue-600 hover:bg-blue-700 text-[1.1rem] text-white text-center mb-5 rounded-xl p-3">
            Dashboard
          </div>
        </Link>
        <div className="font-bold text-center text-xl md:text-4xl p-3">
          New <span className="text-blue-600">Drink</span>
        </div>
      </div>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12" id="drink">
        <DrinkCollection
          data={drink?.data}
          emptyTitle="No Drink Found"
          emptyStateSubtext="Add a Drink"
          collectionType="All_Drink"
          limit={12}
          page={page}
          totalPages={drink?.totalPages}
        />
      </section>
    </main>
  );
};

export default NewDrink;
