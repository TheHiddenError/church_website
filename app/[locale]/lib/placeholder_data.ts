import { milisecondsConvert } from "@/app/helperFunctions/dates_functions";


export type ConstantEventType = {
    title: string,
    title_es: string, 
    date_index: number,
    miliseconds: number,
    for?: string,
    type?: string,
    time: string,
    summary: string,
    summary_es: string
}


const constantEvents: ConstantEventType [] = 
[
    {title: "Sunday Service", title_es: "Servicio Dominical", date_index: 0, miliseconds: milisecondsConvert(10, 30), time: "10:30 AM",  summary: "Morning Service to Learn", summary_es: "Servicio matutino para aprender"},
    {title: "Prayer Night", title_es: "Noche de Oración", date_index: 1, miliseconds: milisecondsConvert(19,0), time: "7:00 PM", summary: "A service of prayer and petitions", summary_es: "Un servicio de oración y peticiones"},
    {title: "Disciple Service", title_es: "Servicio de Discípulos", date_index: 3, miliseconds: milisecondsConvert(19,0), time: "7:00 PM", summary: "Bible Study to Grow in the Word", summary_es: "Estudio bíblico para crecer en la Palabra"}
]



export { constantEvents};
