"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

interface ServerHeaderProps {
	server: ServerWithMembersWithProfiles;
	role?: MemberRole;
}

export const ServerHeader = (props: ServerHeaderProps) => {
    return (
        <div>
            Server Header lol
        </div>
    )
}
