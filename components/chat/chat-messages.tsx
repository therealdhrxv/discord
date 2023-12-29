"use client";

import { Fragment } from "react";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { Member, Message, Profile } from "@prisma/client";

import { ChatItem } from "@/components/chat/chat-item";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessagesProps {
	name: string;
	member: Member;
	chatId: string;
	apiURL: string;
	socketURL: string;
	socketQuery: Record<string, string>;
	paramKey: "channelId" | "conversationId";
	paramValue: string;
	type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
	member: Member & {
		profile: Profile;
	};
};

export const ChatMessages = (props: ChatMessagesProps) => {
	
	const queryKey = `chat:${props.chatId}`;
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
		queryKey: queryKey,
		apiURL: props.apiURL,
		paramKey: props.paramKey,
		paramValue: props.paramValue,
	});

	if (status === "pending") {
		return (
			<div className="flex flex-col flex-1 justify-center items-center">
				<Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
				<p className="text-xs text-zinc-500 dark:text-zinc-400">
					Loading messages...
				</p>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="flex flex-col flex-1 justify-center items-center">
				<ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
				<p className="text-xs text-zinc-500 dark:text-zinc-400">
					Something went wrong!
				</p>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col py-4 overflow-y-auto">
			<div className="flex-1" />
			<ChatWelcome name={props.name} type={props.type} />
			<div className="flex flex-col-reverse mt-auto">
				{data?.pages?.map((group, i) => (
					<Fragment key={i}>
						{group.items.map(
							(message: MessageWithMemberWithProfile) => (
								<ChatItem
									key={message.id}
									id={message.id}
									currentMember={props.member}
									member={message.member}
									content={message.content}
									fileURL={message.fileURL}
									deleted={message.deleted}
									timestamp={format(
										new Date(message.createdAt),
										DATE_FORMAT
									)}
									isUpdated={
										message.updatedAt !== message.createdAt
									}
									socketURL={props.socketURL}
									socketQuery={props.socketQuery}
								/>
							)
						)}
					</Fragment>
				))}
			</div>
		</div>
	);
};
