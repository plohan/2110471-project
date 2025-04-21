import { User } from "@sendhelp/core";
import db from "../db";
import { getRandomColor } from "../lib/color";

export async function findOrCreateUser(username: string) {
    const user = db.data.users.find((user) => user.username == username)

    if (!user) {
        const newUser = {
            username,
            color: getRandomColor(),
        };
        db.data.users.push(newUser);
        return newUser;
    }
    return user;
}