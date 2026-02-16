import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CardProps = {
    image: string,
    title: string,
    info: string [],
    reverse?: boolean
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


const lines1 = dummyText.split(/\n/);
const lines2 = dummyText2.split(/\n/);


function Cards({image, title, info, reverse = false}: CardProps){
    return(
        <div className= "lg:grid lg:grid-cols-3 lg:grid-cols-3 mt-20 items-center"> 
            <div className={clsx("h-75 md:h-100 lg:h-full bg-gray-200 rounded-lg lg:w-3/4 relative", reverse ? "lg:order-2": "lg:order-1 lg:place-self-end")}>
                {image != "" && <Image className="object-cover" src={image} alt ="cross image" fill />}
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


export default function CardSection(){
    const t = useTranslations("AboutPage")
    return(
        <div id = "churchInfo">
            <Cards image="" title={t("leader_heading")} info={lines2} />
            <Cards image="/cross_image.jpg" title={t("beliefs_heading")} info={lines1} reverse = {true} />
        </div>

    )
}