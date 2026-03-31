import { and, asc, gt, sql, lt, gte, lte, eq, or } from "drizzle-orm"
import { db } from ".."
import { eventsTable, votdTable } from "../db/schema"
import { getFirstMonday, change24to12Format, getMaxDays, getGridRows, getFirstWeekday } from "../helperFunctions/dates_functions"
import { EventDef } from "../[locale]/lib/types"
import { fromZonedTime, toZonedTime } from "date-fns-tz"
import { getTranslations } from "next-intl/server"

const timezoneChange = sql`NOW() AT TIME ZONE 'America/Chicago'` 

async function dbQueryHandler<T>(query: () => Promise<T>): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database operation failed");
  }
}

export async function getTopThree(){
    const info = await dbQueryHandler(()=>  db.select({
            title: eventsTable.title, 
            title_es: eventsTable.title_es,
            summary: eventsTable.summary,
            summary_es: eventsTable.summary_es,
            date: eventsTable.date,
            })
            .from(eventsTable)
            .where(sql`
                ${eventsTable.date} >= ${timezoneChange}
                AND ${eventsTable.date} <= ${timezoneChange} + INTERVAL '1 week'`)
            .orderBy(asc(eventsTable.date))
            .limit(3))
        return info;
} 

// export async function getThreeMonthsEvents(){
//     const info = await db.select()
//     .from(eventsTable)
//       .where(
//         and(
//             sql`(${eventsTable.date} >= ${timezoneChange}
//                 AND ${eventsTable.date} <= ${timezoneChange} + INTERVAL '3 months')
//                 OR (EXTRACT (MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO')) = EXTRACT(MONTH FROM ${eventsTable.date}))`
//             , eq(eventsTable.importance, false)
//         )
//         )
//     .orderBy(asc(eventsTable.date))
//     return info;
// }

// export async function getThreeMonthsImportant(){
//     const current_date = toZonedTime(new Date(), "America/Chicago");
//     let changing_month = current_date.getMonth();
//     let changing_year = current_date.getFullYear();
//     let mondayServices = [];
//     let sortedImportant;
//     const staticImportant = {
//         title: "Prayer and Worship Night", 
//         title_es: "Noche de Oración y Adoración" , 
//         for: "Church", 
//         type: "Fellowship", 
//         summary: "A service of prayer and petitions", 
//         summary_es: "Un servicio de oración y peticiones",
//         location: "Iglesia Nueva Esperanza"
//     };

//     for (let i = 0; i < 3; i ++){
//         let firstMonday = getFirstMonday(changing_year, changing_month);
//         let temp_month = changing_month + 1;
//         let formatMonth = temp_month < 10 ? `0${temp_month}` : temp_month.toString() 
//         let formatDay = `0${firstMonday}`
//         mondayServices.push({...staticImportant, date: new Date(`${changing_year}-${formatMonth}-${formatDay}T19:00:00Z`)})
//         changing_month = (changing_month + 1) % 12;
//         if (changing_month == 0)
//             changing_year ++;    
//     }

//     const info = await db.select(
//         {
//         title: eventsTable.title, 
//         title_es: eventsTable.title_es , 
//         date: eventsTable.date,
//         for: eventsTable.for, 
//         type: eventsTable.type, 
//         summary: eventsTable.summary, 
//         summary_es: eventsTable.summary_es,
//         location: eventsTable.location,
//         }
//     )
//     .from(eventsTable)
//     .where(and(
//         or(
//         sql`(${eventsTable.date} >= ${timezoneChange}
//         AND ${eventsTable.date} <= ${timezoneChange} + INTERVAL '3 months')`,
//         sql`(EXTRACT (MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO')) = EXTRACT(MONTH FROM ${eventsTable.date}))`
//         ),
//         eq(eventsTable.importance, true)
//     ))
//     .orderBy(eventsTable.date);

