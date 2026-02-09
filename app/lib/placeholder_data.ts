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
    {title: "Men's Fellowship", date: "02-05-26", time: "7:00 PM", summary: "Fellowship for Men", type: "Fellowship", for: "Men"},
    {title: "Children's Church", date: "02-13-26", time: "7:00 PM", summary: "Activity for children", type: "Children", for: "Children"},
    {title: "CHADIC Conference", date: "02-14-26", time: "9:00 AM", summary: "Conference", type: "Conference", for: "Other"},
    {title: "Church Fundraiser", time: "9:00 AM", date: "02-21-26", summary: "Chicken Plate fundraiser to help grow funds for church", type: "Fundraiser", for: "Church"},
    {title: "FDS Church Anniversary", date: "02-21-26", summary: "Anniversary for Templo Fe De Salvacion", type: "Anniversary", for: "Other", location: "FDS"},
    {title: "Church Fellowship", date: "03-01-26", time: "12:00 PM", summary: "Church fellowship", type: "Fellowship", for: "Church"},
    {title: "Men's Fellowship", date: "03-05-26", time: "7:00 PM", summary: "Fellowship for Men", type: "Fellowship", for: "Men"},
    {title: "Community Outreach", date: "03-07-26", time: "9:30 AM", summary: "Visit to Nursing Home", type: "Other", for: "Church", location: "Weslaco Nursing and Rehabilitation Center"},
    {title: "Leader's Meeting", date: "03-09-26", time: "7:00 PM", summary: "Meeting for Planning", type: "Conference", for: "Other"},
    {title: "Youth Event", date: "03-13-26", time: "7:00 PM", summary: "Youth Event", type: "Fellowship", for: "Youth"},
    {title: "Father & Daugther Event", date: "03-21-26", time: "7:00 PM", summary: "Event for Daughter and Father", type: "Children", for: "Church"},
    {title: "Palm Sunday", date: "03-29-26", time: "10:30 AM", summary: "Special Sunday Event", type: "Fellowship", for: "Church"},
    {title: "Good Friday (Baptisms)", date: "04-03-26", time: "5:00 PM", summary: "Baptisms", type: "Fellowship", for: "Church"},
    {title: "Resurrection Day (Easter)", date: "04-05-26", time: "10:30 AM", summary: "Special Sunday Service", type: "Fellowship", for: "Church"},
    {title: "Taco & Coffee Day", date: "04-12-26", time: "9:30 AM", summary: "TACOS for the stomach", type: "Fellowship", for: "Church"}

]

export default eventList;
