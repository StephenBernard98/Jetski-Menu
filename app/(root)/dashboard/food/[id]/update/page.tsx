import FoodForm from "@/components/shared/FoodForm";
import { auth } from "@clerk/nextjs";

const EditFood = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-blue-500 bg-cover bg-center py-5 md:py-10">
        <h3 className=" text-bold text-center sm:text-left">Edit food</h3>
      </section>
      <div className=" my-8 ">
        <FoodForm userId={userId} type="Edit" />
      </div>
    </>
  );
};

export default EditFood;
