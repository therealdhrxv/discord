import { useState, useEffect } from "react";

export const UseOrigin = () => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
    if (!isMounted) return "";
    return origin;
};
