"use client"
import { ModalInfo } from "../types/modal"
import { CardBaseProps } from "../types/cards"
import ModalOverlay from "./modal_overly"
import Card from "./cards"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomeCardSection(){
    const router = useRouter();
    const [componentClicked, setClicked] = useState(false);

    const aboutCard: CardBaseProps = {
        imageSrc:"/church_image.jpg",
        title:"About Our Church",
        description:`I'm a paragraph. Click here to add  your own text and edit me. 
                I'm a great place for you to tell a story and let your users know a little more about you.`, 
        button_name:"Learn More",
        button_action: ()=> router.push("/about_us")
    }

    const prayerModal: ModalInfo = {
        title: "Make a Prayer",
        description: "We would love to pray for you. Please put your petition before and we will pray for you. You can choose to make it anonymous if you like as well.",
        placeholder1: "Name (optional)",
        placeholder2: "Enter your petition here (required)",
        button_name: "Make Prayer",
        button_action: ()=>setClicked((element) => !element)
    }

    const prayerCard: CardBaseProps = {
        imageSrc: "/prayer_hands.jpg",
        title: "Prayer Request",
        description: `I'm a paragraph. Click here to add  your own text and edit me. 
                I'm a great place for you to tell a story and let your users know a little more about you.`,
        button_name:"Make a Prayer",
        button_action: ()=> setClicked((element) => !element)
    }


    return (
        <>
            <div className="mt-20 grid grid-cols-2">
                <Card card_info={aboutCard}
                />
                <Card card_info={prayerCard} />   
            </div>
            {componentClicked &&
                <ModalOverlay info = {prayerModal}/>
            } 
        </>
    )
}