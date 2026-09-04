import { CardBaseProps } from "../types/cards";
import Image from "next/image";
import clsx from "clsx";

type CardObj = {
  card_info: CardBaseProps
}

export default function Card({card_info}: CardObj){
    return (
      <>
        <div className = "w-full lg:w-3/4 h-full lg:h-4/5 flex flex-col lg:flex-row  place-items-center">
          <div className = {clsx("flex flex-col w-4/5 h-1/2  items-center lg:justify-self-end ", {"lg:order-last": card_info.reverse == true, "order-last lg:order-first": card_info.reverse === false} )}>
            <div className="h-full flex flex-col justify-center items-center lg:items-start gap-3">
              <div className="flex w-full items-center">
                <div className="h-1 bg-sky-600 w-1/10"/>
                <div className="text-gray-400 ml-2 italic">
                  Subtitle
                </div>
              </div>
              <div className="text-3xl font-extrabold">
                {card_info.title}
              </div>
              <div className="text-lg/8 text-gray-600">
                {card_info.description}
              </div>
              <div className="cursor-pointer bg-sky-600/80 text-white w-2/5 text-center text-base p-3 font-semibold mt-3">
                {card_info.button_name}
              </div>
            </div>
          </div>
          <div className={clsx("w-4/5 h-2/5 lg:w-full lg:h-full relative mt-5", {"order-first": card_info.reverse == true} )}>
              {card_info.imageSrc != "" && <Image className="object-cover" src={card_info.imageSrc} alt="card photo" fill /> }
            
          </div>
        </div>
        {/* <div className="w-full flex flex-col items-center mb-10 lg:mb-0">
          <div className="w-4/5 bg-gray-200/80 pb-5 rounded-lg h-full">
            <div className="h-75 relative">
              {card_info.imageSrc != "" && <Image className="object-cover" src={card_info.imageSrc} alt="card photo" fill />}
            </div>
            <div className="p-3 text-center mt-4 h-1/2">
              <div className="w-full flex justify-center h-1/3">
                <div className="text-3xl font-bold border-b-2 border-b-black my-5 pb-5 w-3/4">
                  {card_info.title}             
                </div>
              </div>
              <div className="text-xl px-4 h-2/5 flex items-center">
                  {card_info.description}
              </div>
              <div onClick={card_info.button_action} className="flex justify-center w-full mt-6">
                <div className="cursor-pointer bg-blue-600/80 rounded-xl text-white w-1/2 text-xl p-3 font-semibold">
                  {card_info.button_name}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
}

/*


        <div className="h-full w-full flex">
          <div className="h-2/5 w-full bg-yellow-400 order-last">
          Test 1
          </div>
          <div className="h-3/5 w-full bg-green-300 order-first">
          Test 3
          </div>
        </div>
*/