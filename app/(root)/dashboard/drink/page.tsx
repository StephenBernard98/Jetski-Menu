import DashboardNav from "@/app/pages/dashboard-nav";
import DrinkCategoryFilter from "@/components/shared/DrinkCategoryFilter";
import DrinkCollection from "@/components/shared/DrinkCollection";
import Search from "@/components/shared/Search";
import { getAllDrinks } from "@/lib/actions/drink.actions";
import { SearchParamProps } from "@/types";

const DrinkDashboard = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const drink = await getAllDrinks({
    query: searchText,
    category: category,
    page: page,
    limit: 12,
  });
  return (
    <main className="max-w-[1250px] mx-auto">
      <DashboardNav />

      <div className="font-bold text-center text-xl md:text-4xl mb-5 mt-[5rem]">
        All <span className="text-blue-600">Drinks</span>
      </div>
      <div className="flex items-center mx-2 h-full flex-col gap-3 md:flex-row">
        <Search />
        <DrinkCategoryFilter />
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

export default DrinkDashboard;
