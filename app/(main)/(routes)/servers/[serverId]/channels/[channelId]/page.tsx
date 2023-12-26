import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
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
			<div className="flex-1">Future Messages</div>
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
