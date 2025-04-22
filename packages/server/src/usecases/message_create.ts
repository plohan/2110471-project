import type { Message, MessageCreate } from "@sendhelp/core";
import db from "../db";

export async function messageCreate(
  messageCreate: MessageCreate,
  authorName: string,
): Promise<Message> {
  const { roomName, content } = messageCreate;
  const room = db.data.rooms.find((room) => room.name === roomName);
  const user = db.data.users.find((user) => user.username === authorName);
  if (!user) {
    throw new Error(`User with username "${authorName}" not found.`);
  }
  const id = new Date().getTime();

  const message = {
    id,
    content,
    roomName,
    authorName,
    color: user.color,
  };
  room.messages.push(message);

  await db.write();

  return message;
}
