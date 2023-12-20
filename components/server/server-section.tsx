"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

import { ServerWithMembersWithProfiles } from "@/types";
import ActionTooltip from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
	label: string;
	role?: MemberRole;
	sectionType: "channels" | "members";
	channelType?: ChannelType;
	server?: ServerWithMembersWithProfiles;
}

export const ServerSection = (props: ServerSectionProps) => {
	const { onOpen } = useModal();
	return (
		<div className="flex items-center justify-between py-2">
			<p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
				{props.label}
			</p>
			{props.role !== MemberRole.GUEST && props.sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        onClick={() => onOpen("createChannel")}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
		</div>
	);
};
