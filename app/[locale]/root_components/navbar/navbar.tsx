'use client'

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import clsx from 'clsx';



export default function NavBar(){
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        if (newLocale !== locale) {
        router.replace(pathname, { locale: newLocale });
        router.refresh();
        }
    };

    const t = useTranslations("Header");

    const links = [
        {name: t("home"), href : "/"},
        {name: t("about"), href: "/about_us"},
        {name: t("calendar"), href: "/calendar"},
        {name: t("donate"), href: "/donate"}
    ]

    return <div className={`grid lg:grid-cols-5 relative mt-2 h-[25vh] lg:h-[30vh] gap-2`}>
        <div className="flex flex-col w-full lg:items-center justify-center text-center place-self-center">
            <Image 
                src={"/white_dove.png"}
                width = {100}
                height = {100}
                alt="white dove"
            />
            <div className="font-bold text-sm lg:text-2xl lg:ml-4 text-wrap w-1/5 lg:w-3/5">Iglesia Nueva Esperanza</div>
        </div>
        <div className="lg:col-span-4 grid grid-cols-4 items-end text-base md:text-xl lg:text-2xl text-center">
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
        <div onClick={()=> switchLocale(locale == "en" ? "es": "en")} className="flex absolute top-5 right-5 lg:right-10 items-center lg:top-10 text-sm lg:text-md mt-2 bg-blue-600 p-1 rounded-lg cursor-pointer hover:bg-blue-400">
            <div className="relative w-5 h-5 lg:w-7 lg:h-7">
                <Image className="object-cover"
                    src="/white_arrows_circle.png"
                    alt = "double arrow circle"
                    fill
                />
            </div>
            <div className="px-2 text-white text-xs md:text-lg font-bold p-3">
                {t("translator")}  
            </div>
        </div>
    </div>
}