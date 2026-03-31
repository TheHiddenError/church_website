import { eventsTable } from "@/app/db/schema"

export type Event_Type = typeof eventsTable.$inferSelect;

//using omit because do not want id and the object would have different date from the db date
export type EventDef =
    Omit<Event_Type, "date" | "importance" | "day_span" | "no_time_events"> & {
    date: string,
    time?: string,
}