import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import "./globals.css"
import { Link } from "@/i18n/navigation";

export default function NotFound(){
    const t = useTranslations("NotFound");
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-4/5 h-1/4 lg:h-2/5 lg:w-3/5 relative">
                <Image className="object-contain" src ="/empty_tomb.png" alt ="empty tomb" fill/>
            </div>
            <div className="text-center">
                <div className="text-9xl lg:text-10xl font-bold text-blue-900">
                    404
                </div>
                <div className="text-4xl mb-4">
                    {t("text")}
                </div>
                <Link href = '/'>
                    <div className="bg-blue-600 hover:bg-blue-500 p-2 text-white text-2xl rounded-lg shadow-sm">
                        {t("button")}
                    </div>
                </Link>
            </div>
        </div>
    )
}