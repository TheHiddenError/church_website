import Image from "next/image";

type CardProps = {
    imageSrc: string,
    title: string, 
    description: string,
    button_name: string,
    button_action: ()=> void
}

export default function Card({imageSrc, title, description, button_name, button_action}: CardProps){
    return (
    <div className="w-full flex flex-col items-center">
        <div className="w-4/5 bg-gray-200/80 pb-5">
          <div className="bg-gray-400 h-75 relative">
            {imageSrc != "" && <Image className="object-cover" src={imageSrc} alt="prayer photo" fill />}
          </div>
          <div className="p-3 text-center mt-4">
            <div className="w-full flex justify-center">
              <div className="text-3xl font-bold border-b-2 border-b-black my-5 pb-5 w-3/4">
                {title}             
              </div>
            </div>
            <div className="text-xl px-4">
                {description}
            </div>
            <div onClick={button_action} className="flex justify-center w-full mt-6">
              <div className="cursor-pointer bg-blue-600/80 rounded-xl text-white w-1/2 text-xl p-3 font-semibold">
                {button_name}
              </div>
            </div>
          </div>
        </div>
    </div>
    );
}