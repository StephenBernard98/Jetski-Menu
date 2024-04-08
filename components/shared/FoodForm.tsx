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
import { useRouter } from "next/navigation";
import { createFood, updateFood } from "@/lib/actions/food.actions";
import { IFood } from "@/lib/database/models/food.model";

type FoodFormProps = {
  userId: string;
  type: "Add" | "Edit";
  food?: IFood;
  foodId?: string;
};

const FoodForm = ({ userId, type, food, foodId }: FoodFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    document.title = "Add Food";
    window.scrollTo(0, 0);
  }, []);

  const initialValues =
    food && type === "Edit"
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
          path: `/food/${foodId}`,
        });

        if (updatedFood) {
          form.reset();
          router.push(`/food/${updatedFood._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

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
            name="isSpicy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] mx-6 w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      id="isSpicy"
                      className="mr-2 h-5 w-5 border-2 border-gray-500"
                    />
                    <label
                      htmlFor="isSpicy"
                      className="whitespace-nowrap pr-3 text-gray-800 font-bold leading-none peer-disabled:cursor-not-allowed bg-gray-200 peer-disabled:opacity-70"
                    >
                      is Spicy?
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
          {form.formState.isSubmitting ? "Submitting..." : `${type} Food `}
        </Button>
      </form>
    </Form>
  );
};

export default FoodForm;
