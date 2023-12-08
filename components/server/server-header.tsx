"use client";

import { MemberRole } from "@prisma/client";
import {
	ChevronDown,
	Settings,
	UserPlus,
	Users,
	PlusCircle,
	Trash,
	LogOut,
} from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServerHeaderProps {
	server: ServerWithMembersWithProfiles;
	role?: MemberRole;
}

export const ServerHeader = (props: ServerHeaderProps) => {
	const { onOpen } = useModal();
	const isAdmin = props.role === MemberRole.ADMIN;
	const isModerator = isAdmin || props.role === MemberRole.MODERATOR;

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger
					className="focus:outline-none"
					asChild
				>
					<button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
						{props.server.name}
						<ChevronDown className="w-5 h-5 ml-auto" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 text-sm font-medium text-black dark:text-neutral-400 space-y-[2px]">
					{isModerator && (
						<DropdownMenuItem
							className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
							onClick={() =>
								onOpen("invite", {
									server: props.server,
								})
							}
						>
							Invite People
							<UserPlus className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isAdmin && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer"
							onClick={() =>
								onOpen("editServer", {
									server: props.server,
								})
							}
						>
							Server Settings
							<Settings className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isAdmin && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer"
							onClick={() =>
								onOpen("members", {
									server: props.server,
								})
							}
						>
							Manage Members
							<Users className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isModerator && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer"
							onClick={() => {
								onOpen("createChannel");
							}}
						>
							Create Channel
							<PlusCircle className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isModerator && <DropdownMenuSeparator />}
					{isAdmin && (
						<DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
							Delete Server
							<Trash className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{!isAdmin && (
						<DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
							Leave Server
							<LogOut className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
