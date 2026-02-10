'use client'

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';



export default function NavBar(){

    const t = useTranslations("Header");

    const links = [
        {name: t("home"), href : "/"},
        {name: t("about"), href: "/about_us"},
        {name: t("calendar"), href: "/calendar"},
        {name: t("donate"), href: "/donate"}
    ]

    const temp = usePathname();
    const temp2 = temp.match(/(?<=\w{2})(\/\w*)*/);
    let pathname: string = "/";
    if (temp2 && temp2[0] != "")
        pathname = temp2[0];
    

    return <div className={`grid grid-cols-5 relative mt-2 h-[20vh]`}>
        <div className="flex flex-col items-center text-center">
            <Image 
                src={"/white_dove.png"}
                width = {100}
                height = {100}
                alt="white dove"
            />
            <div className="font-bold text-xl ml-4 text-wrap w-3/5">Iglesia Nueva Esperanza</div>
        </div>
        <div className="col-span-4 grid grid-cols-4 items-end text-xl text-center">
            {links.map((link) => {
                return (
                <Link
                    key = {link.name}
                    href = {link.href}
                    className = {clsx({"text-blue-600 font-bold" : pathname  === link.href })}>
                    {link.name}
                </Link>
                )
            })}
        </div>
        <div className="flex absolute right-10 top-10 text-lg mt-2">
            <div className="w-5 h-5 bg-blue-500 rounded"/>
            <div className="pl-2">
                {t("translator")}  
            </div>
        </div>
    </div>
}