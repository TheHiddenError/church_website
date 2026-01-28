function GridPart({title, info}: {title:string, info: string }) {
    return (
        <div className="flex justify-center w-full">
            <div className="text-center w-3/4">
                <div className="text-4xl font-bold mb-3">
                    {title}
                </div> 
                <div className="flex flex-col items-center">
                    <div className="mb-3 w-1/4 h-1 bg-gray-600/80"/>
                    <div className="text-lg w-3/4">
                        {info}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default function GridSection(){
    return(
        <div className="grid grid-cols-2 my-10">
            <GridPart title = "Our Mission" info = {`I'm a paragraph. Click here to add  your own text and edit me. 
            I'm a great place for you to tell a story and let your users know a little more about you.`}/>
            <GridPart title="What We Do" info = {`I'm a paragraph. Click here to add  your own text and edit me. 
            I'm a great place for you to tell a story and let your users know a little more about you.`} />
        </div>
    )
}