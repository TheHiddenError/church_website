import { and, asc, gt, sql, lt, gte, lte, eq, or } from "drizzle-orm"
import { db } from ".."
import { eventsTable, votdTable } from "../db/schema"
import { getFirstMonday } from "../helperFunctions/dates_functions"

const timezoneChange = sql`NOW() AT TIME ZONE 'America/Chicago'` 

export async function getTopThree(){
    const info = await db.select({
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
        .limit(3);
    return info;
} 

export async function getThreeMonthsEvents(){
    const info = await db.select()
    .from(eventsTable)
      .where(
        and(
            sql`(${eventsTable.date} >= ${timezoneChange}
                AND ${eventsTable.date} <= ${timezoneChange} + INTERVAL '3 months')
                OR (EXTRACT (MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO')) = EXTRACT(MONTH FROM ${eventsTable.date}))`
            , eq(eventsTable.importance, false)
        )
        )
    .orderBy(asc(eventsTable.date))
    return info;
}

export async function getThreeMonthsImportant(){
    const current_date = new Date();
    let changing_month = current_date.getMonth();
    let changing_year = current_date.getFullYear();
    let mondayServices = [];
    let sortedImportant;
    const staticImportant = {
        title: "Prayer and Worship Night", 
        title_es: "Noche de Oración y Adoración" , 
        for: "Church", 
        type: "Fellowship", 
        summary: "A service of prayer and petitions", 
        summary_es: "Un servicio de oración y peticiones",
        location: "Iglesia Nueva Esperanza"
    };

    for (let i = 0; i < 3; i ++){
        let firstMonday = getFirstMonday(changing_year, changing_month);
        let temp_month = changing_month + 1;
        let formatMonth = temp_month < 10 ? `0${temp_month}` : temp_month.toString() 
        let formatDay = `0${firstMonday}`
        mondayServices.push({...staticImportant, date: new Date(`${changing_year}-${formatMonth}-${formatDay}T19:00:00Z`)})
        changing_month = (changing_month + 1) % 12;
        if (changing_month == 0)
            changing_year ++;    
    }

    const info = await db.select(
        {
        title: eventsTable.title, 
        title_es: eventsTable.title_es , 
        date: eventsTable.date,
        for: eventsTable.for, 
        type: eventsTable.type, 
        summary: eventsTable.summary, 
        summary_es: eventsTable.summary_es,
        location: eventsTable.location,
        }
    )
    .from(eventsTable)
    .where(and(
        or(
        sql`(${eventsTable.date} >= ${timezoneChange}
        AND ${eventsTable.date} <= ${timezoneChange} + INTERVAL '3 months')`,
        sql`(EXTRACT (MONTH FROM (NOW() AT TIME ZONE 'AMERICA/CHICAGO')) = EXTRACT(MONTH FROM ${eventsTable.date}))`
        ),
        eq(eventsTable.importance, true)
    ))
    .orderBy(eventsTable.date);

    sortedImportant = [...mondayServices, ...info];
    sortedImportant = sortedImportant.sort((a,b) => a.date.getTime() - b.date.getTime())
    return sortedImportant;
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