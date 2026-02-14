import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eventsTable } from './db/schema';
import { dbDate } from './[locale]/helperFunctions/dates_functions';



export const db = drizzle(process.env.DATABASE_URL!);

async function main(){
    // console.log("RAN");
    // for (const event of eventList){
    //     const temp: typeof eventsTable.$inferInsert = {
    //         title: event.title,
    //         title_es: event.title_es,
    //         summary: event.summary,
    //         summary_es: event.summary_es,
    //         date:  dbDate(event.date, event.time),
    //         type: event.type,
    //         for: event.for,
    //     }
    //     if (event.location != undefined)
    //         temp.location = event.location;
    //     await db.insert(eventsTable).values(temp);
    // }
} 



