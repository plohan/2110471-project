import type { Room } from "@sendhelp/core";
import db from "../db";

export async function roomGetAll(): Promise<Room[]> {
  const rooms = db.data.rooms;

  return rooms;
}
