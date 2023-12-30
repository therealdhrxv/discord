import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { getOrCreateConversation } from "@/lib/conversation";

interface MemberIdPageProps {
	params: {
		memberId: string;
		serverId: string;
	};
	searchParams: {
		video?: boolean;
	};
}

const MemberIdPage = async (props: MemberIdPageProps) => {

	const profile = await currentProfile();
	if (!profile) return redirectToSignIn();

	const currentMember = await db.member.findFirst({
		where: {
			serverId: props.params.serverId,
			profileId: profile.id,
		},
		include: {
			profile: true,
		},
	});

	if (!currentMember) return redirect("/");

	const conversation = await getOrCreateConversation(currentMember.id, props.params.memberId);
	if (!conversation) return redirect(`/servers/${props.params.serverId}`);

	const { memberOne, memberTwo } = conversation;
	const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

	return (
		<div className="bg-white dark:bg-[#313338] flex flex-col h-full">
			<ChatHeader
				imageURL={otherMember.profile.imageURL}
				name={otherMember.profile.name}
				serverId={props.params.serverId}
				type="conversation"
			/>
			<ChatMessages
				member={currentMember}
				name={otherMember.profile.name}
				chatId={conversation.id}
				type="conversation"
				apiURL="/api/direct-messages"
				paramKey="conversationId"
				paramValue={conversation.id}
				socketURL="/api/socket/direct-messages"
				socketQuery={{
					conversationId: conversation.id,
				}}
			/>
			<ChatInput
				name={otherMember.profile.name}
				type="conversation"
				apiURL="/api/socket/direct-messages"
				query={{
					conversationId: conversation.id,
				}}
			/>
		</div>
	);
};

export default MemberIdPage;
