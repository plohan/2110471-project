import { Room, RoomCreate } from "@sendhelp/core";
import db from "../db";

export async function roomCreate(body: RoomCreate): Promise<Room | null> {
  const { name } = body;
  if (db.data.rooms.find((room) => room.name == body.name)) {
    return null;
  }
  const room = {
    name,
    messages: [],
  };
  db.data.rooms.push(room);
  await db.write();
  return room;
}