//     sortedImportant = [...mondayServices, ...info];
//     sortedImportant = sortedImportant.sort((a,b) => a.date.getTime() - b.date.getTime())
//     return sortedImportant;
// }

export async function getMonthEvents(adv: number){

    const t = await getTranslations("Calendar");
    const currentTime = toZonedTime(new Date(), "America/Chicago");

    const current_month = (currentTime.getMonth() + adv) % 12;
    const date_month_string = current_month + 1 > 9 ? (current_month + 1).toString() : `0${current_month + 1}` 
    let current_year = currentTime.getFullYear() 
    if (current_month < currentTime.getMonth()) //means adding to current moves us to next year
        current_year ++;

    const max = getGridRows(current_year, current_month);

    const maxDays = getMaxDays(current_year, current_month);

    let startDay = getFirstWeekday(current_year, current_month);

    let temp_tracker = 1;

    const constantEvents: typeof eventsTable.$inferSelect  [] = [];

    for (let i = 0; i < max; i ++){
        while (startDay % 7 <= 3 && temp_tracker <= maxDays){
            if (startDay % 7 == 0){
                const date_day = temp_tracker;
                const date_day_string = date_day > 9 ? date_day.toString() : `0${date_day}`
                const utcTime = fromZonedTime(new Date(`${current_year}-${date_month_string}-${date_day_string}T10:30:00.000`), "America/Chicago")
                constantEvents.push({id: 1000, title: "Sunday Service", title_es: "Servicio Dominical", type: "", summary: null, summary_es: null, location: null, importance: null, for: null,
                    date: toZonedTime(utcTime, "America/Chicago"), day_span: 1, no_time_events: false})
                temp_tracker ++;
                startDay ++;
            }
            else if (startDay % 7 == 1){
                const date_day = temp_tracker;
                const date_day_string = date_day > 9 ? date_day.toString() : `0${date_day}`
                const utcTime = fromZonedTime(new Date(`${current_year}-${date_month_string}-${date_day_string}T19:00:00.000`), "America/Chicago")
                constantEvents.push({id: 2000, title: "Prayer Service", title_es: "Servicio de Oración", type: "", summary: null, summary_es: null, location: null, importance: null, for: null, 
                    date: toZonedTime(utcTime, "America/Chicago"), day_span: 1, no_time_events: false})
                temp_tracker += 2; //skipping tuesday  
                startDay += 2;
            }
            else if (startDay % 7 == 3){
                const date_day = temp_tracker;
                const date_day_string = date_day > 9 ? date_day.toString() : `0${date_day}`
                const utcTime = fromZonedTime(new Date(`${current_year}-${date_month_string}-${date_day_string}T19:00:00.000`), "America/Chicago")
                constantEvents.push({id: 3000, title: "Disciple Service", title_es: "Servicio de Discipulado", type: "", summary: null, summary_es: null, location: null, importance: null, for: null,
                    date: toZonedTime(utcTime, "America/Chicago"), day_span: 1, no_time_events: false})
                temp_tracker ++; 
                startDay ++; 
            }
        }
        if (startDay % 7 > 3 ){
            temp_tracker += (7 - (startDay % 7)); //we can tell how many days are needed to go to next sunday based on start day
            startDay = 0; //reset to sunday
        }
        if (temp_tracker > maxDays)
            break;
    }


    const valid_data: EventDef[] = [];
    const sqlQuery =
    adv > 0 ? 
        sql`EXTRACT(MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO')) + ${adv}
            = EXTRACT(MONTH FROM ${eventsTable.date})`
        : sql`EXTRACT(MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO'))
            = EXTRACT(MONTH FROM ${eventsTable.date})`;

    const info = await db.select()
    .from(eventsTable)
      .where(
        and(
            and(
                sqlQuery
                , eq(eventsTable.importance, false)
                ),
            eq(eventsTable.day_span, 1)
        )
        )
    .orderBy(asc(eventsTable.date));

    const moreDays = await db.select()
    .from(eventsTable)
      .where(
        and(
            and(
                sqlQuery
                , eq(eventsTable.importance, false)
            ),
            gt(eventsTable.day_span, 1)
        )        
        )
    .orderBy(asc(eventsTable.date));
    const temp = [...moreDays];
    for (const row of moreDays) {
        const days = row.day_span;
        const checkTime = row.no_time_events;
        if (checkTime)
            row.no_time_events = false;
        if (days){
            for (let i = 1; i < days; i ++){
                const temp_date = new Date(row.date);
                temp.push({...row, date: new Date(temp_date.setDate(temp_date.getDate() + i)), id: i * 10000, no_time_events: checkTime})
            }
        }
    }



    let merge = [...info, ...constantEvents, ...temp]

    merge = merge.sort((a,b) => a.date.getTime() - b.date.getTime())
    
    for (const row of merge){
        valid_data.push({
            ...row,
            date: row.date.toLocaleDateString(),
            time: row.no_time_events == true ? "": change24to12Format(row.date)
        })
    }
    
    return valid_data;
}

