import { useTranslations } from "next-intl"

function GridPart({title, info}: {title:string, info: string }) {
    return (
            
        <div className=" w-full flex flex-col items-center text-center my-5 lg:my-0">
            <div className="w-3/4">
                <div className="text-4xl font-bold mb-3">
                    {title}
                </div> 
            </div>
            <div className="mb-3 w-1/4 h-1 bg-gray-600/80"/>
            <div className="text-lg w-3/4">
                {info}
            </div>
        </div> 
           
        
    )
}

export default function GridSection(){
    const t = useTranslations("AboutPage")

    return(
        <div className="grid lg:grid-cols-2 my-10">
            <GridPart title = {t("mission_heading")} info = {`I'm a paragraph. Click here to add  your own text and edit me. 
            I'm a great place for you to tell a story and let your users know a little more about you.`}/>
            <GridPart title={t("about_heading")} info = {`I'm a paragraph. Click here to add  your own text and edit me. 
            I'm a great place for you to tell a story and let your users know a little more about you.`} />
        </div>
    )
}