import { eventsTable } from "@/app/db/schema"

export type Event_Type = typeof eventsTable.$inferSelect;

export type EventDef =
    Omit<Event_Type, "date" | "id"> & {
    date: string,
    time?: string,
}