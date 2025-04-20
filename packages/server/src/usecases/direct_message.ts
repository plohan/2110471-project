import { DirectMessage } from "@sendhelp/core";
import db from "../db";

export async function directMessage(to: string, content: string, from: string):Promise<DirectMessage> {
    const newMessage = {
        id: new Date().getTime(),
        from,
        to,
        content,
    };

    db.data!.directMessages.push(newMessage);

    await db.write();

    return newMessage;
}