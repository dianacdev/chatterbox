import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavAction } from "@/components/navigation/NavAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavItem } from "@/components/navigation/NavItem";
import { ModeToggle } from "@/components/mode-toggle";

const NavSidebar = async () => {
    const profile = await currentProfile();

    if(!profile){
        return redirect("/")
    }

    const servers = await db.server.findMany({
        where: {
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });

    return ( 
        <div className="space-y-4 flex flex-col items-center h-full w-full dark:bg-[#1e1f22] py-3 bg-slate-200 text-primary">
            <NavAction/>
            <Separator className="h-[2px] bg-slate-300 dark:bg-neutral-700 rounded-md w-10 mx-auto"/>
            {/* Rendering the Servers the user is a part of */}
            <ScrollArea className="flex-1 w-full">
                {servers.map((server)=>(
                    <div key={server.id} className="mb-4">
                        <NavItem id={server.id} imageUrl={server.imageUrl} name={server.name}/>
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements:{
                            avatarBox:"h-[48px] w-[48px] hover:scale-105 shadow-md"
                        }
                    }}
                />
            </div>
        </div>
     );
}
 
export default NavSidebar;