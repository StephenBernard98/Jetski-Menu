import DashboardNav from "@/app/pages/dashboard-nav";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllFood } from "@/lib/actions/food.actions";
import { SearchParamProps } from "@/types";

const FoodDashboard = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const food = await getAllFood({
    query: searchText,
    category: category,
    page: page,
    limit: 12,
  });
  return (
    <main className="max-w-[1250px] mx-auto">
      <DashboardNav />

      <div className="font-bold text-center text-xl md:text-4xl mb-5 mt-[5rem]">
        All <span className="text-blue-600">Food</span>
      </div>
      <div className="flex items-center mx-2 h-full flex-col gap-3 md:flex-row">
        <Search />
        <CategoryFilter />
      </div>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12" id="food">
        <Collection
          data={food?.data}
          emptyTitle="No Food Found"
          emptyStateSubtext="Add a Food"
          collectionType="All_Food"
          limit={12}
          page={page}
          totalPages={food?.totalPages}
        />
      </section>
    </main>
  );
};

export default FoodDashboard;
