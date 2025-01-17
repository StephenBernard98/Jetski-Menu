import DashboardNav from "@/app/pages/dashboard-nav";
import Link from "next/link";
const AdminDashboard = async () => {
  return (
    <main className="max-w-[1250px] mx-auto">
      <DashboardNav />

      <section className="  mt-[8rem] h-full" id="dashboard">
        <div className="flex justify-center items-center flex-col mt-[12rem]">
          <Link href="/dashboard/food">
            <div className="bg-blue-600 tracking-wider px-12 font-bold py-4 flex items-center justify-center mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white duration-300">
              {" "}
              Food Dashboard
            </div>
          </Link>

          <div className="font-bold text-lg mt-3">or</div>

          <Link href="/dashboard/drink">
            <div className="bg-blue-600 tracking-wider px-12 font-bold py-4 flex items-center justify-center mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white duration-300">
              {" "}
              Drink Dashboard
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
