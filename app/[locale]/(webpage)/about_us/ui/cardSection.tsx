import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CardProps = {
    image: string,
    title: string,
    info: string [],
    reverse?: boolean
}

type BeliefProps = {
    title: string, 
    image: string, 
    info: string, 
    scriptures: string [], 
    key: string
}

const dummyText = 
`
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.

Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.

Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.

Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut
`


const dummyText2 = 
`
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
`

const beliefCardInfo: BeliefProps [] = [
    {title: "Scripture", image: "/icons/bible_icon.png", info: "We believe that the Bible is the Word of God, infalliable and hold that it is the final authority.", scriptures: ["2 Timothy 3:16-17", "Psalms 119:105"], key: "T013ndda"},
    {title: "The Church", image: "/icons/church_icon.png", info: "The church is more than just a building. We, as believers, make up the Church, and our goal is to share the gospel, make disciples, and sharing the love of God with everyone.", 
    scriptures: ["Romans 12:4-5", "Ephesians 2:19-22", "Matthew 28:19-20"], key: "T01n1as3" },
    {title: "Trinity", image: "/icons/bible_open_icon.png", info: "We believe that the One True God exists as one being, eternally existing in three distinct persons: The Father, The Son, and Holy Spirit. Each of them have the same attributes, nature, and are all the standard of perfection and goodness.", 
    scriptures: ["Matthew 28:19", "1 John 5:7", "Mark 12:29"], key: "T012naW18"},
    {title: "Salvation", image: "/icons/worship_icon.png", info: "We believe that Jesus is the only way to heaven and believe He made a way to inherit eternal life by His sacrifice on the cross. It is not about our works, but on His finished work that we are saved through faith, a free gift given by God.",
    scriptures: ["John 3:16-17", "Ephesians 2:8-9", "Romans 10:9-10"], key: "T01nan2n3"
    },
    {title: "Jesus Christ", image: "/icons/cross_icon.png", info: "We believe God came down into flesh as Jesus Christ and became the sinless Savior, giving up his life on the cross for the punishment of our sins, and rising from the dead on the third day. It is with this is how we obtain eternal life, trusting in His sacrifice to save us.",
    scriptures: ["1 Peter 2:24", "Romans 5:8-9", "Isaiah 53:5-6"], key: "T0amo233n"
    },
    {title: "Marriage", image: "/icons/holding_hands_icon.png", info: "We believe that there are only two genders God created: male and female and believe marriage is between one man and one woman.",
    scriptures: ["Genesis 1:27", "Matthew 19:4-6"], key: "T0n24nds6"
    }

]


const lines1 = dummyText.split(/\n/);
const lines2 = dummyText2.split(/\n/);


function Cards({image, title, info, reverse = false}: CardProps){
    return(
        <div className= "lg:grid lg:grid-cols-3 lg:grid-cols-3 mt-20 items-center"> 
            <div className={clsx("h-75 md:h-100 lg:h-full bg-gray-200 rounded-lg lg:w-3/4 relative", reverse ? "lg:order-2": "lg:order-1 lg:place-self-end")}>
                {image != "" && <Image className="object-cover rounded-lg" src={image} alt ="cross image" fill />}
            </div>    
            <div className={clsx("lg:col-span-2 lg:mx-5 flex justify-center", reverse ? "lg:order-1 lg:place-self-end": "lg:order-2")}>
                <div className={clsx("lg:mx-5 mt-3 w-17/20")}>
                    <div className="font-extrabold text-3xl p-2 text-center">
                        {title}
                    </div>
                    {info.map((line) => {
                        if (line != "")
                            return(
                            <div key = {line} className="text-lg p-2">
                                {line}
                            </div>
                            )
                    })}
                </div>
            </div>
        </div>
    )
}

function BeliefCards({title, image, info, scriptures}: BeliefProps){
    return (
        <div className="w-full bg-white border-1 border-gray-200 rounded-xl drop-shadow-xl px-10 py-5">
            <div className="h-1/5 flex items-center">
                <div className="h-md:w-12 h-md:h-12 w-18 h-18 relative rounded-full bg-blue-200/50">
                    <div className="h-md:w-7 h-md:h-7 w-11 h-11 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  relative">
                        <Image className="object-cover" src={image}
                        alt = "Bible icon"
                        fill
                        />
                    </div>
                </div>
            </div>
            <div className="h-1/5 w-full flex items-center text-2xl h-md:text-lg font-extrabold">
                {title}
            </div>
            <div className="h-3/5 text-sm h-md:text-[14px] text-gray-600">
                <div className="h-3/4">
                    {info}
                </div>
                <div className="h-1/4 flex flex-wrap w-full text-xs h-md:text-[10px] gap-2">
                    {scriptures.map((bible_text)=> {
                        return (
                        <div key = {(Math.floor(Math.random() * (43)) + 1) + 10000 * (bible_text.length+ (Math.floor(Math.random() * (100)) + 1)) } className="bg-blue-300/30 rounded-lg text-blue-800 justify-center h-md:w-2/5 w-7/20 h-1/2 flex items-center py-3">
                            {bible_text}
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default function CardSection(){
    const t = useTranslations("AboutPage")
    return(
        <>
        <div className=" py-10" id = "churchInfo">
            <Cards image="/pastor_photo.png" title={t("leader_heading")} info={lines2} />
            <Cards image = "/cross_image.jpg" title = {t("church_heading")} info = {lines1} reverse = {true} />
        </div>
        <div className="h-[125vh] h-md:h-[260vh] flex flex-col items-center bg-gray-200/30 lg:pb-10">
            <div className="font-extrabold text-4xl h-md:h-1/20 h-1/5 flex justify-center items-center">
                {t("beliefs_heading")}
            </div>
            <div className="w-full h-md:h-19/20 h-4/5 flex justify-center">
                <div className="w-4/5 h-full grid grid-cols-3 h-md:grid-cols-1 gap-y-5 gap-x-2">   
                    {beliefCardInfo.map((current_element)=> {
                        const {key, ...rest} = current_element
                        return <BeliefCards key = {key} {...rest} />
                    })
                    }
                    
                    <div></div>
                    <div></div>
                    {/* <BeliefCards /> */}
                </div>
            </div>
        </div>

        </>
    )
}