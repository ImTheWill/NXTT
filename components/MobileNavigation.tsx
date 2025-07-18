"use client"

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({ownerId,accountId,fullName, email, avatar}:{ownerId:string, accountId:string, fullName:string, email:string, avatar:string}) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return ( 
        <header className="mobile-header">
            <Image src ="/assets/icons/logo-full-brand.svg" alt = "logo" width = {120} height = {52} className = "h-auto"/>
            <Sheet open = {open} onOpenChange={setOpen}>
            <SheetTrigger><Image src = "/assets/icons/menu.svg" alt = "search" width={30} height={30}/></SheetTrigger>
            <SheetContent className="shad-sheet h-screen px-3">
                <SheetTitle>
                    <div className="header-user">
                        <Image src = {avatar} alt = "avatar" width={44} height={44} className="header-user-avatar"/>
                        <div className="sm:hidden lg:block">
                            <p className="subtitle-2 capitalize">{fullName} </p>
                            <p className="subtitle-2 capitalize">{email} </p>
                        </div>
                    </div>
                    <Separator className="mb-4 bg-light-200/20"/>
                </SheetTitle>
                <SheetDescription>
                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            {navItems.map(({name, url, icon})=>(
                                <Link key = {name} href={url}>
                                    <li className={cn("mobile-nav-item", (pathname===url &&"shad-active"))}>
                                        <Image src = {icon} alt = {name} width={24} height={24} className={cn('nav-icon', pathname===url && "nav-icon-active")}/>
                                        <p >{name}</p>
                                    </li>
                                </Link>)
                            )}
                        </ul>
                    </nav>
                    <Separator className="my-5 bg-light-200/20"/>
                    <div className="flex flex-col justify-between gap-5">
                        <FileUploader ownerId={ownerId} accountId={accountId}/>
                        <Button type = "submit" className="mobile-sign-out-button" onClick={async ()=> await signOutUser()}>
                            <Image src = "/assets/icons/logout.svg" alt = "logo" width={24} height={24}  />
                            <p>Logout</p>
                        </Button>
                    </div>
                </SheetDescription>
            </SheetContent>
            </Sheet>
        </header>
    );
}
 
export default MobileNavigation;