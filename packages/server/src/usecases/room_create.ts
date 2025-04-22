import { Room, RoomCreate } from "@sendhelp/core";
import db from "../db";

export async function roomCreate(
  body: RoomCreate,
  creatorName: string,
): Promise<Room | null> {
  const { name } = body;
  if (db.data.rooms.find((room) => room.name == body.name)) {
    return null;
  }
  const user = db.data.users.find((user) => user.username === creatorName);
  const room = {
    name,
    messages: [],
    members: [user],
  };
  db.data.rooms.push(room);
  await db.write();
  return room;
}
