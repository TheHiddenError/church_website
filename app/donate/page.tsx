import Image from "next/image"
import donation_image from "../../public/donation.png"

const donation_values: number [] = [5,10,25,50,100, 0]

export default function Donate(){
    return(
        <div className="mb-15">
            <div className="w-screen h-75 relative">
                <Image className="object-cover" src={donation_image} alt="donation image" fill />
                <div className="absolute top-0 left-0 bg-gray-200/60 w-full h-75"/>
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-75 text-center text-3xl/12 italic">
                    <div className="w-3/4">
                        <div className="mb-3">
                            So let each one give as he purposes in his heart, not grudgingly or of necessity; for God loves a cheerful giver. 
                        </div>
                        <div className="font-bold">
                            -2 Corinthians 9:7 (NKJV)
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <div className="text-md w-3/5 text-center">
                    Note: We do not want to force anyone to make a donation. We do not do this for the money. 
                    Only for God's will. However, if you feel God put it in your heart to support our mission, you can donate below. Thank you.
                </div>
            </div>
            <div className="mt-10 flex flex-col items-center">
                <div className="text-3xl font-bold">
                    Make a Donation Below!
                </div>
                <div className="my-3 text-lg">
                    Thank you for your support! God Bless!
                </div>
                <div className="w-3/4">
                    <div className="grid grid-cols-2 text-center text-2xl gap-2">
                        <div className="p-4 border-2 border-gray-700">
                            One Time Payment
                        </div>
                        <div className="p-4 border-2 border-gray-700">
                            Monthly
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 place-items-center h-10 my-5">
                        {donation_values.map((value) => {
                            return(
                                <div key={value} className="text-lg border-2 border-gray-500 w-full py-3 text-center">{value == 0 ? "Other" : "$" + value.toString()}</div>
                            )
                        })}
                    </div>
                    <div className="w-full mt-7 flex justify-center bg-gray-600 rounded-xl mx py-7 text-2xl text-white">
                        Under Construction
                    </div>
                </div>
            </div>
        </div>
    )
}