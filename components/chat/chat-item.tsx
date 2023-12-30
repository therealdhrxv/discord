"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
	Edit,
	FileIcon,
	ShieldAlert,
	ShieldCheck,
	Trash,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import ActionTooltip from "@/components/action-tooltip";
import { UserAvatar } from "@/components/user-avatar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from "@/components/ui/form";

interface ChatItemProps {
	id: string;
	content: string;
	member: Member & {
		profile: Profile;
	};
	timestamp: string;
	fileURL: string | null;
	deleted: boolean;
	currentMember: Member;
	isUpdated: boolean;
	socketURL: string;
	socketQuery: Record<string, string>;
}

const roleIconMap = {
	GUEST: null,
	MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
	ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const formSchema = z.object({
	content: z.string().min(1),
});

export const ChatItem = (props: ChatItemProps) => {

	const [isEditing, setIsEditing] = useState(false);
	const params = useParams();
	const router = useRouter();

	const { onOpen } = useModal();

	const onMemberClick = () => {
		if (props.member.id === props.currentMember?.id) return;
		router.push(
			`/servers/${params?.serverId}/conversations/${props.member.id}`
		);
	};

	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (event.key === "Escape" || event.keyCode === 27) {
				setIsEditing(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keyDown", handleKeyDown);
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: props.content,
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: `${props.socketURL}/${props.id}`,
				query: props.socketQuery,
			});
			await axios.patch(url, values);
			form.reset();
			setIsEditing(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		form.reset({
			content: props.content,
		});
	}, [props.content]);

	const fileType = props.fileURL?.split(".").pop();

	const isAdmin = props.currentMember.role === MemberRole.ADMIN;
	const isModerator = props.currentMember.role === MemberRole.MODERATOR;
	const isOwner = props.currentMember.id === props.member.id;
	const canDeleteMessage = !props.deleted && (isAdmin || isModerator || isOwner);
	const canEditMessage = !props.deleted && isOwner && !props.fileURL;
	const isPDF = fileType === "pdf" && props.fileURL;
	const isImage = !isPDF && props.fileURL;

	return (
		<div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
			<div className="group flex gap-x-2 items-start w-full">
				<div
					onClick={onMemberClick}
					className="cursor-pointer hover:drop-shadow-md transition"
				>
					<UserAvatar src={props.member.profile.imageURL} />
				</div>
				<div className="flex flex-col w-full">
					<div className="flex items-center gap-x-2">
						<div className="flex items-center">
							<p
								onClick={onMemberClick}
								className="font-semibold text-sm hover:underline cursor-pointer"
							>
								{props.member.profile.name}
							</p>
							<ActionTooltip label={props.member.role}>
								{roleIconMap[props.member.role]}
							</ActionTooltip>
						</div>
						<span className="text-xs text-zinc-500 dark:text-zinc-400">
							{props.timestamp}
						</span>
					</div>
					{isImage && (
						<a
							href={props.fileURL || undefined}
							target="_blank"
							rel="noopener noreferrer"
							className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
						>
							<Image
								src={props.fileURL || ""}
								alt={props.content}
								fill
								className="object-cover"
							/>
						</a>
					)}
					{isPDF && (
						<div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
							<FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
							<a
								href={props.fileURL || undefined}
								target="_blank"
								rel="noopener noreferrer"
								className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
							>
								PDF File
							</a>
						</div>
					)}
					{!props.fileURL && !isEditing && (
						<p
							className={cn(
								"text-sm text-zinc-600 dark:text-zinc-300",
								props.deleted &&
									"italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
							)}
						>
							{props.content}
							{props.isUpdated && !props.deleted && (
								<span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
									(edited)
								</span>
							)}
						</p>
					)}
					{!props.fileURL && isEditing && (
						<Form {...form}>
							<form
								className="flex items-center w-full gap-x-2 pt-2"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<div className="relative w-full">
													<Input
														disabled={
															isLoading
														}
														className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
														placeholder="Edited message"
														{...field}
													/>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button
									disabled={isLoading}
									size="sm"
									variant="primary"
								>
									Save
								</Button>
							</form>
							<span className="text-[10px] mt-1 text-zinc-400">
								Press escape to cancel, enter to save
							</span>
						</Form>
					)}
				</div>
			</div>
			{canDeleteMessage && (
				<div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
					{canEditMessage && (
						<ActionTooltip label="Edit">
							<Edit
								onClick={() => setIsEditing(true)}
								className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
							/>
						</ActionTooltip>
					)}
					<ActionTooltip label="Delete">
						<Trash
							onClick={() =>
								onOpen("deleteMessage", {
									apiURL: `${props.socketURL}/${props.id}`,
									query: props.socketQuery,
								})
							}
							className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
						/>
					</ActionTooltip>
				</div>
			)}
		</div>
	);
};