import db from "../db";

export async function findUser(username: string) {
  const user = db.data.users.find((user) => user.username == username);

  if (!user) {
    return null;
  }
  return user;
}
