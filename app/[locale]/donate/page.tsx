import Image from "next/image"
import { useTranslations } from "next-intl"

const donation_values: number [] = [5,10,25,50,100, 0]

export default function Donate(){

    const t = useTranslations("Donate");

    return(
        <div className="mb-15">
            <div className="w-screen h-75 relative">
                <Image className="object-cover" src={"/donation.png"} alt="donation image" fill />
                <div className="absolute top-0 left-0 bg-gray-200/60 w-full h-75"/>
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-75 text-center text-2xl lg:text-3xl/12 italic">
                    <div className="w-3/4">
                        <div className="mb-3">
                            {t("bible_text")}
                        </div>
                        <div className="font-bold">
                            -{t("bible_verse")}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <div className="text-md w-3/5 text-center">
                    {t("note")}
                </div>
            </div>
            <div className="mt-10 flex flex-col items-center">
                <div className="text-3xl font-bold">
                    {t("heading")}
                </div>
                <div className="my-3 text-lg">
                    {t("subheading")}
                </div>
                <div className="w-9/10 lg:w-3/4">
                    <div className="grid grid-cols-2 text-center text-2xl gap-2">
                        <div className="p-4 border-2 border-gray-700">
                            {t("one_time")}
                        </div>
                        <div className="p-4 border-2 border-gray-700 flex items-center justify-center h-full">
                            {t("monthly")}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 place-items-center h-10 my-5">
                        {donation_values.map((value) => {
                            return(
                                <div key={value} className="text-md lg:text-lg border-2 border-gray-500 w-full py-3 text-center">{value == 0 ? "Other" : "$" + value.toString()}</div>
                            )
                        })}
                    </div>
                    <div className="w-full mt-7 flex justify-center bg-gray-600 rounded-xl mx py-7 text-2xl text-white">
                        {t("repair")}
                    </div>
                </div>
            </div>
        </div>
    )
}