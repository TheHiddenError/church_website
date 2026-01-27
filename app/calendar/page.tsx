import ScriptureSec from "./ui/scriptureSection"
import clsx from "clsx";

const placeHolder: number [] = Array.from({length: 7}, () => 0);
const placeHolder2: number [] = Array.from({length: 5}, () => 0);
const chosenDAte: number = 19

export default function Calendar(){
    return (
        <>
            <ScriptureSec />
            <div className="w-screen flex justify-center mt-5">
                <div className="grid grid-rows w-4/5">
                    {placeHolder2.map((some, upperIndex) => {
                        return (
                        <div className=" grid grid-cols-7">
                            {placeHolder.map((something, index)=> {
                            return <div>
                                <div key={index + (7 * upperIndex)} className={clsx("border-l-2 border-b-2 border-black p-15 text relative",
                                 {"border-t-2": upperIndex === 0, 
                                   "border-r-2": index === 6,
                                   "bg-blue-300": (index + 1 + (7 * upperIndex)) === chosenDAte,
                                 })}>
                                    <div className= {clsx("w-1 h-35 absolute bg-red-300 top-0 left-20 inset-0 -rotate-45", {"hidden": (index + 1 + (7 * upperIndex)) >= chosenDAte})}>
                                    </div> 
                                    <div className="absolute top-0 left-0 ml-2 mt-2"> {index + 1 + (7 * upperIndex)}</div>
                                </div>
                            </div>
                            })}
                        </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}