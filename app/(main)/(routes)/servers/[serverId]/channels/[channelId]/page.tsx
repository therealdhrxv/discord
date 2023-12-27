import { redirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";

interface ChannelIdPageProps {
	params: {
		serverId: string;
		channelId: string;
	};
}

const ChannelIdPage = async (props: ChannelIdPageProps) => {
	
	const profile = await currentProfile();
	if (!profile) return redirectToSignIn();

	const channel = await db.channel.findUnique({
		where: {
			id: props.params.channelId,
		},
	});

	const member = await db.member.findFirst({
		where: {
			id: props.params.serverId,
			profileId: profile.id,
		},
	});

	// if (!channel || !member) redirect("/");

	return (
		<div className="bg-white dark:bg-[#313338] flex flex-col h-full">
			<ChatHeader
				name={channel?.name}
				serverId={props.params.serverId}
				type="channel"
			/>
			<ChatMessages
				type="channel"
				member={member}
				name={channel?.name}
				chatId={channel?.id}
				apiURL="/api/messages"
				socketURL="/api/socket/messages"
				socketQuery={{
					channelId: channel?.id,
					serverId: channel?.serverId,
				}}
				paramKey="channelId"
				paramValue={channel?.id}
			/>
			<ChatInput
				name={channel?.name}
				type="channel"
				apiURL="/api/socket/messages"
				query={{
					channelId: channel?.id,
					serverId: channel?.serverId,
				}}
			/>
		</div>
	);
};

export default ChannelIdPage;
