import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { Room, User, DirectMessage } from "@sendhelp/core";

const filepath = process.env.DATA_DIR ?? "db.json";

export type DB = {
  rooms: Room[];
  users: User[];
  directMessagePair: Record<string, DirectMessage[]>;
};

const db: Low<DB> = new Low(new JSONFile(filepath), {
  rooms: [],
  users: [],
  directMessagePair: {},
});

console.log(`Loading database from ${filepath}`);
db.read().then(() => {
  console.log("Database loaded");
});

// Test write and init if database does not exist
db.write().catch((e) => {
  console.error("Failed to write database:", e);
});

export default db;
