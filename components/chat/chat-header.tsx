import { Hash } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";
import { MobileToggle } from "@/components/mobile-toggle";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "@/components/chat/chat-video-button";

interface ChatHeaderProps {
	serverId: string;
	name?: string;
	type: "channel" | "conversation";
	imageURL?: string;
}

export const ChatHeader = (props: ChatHeaderProps) => {
	return (
		<div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
			<MobileToggle serverId={props.serverId} />
			{props.type === "channel" && (
				<Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
			)}
			{props.type === "conversation" && (
				<UserAvatar
					src={props.imageURL}
					className="h-8 w-8 md:h-8 md:w-8 mr-2"
				/>
			)}
			<p className="font-semibold text-md text-black dark:text-white">
				{props.name}
			</p>
			<div className="ml-auto flex items-center">
				{props.type === "conversation" && <ChatVideoButton />}
				<SocketIndicator />
			</div>
		</div>
	);
};
