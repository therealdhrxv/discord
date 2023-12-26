"use client";

import { X, FileIcon } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";

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
				<Image
					src={props.value}
					alt="Upload"
					fill
					className="rounded-full"
				/>
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
	if (props.value && fileType === "pdf") {
		return (
			<div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
				<FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
				<a
					href={props.value}
					target="_blank"
					rel="noopener noreferrer"
					className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
				>
					{props.value}
				</a>
				<button
					onClick={() => props.onChange("")}
					className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		);
	}
	return (
		<UploadDropzone
			endpoint={props.endpoint}
			onClientUploadComplete={(res) => {
				props.onChange(res?.[0].url);
			}}
			onUploadError={(err: Error) => {
				console.error(err);
			}}
		/>
	);
};
