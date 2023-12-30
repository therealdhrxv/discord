import { useEffect, useState } from "react";

type ChatScrollProps = {
	chatRef: React.RefObject<HTMLDivElement>;
	bottomRef: React.RefObject<HTMLDivElement>;
	shouldLoadMore: boolean;
	loadMore: () => void;
	count: number;
};

export const useChatScroll = (props: ChatScrollProps) => {

	const [hasInitialized, setHasInitialized] = useState(false);

	useEffect(() => {
		const topDiv = props.chatRef?.current;
		const handleScroll = () => {
			const scrollTop = topDiv?.scrollTop;
			if (scrollTop === 0 && props.shouldLoadMore) props.loadMore();
		};
		topDiv?.addEventListener("scroll", handleScroll);
		return () => {
			topDiv?.removeEventListener("scroll", handleScroll);
		};
	}, [props.shouldLoadMore, props.loadMore, props.chatRef]);

	useEffect(() => {
		const bottomDiv = props.bottomRef?.current;
		const topDiv = props.chatRef.current;
		const shouldAutoScroll = () => {
			if (!hasInitialized && bottomDiv) {
				setHasInitialized(true);
				return true;
			}
			if (!topDiv) return false;
			const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
			return distanceFromBottom <= 100;
		};
		if (shouldAutoScroll()) {
			setTimeout(() => {
				props.bottomRef.current?.scrollIntoView({
					behavior: "smooth",
				});
			}, 100);
		}
	}, [props.bottomRef, props.chatRef, props.count, hasInitialized]);
};
