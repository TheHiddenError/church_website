import { serial, pgTable, text, timestamp, date, boolean } from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_es: text("title_es").notNull(),
  summary: text("summary"),
  summary_es: text("summary_es"),
  date: timestamp("date").notNull(),
  for: text("for").default("Church"),
  type: text("type").notNull(),
  location: text("location").default("Iglesia Nueva Esperanza"),
  importance: boolean("importance").default(false)
});

export const votdTable = pgTable("votd", {
    date: date("day").primaryKey(),
    content: text("content").notNull(),
    content_es: text("content_es").notNull(),
    verse_name: text("verse_name").notNull(),
    verse_name_es: text("verse_name_es").notNull()
})