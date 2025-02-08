import DashboardNav from "@/app/pages/dashboard-nav";
import Link from "next/link";
import bgImg from "@/public/assets/images/WEBP/jetski-pic.webp";

const AdminDashboard = async () => {
  const heroStyle = {
    backgroundImage: `url(${bgImg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: "0",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  };
  return (
    <main className="max-w-[1250px] mx-auto">
      <DashboardNav />

      <section
        className="  mt-[4.3rem] p-[6.3rem] relative"
        id="dashboard"
        style={heroStyle}
      >
        <div className="flex justify-center items-center flex-col mt-[6rem]">
          <Link href="/dashboard/food">
            <div className="bg-blue-600 tracking-wider px-12 font-bold py-4 flex items-center justify-center mt-4 rounded-lg cursor-pointer hover:bg-blue-700 text-white duration-300">
              {" "}
              Food Dashboard
            </div>
          </Link>

          <div className="font-bold text-lg text-white mt-3">or</div>

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
