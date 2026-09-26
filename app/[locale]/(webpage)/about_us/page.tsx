import Image from "next/image";
import GridSection from "./ui/gridSection";
import CardSection from "./ui/cardSection";
import { redirect } from "@/i18n/navigation";
import { useLocale } from "next-intl";



export default function About(){
    const locale = useLocale()
    // redirect({href: '/under_construction', locale: locale});
    return (
    <div className="">
        <div className="w-screen h-[50vh] relative">
            <Image className="object-cover object-center lg:object-[0%_60%]" src={"/church_background_ig.jpg"} alt="congregation background" fill />   
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gray-800/60"/>         
        </div>
        <GridSection />
        <CardSection/>
    </div>
    )

}