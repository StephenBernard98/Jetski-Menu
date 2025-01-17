"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { IDrinkCategory } from "@/lib/database/models/drinkcategory.model";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { startTransition } from "react";
import {
  createDrinkCategory,
  getAllDrinkCategories,
  deleteDrinkCategory,
} from "@/lib/actions/drinkcategory.actions";

type DrinkDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const DrinkDropdown = ({ onChangeHandler, value }: DrinkDropdownProps) => {
  const [categories, setCategories] = useState<IDrinkCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<IDrinkCategory | null>(
    null
  );

  const handleAddDrinkCategory = () => {
    createDrinkCategory({
      drinkCategoryName: newCategory.trim(),
    }).then((category) => {
        setCategories((prevState) => [...prevState, category]);
    });
  };

  const handleDeleteDrinkCategory = () => {
    if (categoryToDelete) {
      deleteDrinkCategory({
        drinkCategoryId: categoryToDelete._id,
      })
        .then((response) => {
          if (response.success) {
            setCategories((prevState) =>
              prevState.filter(
                (category) => category._id !== categoryToDelete._id
              )
            );
            setCategoryToDelete(null);
          } else {
            alert(response.message);
          }
        })
        .catch((error) => {
          console.error("Error deleting category: ", error);
          alert("Error deleting category");
        });
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllDrinkCategories();
      categoryList && setCategories(categoryList as IDrinkCategory[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="bg-gray-100 p-5">
        <SelectValue placeholder=" Category " />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <div key={category._id} className="relative">
              <SelectItem
                className="font-bold text-gray-500 cursor-pointer"
                value={category._id}
              >
                {category.name}
              </SelectItem>
              <Image
                src="/assets/icons/delete.svg"
                alt="delete"
                width={20}
                height={20}
                className=" absolute top-1 right-0 cursor-pointer"
                onClick={() => setCategoryToDelete(category)}
              />
            </div>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className=" w-full flex rounded-sm py-3 pl-8 text-gray-700 hover:bg-gray-50 focus:text-gray-700">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="text-gray-900 m-3 font-semibold"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-blue-500"
                onClick={() => startTransition(handleAddDrinkCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Confirmation Dialog */}
        {categoryToDelete && (
          <AlertDialog
            open={true}
            onOpenChange={() => setCategoryToDelete(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-black/80">
                  This action will delete the category{" "}
                  <strong>{categoryToDelete.name}</strong>. Are you sure you
                  want to continue? <br />
                  Note: Please do not delete a category with an existing drink
                  item
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => setCategoryToDelete(null)} 
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white"
                  onClick={handleDeleteDrinkCategory}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </SelectContent>
    </Select>
  );
};

export default DrinkDropdown;
