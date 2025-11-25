import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { v7 as uuidV7 } from "uuid";

export const users = pgTable("users", {
	id: text()
		.primaryKey()
		.$defaultFn(() => uuidV7()),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdateFn(() => new Date()),
});
