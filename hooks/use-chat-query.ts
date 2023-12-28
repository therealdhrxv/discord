import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
	queryKey: string;
	apiURL: string;
	paramKey: "channelId" | "conversationId";
	paramValue: string | undefined;
}

export const useChatQuery = (props: ChatQueryProps) => {

	const { isConnected } = useSocket();

	const fetchMessages = async ({ pageParam = undefined }) => {
		const url = qs.stringifyUrl(
			{
				url: props.apiURL,
				query: {
					cursor: pageParam,
					[props.paramKey]: props.paramValue,
				},
			},
			{ skipNull: true }
		);

		const res = await fetch(url);
		return res.json();
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryKey: [props.queryKey],
		queryFn: fetchMessages,
		getNextPageParam: (lastPage) => lastPage?.nextCursor,
		refetchInterval: isConnected ? false : 1000,
        initialPageParam: undefined,
	});

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	};
};
