"use client";

import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { Member } from "@prisma/client";

import { ChatItem } from "@/components/chat/chat-item";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { MessageWithMemberWithProfile } from "@/types";

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

export const ChatMessages = (props: ChatMessagesProps) => {

	const queryKey = `chat:${props.chatId}`;
	const addKey = `chat:${props.chatId}:messages`;
	const updateKey = `chat:${props.chatId}:messages:update`;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
		queryKey: queryKey,
		apiURL: props.apiURL,
		paramKey: props.paramKey,
		paramValue: props.paramValue,
	});

	useChatSocket({ queryKey, addKey, updateKey });

	const chatRef = useRef<ElementRef<"div">>(null);
	const bottomRef = useRef<ElementRef<"div">>(null);

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
		<div
			ref={chatRef}
			className="flex-1 flex flex-col py-4 overflow-y-auto"
		>
			{!hasNextPage && <div className="flex-1" />}
			{!hasNextPage && (
				<ChatWelcome name={props.name} type={props.type} />
			)}
			{hasNextPage && (
				<div className="flex justify-center">
					{isFetchingNextPage ? (
						<Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
					) : (
						<button
							className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
							onClick={() => fetchNextPage()}
						>
							Load previous messages
						</button>
					)}
				</div>
			)}
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
			<div ref={bottomRef} />
		</div>
	);
};
