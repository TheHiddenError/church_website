import { and, asc, gt, sql, lt, gte, lte } from "drizzle-orm"
import { db } from ".."
import { eventsTable, votdTable } from "../db/schema"

export async function getTopThree(){
    const info = await db.select({
        title: eventsTable.title, 
        title_es: eventsTable.title_es,
        summary: eventsTable.summary,
        summary_es: eventsTable.summary_es,
        date: eventsTable.date
        })
        .from(eventsTable)
        .where(gt(eventsTable.date, new Date()))
        .orderBy(asc(eventsTable.date))
        .limit(3);
    return info;
} 

export async function getThreeMonthsEvents(){
    const info = await db.select()
    .from(eventsTable)
    .where(
        sql `
        (EXTRACT(YEAR FROM date) * 100 + (EXTRACT(MONTH FROM date)))
        BETWEEN 
        (EXTRACT(YEAR FROM NOW() AT TIME ZONE 'America/New_York') * 100 
        + (EXTRACT(MONTH FROM NOW() AT TIME ZONE 'America/New_York')))
        AND 
        (EXTRACT(YEAR FROM NOW() AT TIME ZONE 'America/New_York' + INTERVAL '2 month') * 100
        + (EXTRACT(MONTH FROM NOW() AT TIME ZONE 'America/New_York' + INTERVAL '2 month')))
        `
    )
    .orderBy(asc(eventsTable.date))
    return info;
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
        .where(sql`day = CURRENT_DATE`);
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