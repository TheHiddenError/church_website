
export type ConstantEventType = {
    title: string,
    title_es: string, 
    date_index: number,
    time: string,
    summary: string,
    summary_es: string
}


const constantEvents: ConstantEventType [] = 
[
    {title: "Sunday Service", title_es: "Servicio Dominical", date_index: 0, time: "10:30 AM",  summary: "Morning Service to Learn", summary_es: "Servicio matutino para aprender"},
    {title: "Prayer Night", title_es: "Noche de Oración", date_index: 1,  time: "7:00 PM", summary: "A service of prayer and petitions", summary_es: "Un servicio de oración y peticiones"},
    {title: "Disciple Service", title_es: "Servicio de Discípulos", date_index: 3, time: "7:00 PM", summary: "Bible Study to Grow in the Word", summary_es: "Estudio bíblico para crecer en la Palabra"}
]

// const ImportantEvents: EventDef [] =
// [
//     {title: "Prayer and Worship Night", title_es: "Noche de Oración y Adoración" , date: "Every First Monday", for: "Church", type: "Fellowship", time: "7:00 PM", summary: "A service of prayer and petitions", summary_es: "Un servicio de oración y peticiones"},

// ]


// const eventList: EventDef [] =
// [
//     {title: "Men's Fellowship", title_es: "Confraternidad de Hombres", date: "02-05-26", time: "7:00 PM", summary: "Fellowship for Men", summary_es: "Confraternidad de Hombres", type: "Fellowship", for: "Men"},
//     {title: "Children's Church", title_es: "Iglesia de Niños", date: "02-13-26", time: "7:00 PM", summary: "Activity for children", summary_es: "Actividad para niños", type: "Children", for: "Children"},
//     {title: "CHADIC Conference", title_es: "Conferencia CHADIC", date: "02-14-26", time: "9:00 AM", summary: "Conference", summary_es: "Conferencia", type: "Conference", for: "Other"},
//     {title: "Church Fundraiser", title_es: "Recaudación de Fondos de la Iglesia", time: "9:00 AM", date: "02-21-26", summary: "Chicken Plate fundraiser to help grow funds for church", summary_es: "Recaudación de fondos con plato de pollo para ayudar a la iglesia", type: "Fundraiser", for: "Church"},
//     {title: "FDS Church Anniversary", title_es: "Aniversario de la Iglesia FDS", date: "02-21-26", summary: "Anniversary for Templo Fe De Salvacion", summary_es: "Aniversario del Templo Fe De Salvación", type: "Anniversary", for: "Other", location: "FDS"},
//     {title: "Church Fellowship", title_es: "Confraternidad de la Iglesia", date: "03-01-26", time: "12:00 PM", summary: "Church fellowship", summary_es: "Confraternidad de la iglesia", type: "Fellowship", for: "Church"},
//     {title: "Men's Fellowship", title_es: "Confraternidad de Hombres", date: "03-05-26", time: "7:00 PM", summary: "Fellowship for Men", summary_es: "Confraternidad para hombres", type: "Fellowship", for: "Men"},
//     {title: "Community Outreach", title_es: "Alcance Comunitario", date: "03-07-26", time: "9:30 AM", summary: "Visit to Nursing Home", summary_es: "Visita a la casa de reposo", type: "Other", for: "Church", location: "Weslaco Nursing and Rehabilitation Center"},
//     {title: "Leader's Meeting", title_es: "Reunión de Líderes", date: "03-09-26", time: "7:00 PM", summary: "Meeting for Planning", summary_es: "Reunión de planificación", type: "Conference", for: "Other"},
//     {title: "Youth Event", title_es: "Evento de Jóvenes", date: "03-13-26", time: "7:00 PM", summary: "Youth Event", summary_es: "Evento de jóvenes", type: "Fellowship", for: "Youth"},
//     {title: "Father & Daugther Event", title_es: "Evento de Padre e Hija", date: "03-21-26", time: "7:00 PM", summary: "Event for Daughter and Father", summary_es: "Evento para hija y padre", type: "Children", for: "Church"},
//     {title: "Palm Sunday", title_es: "Domingo de Ramos", date: "03-29-26", time: "10:30 AM", summary: "Special Sunday Event", summary_es: "Evento especial del domingo", type: "Fellowship", for: "Church"},
//     {title: "Good Friday (Baptisms)", title_es: "Viernes Santo (Bautismos)", date: "04-03-26", time: "5:00 PM", summary: "Baptisms", summary_es: "Bautismos", type: "Fellowship", for: "Church"},
//     {title: "Resurrection Day (Easter)", title_es: "Día de la Resurrección (Pascua)", date: "04-05-26", time: "10:30 AM", summary: "Special Sunday Service", summary_es: "Servicio especial del domingo", type: "Fellowship", for: "Church"},
//     {title: "Taco & Coffee Day", title_es: "Día de Tacos y Café", date: "04-12-26", time: "9:30 AM", summary: "Breakfast", summary_es: "Desayuno", type: "Fellowship", for: "Church"}

// ]

export { constantEvents};
