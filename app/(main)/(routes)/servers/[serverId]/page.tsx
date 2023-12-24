import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

interface ServerIdPageProps {
	params: {
		serverId: string;
	};
}

const ServerIdPage = async (props: ServerIdPageProps) => {

	const profile = await currentProfile();
	if (!profile) return redirectToSignIn();

	const server = await db.server.findUnique({
		where: {
			id: props.params.serverId,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
		include: {
			channels: {
				where: {
					name: "general",
				},
				orderBy: {
					createdAt: "asc",
				},
			},
		},
	});

	const initialChannel = server?.channels[0];

	if (initialChannel?.name !== "general") return null;

	return redirect(
		`/servers/${props.params.serverId}/channels/${initialChannel?.id}`
	);
    
};

export default ServerIdPage;
