"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: String) => void;
  value: String;
  endpoint: "serverImage" | "messageFile"; // api/uploadthing/core.ts
}

export const FileUpload = (props: FileUploadProps) => {
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
