"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { foodFormSchema } from "@/lib/Validator";
import * as z from "zod";
import { foodDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState, useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { usePathname, useRouter } from "next/navigation";
import {
  createFood,
  createNewFood,
  updateFood,
} from "@/lib/actions/food.actions";
import { IFood } from "@/lib/database/models/food.model";
import Modal from "@/components/shared/Modal";
import { ThreeCircles } from "react-loader-spinner";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";

type FoodFormProps = {
  userId: string;
  type: "Add" | "Edit" | "Add to New";
  food?: IFood;
  foodId?: string;
};

const FoodForm = ({ userId, type, food, foodId }: FoodFormProps) => {
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newFoodExistPopUp, setNewFoodExistPopUp] = useState(false);

  useEffect(() => {
    if (food && type === "Edit") {
      document.title = "Edit Food";
    } else if (food && type === "Add to New") {
      document.title = "Add to New Food";
    } else {
      document.title = "Add Food";
    }
    window.scrollTo(0, 0);
  }, []);

  const initialValues =
    food && (type === "Edit" || type == "Add to New")
      ? {
          ...food,
        }
      : foodDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof foodFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Add") {
      try {
        const newFood = await createFood({
          food: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/dashboard",
        });

        if (newFood) {
          form.reset();
          router.push(`/dashboard/food/${newFood._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Edit") {
      if (!foodId) {
        router.back();
        return;
      }

      try {
        const updatedFood = await updateFood({
          userId,
          food: { ...values, imageUrl: uploadedImageUrl, _id: foodId },
          path: `/dashboard/food/${foodId}`,
        });

        if (updatedFood) {
          form.reset();
          router.push(`/dashboard`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Add to New") {
      if (!foodId) {
        router.back();
        return;
      }

      try {
        const newFood = await createNewFood({
          food: { ...values, _id: foodId },
          path: "/food-menu/new-food",
        });

        if (newFood) {
          form.reset();
          setTimeout(() => {
            router.push(`/pages/food-menu/new-food`);
          }, 1000);
        }
      } catch (error) {
        setNewFoodExistPopUp(true);
      }
    }
  }

  const load = () => {
    setIsLoading(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mx-2 p-2"
      >
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="foodName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Food Name"
                    {...field}
                    className="bg-gray-100 p-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full text-gray-500">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72 bg-gray-200">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="p-3 rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-48 border-2 border-gray-50 bg-gray-200">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <div className="flex justify-center h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <Input
                      type="number"
                      placeholder="Price: ₦"
                      {...field}
                      className=" border-0 bg-gray-200 outline-offset-0 py-5 text-lg focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNew"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] mx-1 md:mx-6 w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      id="isNew"
                      className="mr-2 h-5 w-5 border-2 border-gray-500"
                    />
                    <label
                      htmlFor="isNew"
                      className="whitespace-nowrap pr-3 text-gray-800 font-bold leading-none peer-disabled:cursor-not-allowed bg-gray-200 peer-disabled:opacity-70"
                    >
                      New Food?
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="bg-blue-600 text-xl col-span-2 w-full hover:bg-blue-700"
        >
          {form.formState.isSubmitting ? (
            <>
              {() => setIsLoading(true)}
              <ThreeCircles
                visible={true}
                height="30"
                width="30"
                color="white"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </>
          ) : (
            `${type} Food`
          )}
        </Button>
      </form>
      {newFoodExistPopUp && (
        <div
          className={
            newFoodExistPopUp
              ? "fixed top-0 left-0 w-[100%] md:w-[100%] h-screen bg-black/70 z-10 duration-700 overflow-y-scroll delay-200 rounded-tr-3xl rounded-br-3xl"
              : "fixed top-0 left-[-100%] w-[100%] md:w-[100%] h-screen bg-black/70 z-10 duration-700 overflow-y-scroll"
          }
        >
          <Modal>
            <div className="bg-white text-black px-5 py-20 rounded-xl ">
              <div className="flex items-center justify-center">
                <FaMessage size={30} />
                <h1 className="text-xl font-semibold ml-3">
                  Already in New Food Section
                </h1>
              </div>
              <div className="relative">
                <Link href="/dashboard">
                
                <Button className="mt-5 bg-black/90 hover:bg-black/80 text-white absolute right-2 mx-24">
                  Dashboard
                </Button>
                </Link>
                <Button
                  onClick={() => setNewFoodExistPopUp(false)} // Close the modal
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white absolute right-2"
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Form>
  );
};

export default FoodForm;
