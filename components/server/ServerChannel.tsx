"use client"

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";

interface ServerChannelProps{
    channel: Channel;
    server: Server;
    role?:MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({
    channel, server, role
}:ServerChannelProps) => {
    const params = useParams()
    const router = useRouter()

    const Icon = iconMap[channel.type]

    return ( 
        <button
            onClick={()=>{}}
            className={cn(
                "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
            <p className={cn(
                "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 dark:text-zinc-400 transition",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-[#F8F8FF]"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" &&  role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit className="w-4 h-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc dark:hover:text-zinc-300 transition"/>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash className="w-4 h-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc dark:hover:text-zinc-300 transition"/>
                    </ActionTooltip>
                </div>
            )}
            {channel.name.toLowerCase() === "general" && (
                <Lock className="w-4 h-4 ml-auto text-zinc-500 dark:text-zinc-400"/>
            )}
        </button>
     );
}
