"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: String) => void;
  value: string;
  endpoint: "serverImage" | "messageFile"; // api/uploadthing/core.ts
}

export const FileUpload = (props: FileUploadProps) => {
  const fileType = props.value?.split(".").pop();
  if (props.value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={props.value} alt="Upload" fill className="rounded-full" />
        <button
          onClick={() => {
            props.onChange("");
          }}
          className="absolute top-0 right-0 bg-rose-500 text-white shadow-sm rounded-full p-1"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint="serverImage"
      onClientUploadComplete={(res) => {
        props.onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
};
