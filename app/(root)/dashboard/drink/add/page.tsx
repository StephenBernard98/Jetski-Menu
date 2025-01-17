import DrinkForm from "@/components/shared/DrinkForm";
import { auth } from "@clerk/nextjs";
import logo from "@/public/assets/images/WEBP/ljr-logo.webp";
import Image from "next/image";

const AddDrink = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-blue-500 bg-cover bg-center w-full flex justify-around items-center">
        <div>
          <Image
            src={logo}
            alt="logo"
            className={`my-2 object-contain logo_slide_in mt-5 lg:mt-3 w-[5rem] h-[5rem] z-10 `}
          />
        </div>
        <h3 className=" font-bold text-center text-3xl text-white font-mono sm:text-left">
          Add Drink
        </h3>
      </section>
      <div className=" my-5">
        <DrinkForm userId={userId} type="Add" />
      </div>
    </>
  );
};

export default AddDrink;
