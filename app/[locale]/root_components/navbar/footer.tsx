import { useTranslations } from "next-intl";

type gridPartProp = {
    name: string, 
    information: string
}

function GridPart({name, information }: gridPartProp){
    return(
      <div className="py-5">
        <div className=" text-3xl font-bold mt-10">
          {name}
        </div>
        <div className="text-lg md:text-2xl mt-6">
          {information}
        </div>
      </div>
    );
}

export default function Footer(){

    const t = useTranslations("Footer");

    return(
        <div className="grid grid-cols-2 bg-blue-700 w-screen text-gray-200 text-center divide-x-2 divide-white divide-solid h-[30vh] md:h-[20vh] lg:h-[27vh]">
            <GridPart name = {t("address")} information = "3100 Billman Rd, Donna TX" />
            <GridPart name = {t("phone")} information="(956) 123-4567" />
        </div>
    )
}