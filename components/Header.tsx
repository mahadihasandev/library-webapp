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
    <header className="sticky top-4 z-30 my-6 rounded-2xl border border-white/10 bg-dark-100/80 p-3 backdrop-blur sm:my-8 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <Link href='/' className="flex items-center gap-2">
            <IoBookOutline className="text-white text-4xl sm:text-5xl"/>
            <span className="font-semibold text-light-100 max-sm:hidden">BookWorm</span>
            
        </Link> 
        <ul className="flex flex-row items-center gap-3 sm:gap-6">
            <li>
                <Link href='/library' className={cn("rounded-md px-2 py-1 text-sm capitalize transition-colors sm:text-base",
                    pathname==='/library'?'bg-blue-500/20 text-blue-200':'text-primary hover:text-blue-200'
                )} >
                Library
                </Link>
            </li>
            <li>
                <Link href='/myprofile' className={cn("rounded-md px-2 py-1 text-sm capitalize transition-colors sm:text-base",
                    pathname==='/myprofile'?'bg-blue-500/20 text-blue-200':'text-primary hover:text-blue-200'
                )}>
                  Profile
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
            </div>
    </header>
  )
}
