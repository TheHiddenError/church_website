import { CardBaseProps } from "../types/cards";
import Image from "next/image";

type CardObj = {
  card_info: CardBaseProps
}

export default function Card({card_info}: CardObj){
    return (
      <>
        <div className="w-full flex flex-col items-center mb-10 lg:mb-0">
          <div className="w-4/5 bg-gray-200/80 pb-5 rounded-lg">
            <div className="bg-gray-400 h-75 relative">
              {card_info.imageSrc != "" && <Image className="object-cover" src={card_info.imageSrc} alt="prayer photo" fill />}
            </div>
            <div className="p-3 text-center mt-4">
              <div className="w-full flex justify-center">
                <div className="text-3xl font-bold border-b-2 border-b-black my-5 pb-5 w-3/4">
                  {card_info.title}             
                </div>
              </div>
              <div className="text-xl px-4">
                  {card_info.description}
              </div>
              <div onClick={card_info.button_action} className="flex justify-center w-full mt-6">
                <div className="cursor-pointer bg-blue-600/80 rounded-xl text-white w-1/2 text-xl p-3 font-semibold">
                  {card_info.button_name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}