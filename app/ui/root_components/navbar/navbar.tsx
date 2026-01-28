'use client'

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    {name: "Home", href : "/"},
    {name: "About Us", href: "/about_us"},
    {name: "Calendar", href: "/calendar"},
    {name: "Events", href: "/events"},
    {name: "Donate", href: "/donate"}
]



export default function NavBar(){
    const pathname = usePathname();

    return <div className="grid grid-cols-6 relative mt-2 h-[20vh]">
        <div className="flex flex-col items-center text-center">
            <Image 
                src={"/white_dove.png"}
                width = {100}
                height = {100}
                alt="white dove"
            />
            <div className="font-bold text-xl ml-4 text-wrap w-4/5">Iglesia Nueva Esperanza</div>
        </div>
        <div className="col-span-5 grid grid-cols-5 items-end text-lg text-center">
            {links.map((link) => {
                return (
                <Link
                    key = {link.name}
                    href = {link.href}
                    className = {clsx({"text-blue-600 font-bold" : pathname === link.href})}>
                    {link.name}
                </Link>
                )
            })}
        </div>
        <div className="flex absolute right-10 top-10 text-lg mt-2">
            <div className="w-5 h-5 bg-blue-500 rounded"/>
            <div className="pl-2">
                Habla Espanol?  
            </div>
        </div>
    </div>
}