import styles from "./calendar.module.css"

export default function ScriptureSec(){
    return (
        <div className={`${styles.calendarBG} mt-4 py-7 w-screen flex justify-center`}>
            <div className="w-9/10 text-center">
                <div className="font-extrabold text-3xl border-b-2 border-b-black pb-3">
                    Daily Bible Reading: 9/10 
                </div>
                <div className="font-bold text-2xl my-5">
                    Victory Through Obedience
                </div>
                <div className="text-lg">
                    <div>
                        22 Then the Philistines went up once again and deployed themselves in the Valley of Rephaim.  
                        23 Therefore David inquired of the Lord, and He said, “You shall not go up; circle around behind them, and come upon them in front of the mulberry trees.  
                        24 And it shall be, when you hear the sound of marching in the tops of the mulberry trees, then you shall advance quickly. For then the Lord will go out before you to strike the camp of the Philistines.”  
                        25 And David did so, as the Lord commanded him; and he drove back the Philistines from Geba[f] as far as Gezer.
                    </div> 
                    <div className="mt-3 font-semibold">
                        - 2 Samuel 5:22-25 (NKJV)
                    </div>
                </div>
            </div>
        </div>
    )
}