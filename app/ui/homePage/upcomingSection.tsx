type UpcomingSecProps = {
    title: string, 
    date: string,
    description: string
}   



export default function UpcomingSec({date, title, description}: UpcomingSecProps){
    return (
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold">
            {date}
          </div>
          <div className="w-3/5 text-center mt-3">
            <div className="text-xl font-semibold">
                {title}
            </div>
            <div className="text-md">
                {description}
            </div>
          </div>  
        </div>
    )
}