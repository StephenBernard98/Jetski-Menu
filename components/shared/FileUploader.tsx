"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-500 "
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={122}
            height={122}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex justify-center text-center flex-col py-5 text-grey-500 bg-gray-200">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/icons/upload.svg"
              width={122}
              height={122}
              alt="file upload"
            />
          </div>
          <h3 className="mb-2 mt-2 text-gray-800 font-bold">Drag photo here</h3>
          <p className="text-gray-800 font-bold mb-4">SVG, PNG, JPG</p>
          <div className="">
            <Button type="button" className="bg-blue-600 text-lg mx-2">
              Select from computer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
