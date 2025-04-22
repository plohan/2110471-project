import type { Room } from "@sendhelp/core";
import db from "../db";
import type { DirectMessage } from "@sendhelp/core";

export async function directMessageGetAll(): Promise<
  Record<string, DirectMessage[]>
> {
  const directMessages = db.data.directMessagePair;

  return directMessages;
}
