import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

  interface UserAvatarProps{
    src?:string
    fallback?:string
    className?:string
  }
  
  export const UserAvatar = ({src, className, fallback}:UserAvatarProps) => {
    return (
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
        <AvatarImage src={src} alt="@shadcn" />
        <AvatarFallback className="bg-blue-500 text-[#F8F8FF] shadow-lg">{fallback}</AvatarFallback>
      </Avatar>
    )
  }
  