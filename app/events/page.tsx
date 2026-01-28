import Image from "next/image"
import bible_flyer from "../../public/flyers/bible_flyer.jpg"
import bible_other from "../../public/bible_open.jpg"
import center_bible from "../../public/flyers/center_bible.jpg"

export default function Event(){
    return(
        <div className="w-screen flex flex-col items-center">
            <div className="font-extrabold text-3xl mb-10">
                Event Flyer Page
            </div>
            <div className="h-[70vh] w-[70vw] mb-15 relative">
                <div className="h-full relative">
                    <Image className="object-cover object-bottom" src={center_bible} alt = "bible open" fill />
                </div>
                <div className="absolute bottom-0 right-0 rounded-full w-10 h-10 m-2 bg-green-300 z-10"></div>
                <div className="absolute bottom-0 right-15 rounded-full w-10 h-10 m-2 bg-red-600 z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gray-300/40 flex justify-center items-center">
                    <div className="">
                        <div className="text-4xl font-extrabold italic">
                            Bible Study
                        </div>
                        <div className="text-2xl font-bold">
                            7:00 PM
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}