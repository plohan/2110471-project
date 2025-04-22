import { useEffect } from "react";
import { getSocket } from "../socket";
import { useData } from "../store";
import type { Message, Room } from "@sendhelp/core";
import { randomUsername } from "../lib/utils";

export function useSocketChat() {
  const data = useData();
  const { init, addMessage, addRoom, username } = data;

  useEffect(() => {
    if (!username) return;
    const socket = getSocket({ username });

    const roomGetAll = (msg: Room[]) => {
      init(msg);
    };

    const messageCreate = (msg: Message) => {
      addMessage(msg);
    };

    const roomCreate = (msg: Room) => {
      addRoom(msg);
    };

    socket.on("message_create", messageCreate);
    socket.on("room_get_all", roomGetAll);
    socket.on("room_create", roomCreate);

    socket.emit("ready");

    return () => {
      socket.off("message_create", messageCreate);
      socket.off("room_get_all", roomGetAll);
      socket.off("room_create", roomCreate);
    };
  }, [init, addMessage, addRoom, data.username]);
}
