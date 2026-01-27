import Image from "next/image";

export default function NavBar(){
    return <div className="grid grid-cols-6 relative mt-2">
        <div className="flex flex-col items-center text-center">
            <Image 
                src={"/white_dove.png"}
                width = {100}
                height = {100}
                alt="white dove"
            />
            <div className="font-bold text-xl ml-4 text-wrap w-4/5">Iglesia Nueva Esperanza</div>
        </div>
        <div className="col-span-5 grid grid-cols-5 items-end text-lg text-center">
            <div>
                Home
            </div>
            <div >
                About Us
            </div>
            <div>
                Calendar
            </div>
            <div>
                Events
            </div>
            <div>
                Donate
            </div>
        </div>
        <div className="flex absolute right-10 top-10 text-lg mt-2">
            <div className="w-5 h-5 bg-blue-500 rounded"/>
            <div className="pl-2">
                Habla Espanol?  
            </div>
        </div>
    </div>
}