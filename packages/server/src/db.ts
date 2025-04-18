import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { Room } from "@sendhelp/core";

export type DB = {
  rooms: Room[];
  userColors: Record<string, string>;
};

const db: Low<DB> = new Low(new JSONFile("db.json"), {
  rooms: [],
  userColors: {} as Record<string, string>,
});

db.read().then(() => {
  console.log("Database loaded");
});

export default db;
