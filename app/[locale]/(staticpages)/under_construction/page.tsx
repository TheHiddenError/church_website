import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const mont = Montserrat({subsets:["latin"]});


export default function UnderConstructionPage() {
  const t = useTranslations("UnderConstruction");

  return (
    <div className="flex h-screen relative items-center">
      <div className="absolute top-0 left-0 z-2 w-screen h-screen bg-linear-to-b from-cyan-600 to-blue-600 opacity-25"></div>
      <Image className="object-cover" src="/sky_back.jpg" alt ="Sky background" fill />
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-400/70"/>
      <div className="z-10 w-screen">
        <div className={`text-white w-full flex flex-col items-center text-center mt-10 ${mont.className}`}>
          <div className="text-4xl md:text-6xl lg:text-8xl md:w-3/4 lg:w-7/10 font-light px-2">
            {t("title")}
          </div>
          <div className="my-5 w-1/10 bg-white h-1"/>
          <div className="text-xl md:text-2xl lg:text-3xl md:w-3/4 lg:w-1/2 mb-5 p-1">{t("info")}</div>
          <Link href={"/"}>
            <div className=" rounded-lg shadow-lg bg-blue-600/70 hover:bg-blue-500/70 cursor-pointer text-2xl md:text-3xl lg:text-4xl p-4 ">
              {t("button")}
            </div>
          </Link>
          <div className="my-5 w-9/10 bg-white h-1"/>
          <div className="font-semibold text-xl md:text-2xl lg:text-3xl flex items-center">
            <div className="w-20 h-20 relative">
              <Image className="object-cover" src ="/white_dove.png" alt ="White dove" fill />
            </div>
            <div className="ml-2 font-bold">Iglesia Nueva Esperanza</div>
          </div>
        </div>
      </div>
    </div>
  );
}
