import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import React from "react";
import NavigationAction from "@/components/navigation/navigation-action";

const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3">
            <NavigationAction />
        </div>
    );
};

export default NavigationSidebar;
