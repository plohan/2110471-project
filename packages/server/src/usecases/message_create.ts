import type { Message, MessageCreate } from "@sendhelp/core";
import db from "../db";

export async function messageCreate(
  messageCreate: MessageCreate,
  authorName: string,
): Promise<Message> {
  const { roomName, content } = messageCreate;
  const room = db.data.rooms.find((room) => room.name === roomName);
  const id = new Date().getTime();

  const message = {
    id,
    content,
    roomName,
    authorName,
  };
  room.messages.push(message);

  await db.write();

  return message;
}
