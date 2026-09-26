
import { redirect } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function Ministries(){
    const locale = useLocale();
    redirect({href: '/under_construction', locale: locale});
    return <></>
}