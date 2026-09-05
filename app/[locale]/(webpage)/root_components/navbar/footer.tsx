import { useTranslations } from "next-intl";
import Image from "next/image";
import {Tangerine} from "next/font/google"

const tang = Tangerine({weight:"700"});

type gridPartProp = {
    name: string, 
    information: string
}

function GridPart({name, information }: gridPartProp){
    return(
      <div className="p-5">
        <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-10">
          {name}
        </div>
        <div className="text-md md:text-2xl lg:text-3xl xl:text-3xl mt-6">
          {information}
        </div>
      </div>
    );
}

export default function Footer(){

    const t = useTranslations("Footer");

    return(
      <div className="h-[120vh] xs:h-[100vh] lg:h-[60vh] bg-blue-950 relative">
        <div className="absolute top-1/15 left-1/10 lg:top-1/7 lg:left-1/10 text-white w-4/5 grid grid-cols-1 lg:grid-cols-3 flex place-items-center items-start py-2 gap-10">
            <div className="">
              <div className="w-full grid grid-cols-3 mb-2">
                <div className="w-12 h-12 relative justify-self-end">
                  <Image className="object-cover"
                  src = "/white_dove.png"
                  alt = "white dove logo"
                  fill
                  />
                </div>
                <div className="self-center col-span-2 ml-2">
                  <div className="text-2xl lg:text-xl font-bold italic">
                    Iglesia Nueva 
                  </div>
                  <div className={`${tang.className} text-3xl/8 lg:text-3xl/6`}>
                    Esperanza
                  </div>
                </div>
              </div>
              <div className="px-10">
                <div className="italic text-lg/7 lg:text-base/7 mb-2">
                  Una iglesia donde se hacen discipulos y se imparte el amor de Cristo a cada persona y familia. 
                </div>
                <div className="w-10 h-10">
                    <a href = "https://www.facebook.com/profile.php?id=100066869824033"  target="_blank" rel="noopener noreferrer">   
                      <div className="w-10 h-10 bg-blue-500 rounded flex justify-center items-center hover:bg-blue-700 cursor-pointer">
                      <div className = "w-6 h-6 relative">
                        <Image
                        className="object-cover p-1"
                        src = "/facebook.png"
                        alt = "Facebook"
                        fill
                        />
                      </div>
                      </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full items-center w-1/3  text-base">
              <div className="text-2xl lg:text-xl font-bold mb-5">
                {t("services_title")}
              </div>
              <div className="">
                <b>{t("sunday").split("-")[0]} - </b>
                <span className="text-gray-300">
                  {t("sunday").split("-")[1]}
                </span> 
              </div>
              <div className="">
                <b>{t("monday").split("-")[0]}- </b> 
                <span className="text-gray-300">
                  {t("monday").split("-")[1]}
                </span>
              </div>
              <div className="">
                <b>{t("wednesday").split("-")[0]} - </b>
                <span className="text-gray-300">
                  {t("wednesday").split("-")[1]}
                </span>
              </div>
              <div className="">
                <b>{t("prayer").split("-")[0]} - </b>
                <span className="text-gray-300">
                  {t("prayer").split("-")[1]}
                </span>
              </div>
              <div className="h-1 bg-blue-400 w-1/10"/>
              <div className="">
                3100 Billman Rd, Donna TX 78537
              </div>
            </div>
            <div className="grid grid-cols-1 w-full lg:w-4/5 lg:items-center">
              <div className="text-2xl lg:text-xl font-bold mb-5">
                {t("contact")}
              </div>
              <div className="text-base">
                <b>{t("phone")} </b>
                <span className="text-gray-300">
                  956-460-3600
                </span>
              </div>
              <div className="text-base">
                <b>{t("email")}: </b>
                <span className="text-gray-300">
                  Unavaliable
                </span>
              </div>
            </div>
        </div>
      </div>
        // <div className="grid grid-cols-2 bg-blue-700 w-screen text-gray-200 text-center divide-x-2 divide-white divide-solid h-[30vh] md:h-[20vh] lg:h-[25vh] xl:h-[35vh]">

        //     <GridPart name = {t("address")} information = "3100 Billman Rd, Donna TX" />
        //     <GridPart name = {t("phone")} information="(956) 460-3600" />
        // </div>
    )
}