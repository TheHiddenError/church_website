'use client'

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import clsx from 'clsx';
import { useState } from "react";



export default function NavBar(){
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [showLocale, pressLocale] = useState(false);
    const [phoneLinks, showLink] = useState(false);
    

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
        {name: t("ministry"), href: "/ministries"},
        {name: t("calendar"), href: "/calendar"},
        {name: t("events"), href: "/events"},
        {name: t("donate"), href: "/donate"}
    ]

    return <div className="fixed w-full z-20">
    <div className={`grid grid-cols-2 lg:grid-cols-10 w-full gap-2 bg-white border-b-1 border-gray-300`}>
        <div className="lg:col-span-5 flex flex-col w-full justify-center ml-5 mt-1 py-1">
            <Image 
                src={"/church_logo.jpg"}
                width = {100}
                height = {100}
                alt="church logo"
            />
            
        </div>
        <div className="justify-self-end flex items-center mr-5 h-full relative lg:hidden">
            <svg onClick={()=> {
                showLink(x => !x);
                pressLocale(false);
            } } className={clsx({"text-blue-600": phoneLinks == true, "text-gray-500": phoneLinks === false})}
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
            </svg>
        </div>
        <div className="hidden col-span-5 lg:grid grid-cols-7 divide-x divide-gray-300 relative">
            {links.map((link) => {
                return (
                    <div key = {link.name} className="text-base md:text-lg lg:text-sm w-full h-full flex justify-center items-center text-gray-400 hover:text-gray-700 hover:font-bold cursor-pointer">
                        <Link
                            href = {link.href}
                            className = {clsx({"text-blue-600 font-bold" : pathname  === link.href })}>
                            {link.name}
                        </Link>
                    </div>
                )
            })}
            <div onClick={()=> pressLocale(x=> !x)} className={clsx("flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-700 hover:font-bold", {"text-gray-700 font-bold": showLocale === true})}>
                <div className = "w-5 h-5 relative">
                    <Image
                    className="object-cover"
                    src = {clsx({"/america.png": locale == "en", "/mexico.png": locale == "es"})}
                    alt = "National flag"
                    fill
                    />
                </div>
                <div className="mx-1">
                    {locale.toUpperCase()}
                </div>
                <svg className="absolute end-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={clsx({"M4 10L8 6L12 10": showLocale, "M4 6L8 10L12 6": !showLocale})}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            
        </div>
    </div>
    <div className={clsx("flex p-4 flex-col gap-2 bg-white h-[75vh] lg:hidden", {"block": phoneLinks === true, "hidden": phoneLinks === false})}>
        {links.map((link) => {
            return (
                <div key = {link.name + '1000'} className="text-xl w-full h-full flex justify-center items-center text-gray-500 ">
                    <Link
                        href = {link.href}
                        className = {clsx({"text-blue-600 font-bold" : pathname  === link.href })}>
                        {link.name}
                    </Link>
                </div>
            )
        })}
        <div onClick={()=> pressLocale(x=> !x)} className={clsx("flex items-center justify-center text-gray-500", {"text-gray-700 font-bold": showLocale === true})}>
            <div className = "w-5 h-5 relative">
                <Image
                className="object-cover"
                src = {clsx({"/america.png": locale == "en", "/mexico.png": locale == "es"})}
                alt = "National flag"
                fill
                />
            </div>
            <div className="mx-1 text-xl">
                {locale.toUpperCase()}
            </div>
            <svg className="absolute end-3"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={clsx({"M4 10L8 6L12 10": showLocale, "M4 6L8 10L12 6": !showLocale})}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>

    </div>
    <div className="w-full lg:grid lg:grid-cols-10 lg:gap-2">
        <div className="hidden lg:block col-span-5 h-1 ml-5 w-full py-1 mt-1 bg-white/0">
            
        </div>
        <div className="lg:col-span-5 lg:grid lg:grid-cols-7 w-full">
            <div className="w-full col-end-5 col-span-2 bg-white flex flex-col border-gray-300 text-center hidden">
                <div className="border-b-1 border-gray-300 py-2">
                    Men's Ministry
                </div>
                <div className="border-b-1 border-gray-300 py-2">
                    Women's Ministry
                </div>
                <div className="py-2">
                    Children's Ministry
                </div>
            </div>
            <div onClick={()=> switchLocale(locale == "en" ? "es": "en")} className={clsx("lg:col-end-8 bg-white flex justify-center py-5 items-center block lg:cursor-pointer border-gray-300 border-x-1 border-b-1 w-full", {"hidden": showLocale === false})}>
                <div className = "w-5 h-5 relative">
                    <Image
                    className="object-cover"
                    src = {clsx({"/america.png": locale == "es", "/mexico.png": locale == "en"})}
                    alt = "National flag"
                    fill
                    />
                </div>
                <div className="mx-1 text-xl lg:text-base">
                    {locale == "en" ? "ES": "EN"}
                </div>
            </div>
        </div>
    </div>
    </div>
}