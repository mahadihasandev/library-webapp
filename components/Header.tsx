'use client'
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Session } from "next-auth";



export default function Header({session}:{session: Session}) {
    const pathname=usePathname()
  return (
    <header className="my-10 flex justify-between gap-5">
        <Link href='/'>
            <IoBookOutline className="text-white text-5xl"/>
            
        </Link> 
        <ul className="flex flex-row items-center gap-8">
            <li>
                <Link href='/library' className={cn("text-base cursor-pointer capitalize",
                    pathname==='/library'?'text-blue-300':'text-primary'
                )} >
                Library
                </Link>
            </li>
            <li>
                <Link href='/myprofile'>
                    <Avatar>
                        
                        <AvatarFallback className="bg-light-200">{getInitials(session?.user?.name||"N")}</AvatarFallback>
                    </Avatar>
                </Link>
            </li>
        </ul>      
    </header>
  )
}
