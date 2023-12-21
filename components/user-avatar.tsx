import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
	src?: string;
	className?: string;
}

export const UserAvatar = (props: UserAvatarProps) => {
	return (
		<Avatar className={cn("h-7 w-7 md:h-10 md:w-10", props.className)}>
			<AvatarImage src={props.src} />
		</Avatar>
	);
};
