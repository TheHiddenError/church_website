type UpcomingSecProps = {
    title?: string, 
    date: string,
    description?: string
    time?: string
}   


export default function UpcomingSec({title, date, description, time}: UpcomingSecProps){
    const dateArray = date.split(/-/);
    const formattedDate = `${dateArray[1]}/${dateArray[2]}`;


    return (
        <div className="flex flex-col items-center px-10">
          <div className="text-5xl font-bold">
            {formattedDate}
          </div>
          <div className="w-4/5 text-center mt-3">
            <div className="text-xl font-semibold">
                <div>
                    {title}
                </div>
                <div>
                    {time}
                </div>
            </div>
            <div className="text-md">
                {description}
            </div>
          </div>  
        </div>
    )
}