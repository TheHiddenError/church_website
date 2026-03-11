"use client"

import Image from "next/image"
import { useState } from "react"
import clsx from "clsx";
import { useTranslations } from "next-intl";
export default function Support(){
    const [clicked, setClicked] = useState(false);
    const [reason, setReason] = useState("issues");
    const [textBox, setTextBox] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState(0);

    async function submitForm(){
        setLoading(true)
        const response = await fetch("api/support",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({reason: reason, text: textBox}),
        }).then(res=> res.json())
        setStatusCode(response.status);
        setLoading(false);
    }
    const t = useTranslations("Support");
    return (
    <>
        <div className={clsx("fixed z-50 shadow-lg items-center", {"w-screen h-[60vh] md:w-[40vw] md:h-[40vh] lg:w-[25vw] lg:h-[60vh] motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md bottom-0 right-0" : clicked, "bottom-4 right-4": !clicked})}>
            {clicked ?
            <div className="w-full h-full">
                <div className="bg-blue-600 h-1/5 flex flex-grid w-full items-center">
                    <div className="ml-5 text-gray-100 text-xl font-semibold">   
                        {t("title")}
                    </div>
                    {loading == false && <svg onClick={()=>setClicked(false)} className="ml-auto mr-2 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="lightgray"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>}
                </div>
                <div className="bg-white h-4/5 border-1 border-gray-500 border-t-white">
                {loading == true ?
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="text-2xl font-bold">
                            {t("loading")}
                        </div>
                        <svg className="motion-rotate-loop-[1turn]/reset motion-ease-linear motion-duration-800" width="80" height="80" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="#e0e0e0"
                                strokeWidth="10"
                            />
                            <circle 
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="#3f6ef1"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray="78.5 314" 
            
                            />
                        </svg>
                    </div>
                    :
                    statusCode == 200 ?
                    <div className="w-full h-full flex flex-col justify-center items-center p-2">
                        <div className="font-bold text-lg text-center mb-5">
                            {t("success")}
                        </div>
                        <div className="w-1/4 h-1/4 relative">
                            <Image className="object-contain" src= "/checkmark.png" alt = "Checkmark" fill />
                        </div>
                    </div>
                    :
                    <form className=" ml-2 w-full h-9/20 p-2">
                        <label className="text-lg">{t("question")}</label>
                        <select onChange={(e)=> setReason(e.target.value)} className="border-black border-1 p-2 block">
                            <option value="issues">{t("option1")}</option>
                            <option value = "design">{t("option2")}</option>
                            <option value="suggestions">{t("option3")}</option>
                        </select>
                        <div className="text-gray-600 my-2">
                            <div className="text-lg font-bold">{reason != "suggestions" ? t("textResponse"): t("textResponse2")}.</div>
                            {reason != "suggestions" && 
                            <>
                                <div className="text-base my-1">{t("supportText")}</div>
                                <div className="text-sm">{t("ex")}: iPhone 17, HP Laptop</div>
                            </>
                            }
                        </div>
                        <div className="w-9/10 h-4/5 relative">
                            <textarea onChange={(e)=>setTextBox(e.target.value)} required className="text-black border-1 p-2 w-full h-full" placeholder= {t("textBox")}>
                            </textarea>
                            {textBox.trim().length != 0 && 
                                <div onClick={()=> submitForm()} className="absolute bottom-1 right-1">
                                <div className="w-5 h-5 relative">
                                    <Image src ="/message_arrow.png" alt = "Message arrow" fill />
                                </div>
                            </div>
                            }
                        </div>
                    </form>
                    
                }
                </div>
            </div>
            :
            <div className="flex cursor-pointer bg-blue-600 hover:bg-blue-500 py-1 pr-4 pl-2 rounded-lg" onClick={()=> setClicked(true)}>
                <div className="w-7 h-7 relative">
                    <Image src ="/wrench2.png" alt= "wrench" fill />
                </div>
                <div className="text-white font-semibold">
                    {t("overlay")}
                </div>
            </div>
            }
        </div>
        
    </>
    
    )
}

