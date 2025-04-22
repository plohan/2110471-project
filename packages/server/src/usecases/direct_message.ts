import { DirectMessage, DirectMessageCreate } from "@sendhelp/core";
import db from "../db";

export async function directMessage(
  directMessageCreate: DirectMessageCreate,
  from: string,
): Promise<DirectMessage> {
  const user = db.data.users.find((user) => user.username === from);
  const newMessage: DirectMessage = {
    id: new Date().getTime(),
    from,
    to: directMessageCreate.other,
    content: directMessageCreate.content,
    color: user?.color,
  };

  const key = getPairKey(from, directMessageCreate.other);

  if (!db.data.directMessagePair[key]) {
    db.data.directMessagePair[key] = [];
  }

  db.data.directMessagePair[key].push(newMessage);

  await db.write();

  return newMessage;
}

function getPairKey(user1: string, user2: string): string {
  return [user1, user2].sort().join("|");
}
