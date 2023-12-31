"use client";

import { Video, VideoOff } from "lucide-react";
import { useSearchParams } from "next/navigation";

import ActionTooltip from "@/components/action-tooltip";

export const ChatVideoButton = () => {

	const searchParams = useSearchParams();
	const isVideo = searchParams?.get("video");

	const Icon = isVideo ? VideoOff : Video;
	const tooltipLabel = isVideo ? "End video call" : "Start video call";

	return (
		<ActionTooltip side="bottom" label={tooltipLabel}>
			<button
				onClick={() => {}}
				className="hover:opacity-75 transition mr-4"
			>
				<Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
			</button>
		</ActionTooltip>
	);
};
