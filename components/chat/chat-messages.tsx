"use client";

import { Member } from "@prisma/client";

import { ChatWelcome } from "@/components/chat/chat-welcome";

interface ChatMessagesProps {
	name: string | undefined;
	member: Member | null;
	chatId: string | undefined;
	apiURL: string;
	socketURL: string;
	socketQuery: Record<string, any>;
	paramKey: "channelId" | "conversationId";
	paramValue: string | undefined;
	type: "channel" | "conversation";
}

export const ChatMessages = (props: ChatMessagesProps) => {
	return (
		<div className="flex-1 flex flex-col py-4 overflow-y-auto">
			<div className="flex-1" />
			<ChatWelcome name={props.name} type={props.type} />
		</div>
	);
};
