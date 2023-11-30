import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodePageProps {
	params: {
		inviteCode: string;
	};
}

const InviteCodePage = async (props: InviteCodePageProps) => {

    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();
    if (!props.params.inviteCode) redirect("/");

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: props.params.inviteCode,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        }
    })

    if (existingServer) redirect(`/servers/${existingServer.id}`);

    const server = await db.server.update({
        where: {
            inviteCode: props.params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {profileId: profile.id}
                ]
            }
        }
    })

    if (server) return redirect(`/servers/${server.id}`);

	return null;
    
};

export default InviteCodePage;