export async function getImportantMonthEvents(adv: number){
    let sortedImportant;
    const staticImportant = {
        id: 100,
        title: "Prayer and Worship Night", 
        title_es: "Noche de Oración y Adoración" , 
        for: "Church", 
        type: "Fellowship", 
        summary: "A service of prayer and petitions", 
        summary_es: "Un servicio de oración y peticiones",
        location: "Iglesia Nueva Esperanza"
    };
    const current_date = toZonedTime(new Date(), "America/Chicago");
    let changing_month = (current_date.getMonth() + adv) % 12;
    let changing_year = current_date.getFullYear();
    if  (changing_month >= 0 && current_date.getMonth() == 11){ //means the current month is still last year, but adding months makes it to the following year
        changing_year ++
    }
    let mondayService;
    let firstMonday = getFirstMonday(changing_year, changing_month);
    let temp_month = changing_month + 1;
    let formatMonth = temp_month < 10 ? `0${temp_month}` : temp_month.toString() 
    let formatDay = `0${firstMonday}`
    mondayService = {...staticImportant, date: new Date(`${changing_year}-${formatMonth}-${formatDay}T19:00:00Z`)}

    const valid_important: EventDef[] = [];
    const sqlQuery =
    adv > 0 ?
        sql`EXTRACT(MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO')) + ${adv}
            = EXTRACT(MONTH FROM ${eventsTable.date})`
        : sql`EXTRACT(MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO'))
            = EXTRACT(MONTH FROM ${eventsTable.date})`;
    const info = await db.select()
    .from(eventsTable)
      .where(
        and(
            sqlQuery
            , eq(eventsTable.importance, true)
        )
        )
    .orderBy(asc(eventsTable.date))

    sortedImportant = [mondayService, ...info];
    sortedImportant = sortedImportant.sort((a,b) => a.date.getTime() - b.date.getTime())

    for (const row of sortedImportant) {
        valid_important.push({
            ...row,
            date: row.date.toLocaleDateString(),
            time: change24to12Format(row.date)
        })
    }
    return valid_important;
}

export async function getDailyReadings(locale: string){
    try {
        const db_info = await db.select({
            text: locale == "en" ? votdTable.content_en : votdTable.content_es,
            verse: locale == "en" ? votdTable.verse_name_en: votdTable.verse_name_es,
            link: locale == "en" ? votdTable.verse_link_en: votdTable.verse_link_es
        }
        )
        .from(votdTable)
        .where(sql`${votdTable.day} = (NOW() AT TIME ZONE 'America/Chicago')::date`);
        if (db_info.length != 0){
            const info = {...db_info[0], translation: locale == "en" ? "NKJV": "RV1960"}
            return info;
        }
        else 
            return undefined;
    }catch(err){
        console.error("Database error fetching VOTD:", err);
        throw new Error("Failed to fetch verse of the day");
    }

    
}