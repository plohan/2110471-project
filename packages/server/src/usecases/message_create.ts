import type { Message, MessageCreate } from "@sendhelp/core";
import db from "../db";

export async function messageCreate(
  messageCreate: MessageCreate,
  authorName: string,
): Promise<Message> {
  const { roomName, content } = messageCreate;
  const room = db.data.rooms.find((room) => room.name === roomName);
  const userColors = db.data.userColors;
  const id = new Date().getTime();

  if (!userColors[authorName]) {
    userColors[authorName] = getRandomColor();
  }
  const message = {
    id,
    content,
    roomName,
    authorName,
    color: userColors[authorName],
  };
  room.messages.push(message);

  await db.write();

  return message;
}

function getRandomColor(): string {
  const colors = [
    "#e74c3c", // red
    "#3498db", // blue
    "#2ecc71", // green
    "#f1c40f", // yellow
    "#9b59b6", // purple
    "#1abc9c", // turquoise
    "#e67e22", // orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
