export type EventDef = {
    title: string,
    date: string,
    time?: string,
    summary: string, 
    type: string,
    for: string,
    location?: string
}


const eventList: EventDef [] =
[
    {title: "Men's Fellowship", date: "02-05-26", time: "", summary: "Fellowship for Men", type: "Fellowship", for: "Men"},
    {title: "Children's Church", date: "02-13-26", time: "7:00 PM", summary: "Activity for children", type: "Children", for: "Children"},
    {title: "CHADIC Conference", date: "02-13-26", time: "9:00 AM", summary: "Conference", type: "Conference", for: "Open"},
    {title: "Church Fundraiser", time: "9:00 AM", date: "02-21-26", summary: "Chicken Plate fundraiser to help grow funds for church", type: "Fundraiser", for: "Church"},
    {title: "FDS Church Anniversary", date: "02-21-26", summary: "Anniversary for Templo Fe De Salvacion", type: "Anniversary", for: "Open", location: "FDS"},
    {title: "Church Fellowship", date: "02-22-26", time: "12:00 PM", summary: "Church fellowship", type: "Fellowship", for: "Church"}
]

export default eventList;
