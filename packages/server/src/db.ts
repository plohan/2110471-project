import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { Room, User } from "@sendhelp/core";

export type DB = {
  rooms: Room[];
  users: User[];
};

const db: Low<DB> = new Low(new JSONFile("db.json"), {
  rooms: [],
  users: [],
});

db.read().then(() => {
  console.log("Database loaded");
});

export default db;
