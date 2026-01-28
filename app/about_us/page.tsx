import Image from "next/image";
import GridSection from "./ui/gridSection";
import CardSection from "./ui/cardSection";


export default function About(){
    return (
    <div className=" mb-15">
        <div className="w-screen h-75 relative">
            <Image className="object-cover object-center" src={"/church_background.jpg"} alt="church background" fill />   
            <div className="absolute top-0 left-0 w-full h-75 bg-gray-200/20"/>         
        </div>
        <GridSection />
        <CardSection />
    </div>
    )

}