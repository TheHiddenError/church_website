type gridPartProp = {
    name: string, 
    information: string
}

function GridPart({name, information }: gridPartProp){
    return(
      <div className="py-10">
        <div className=" text-5xl font-bold mt-4">
          {name}
        </div>
        <div className="text-3xl mt-6">
          {information}
        </div>
      </div>
    );
}

export default function Footer(){
    return(
        <div className="mt-15 grid grid-cols-2 bg-blue-700 w-screen text-gray-200 text-center divide-x-2 divide-white divide-solid">
            <GridPart name = "Address" information = "3100 Billman Rd, Donna TX" />
            <GridPart name = "Contact Us" information="(956) 123-4567" />
        </div>
    )
}