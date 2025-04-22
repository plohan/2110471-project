import { useEffect } from "react";
import { getSocket } from "../socket";
import { useData } from "../store";
import type { DirectMessage, Message, Room } from "@sendhelp/core";

export function useSocketChat() {
  const data = useData();
  const {
    init,
    addMessage,
    addRoom,
    username,
    addDirectMessage,
    initDirectMessage,
  } = data;

  useEffect(() => {
    if (!username) return;
    const socket = getSocket({ username });

    const roomGetAll = (msg: Room[]) => {
      init(msg);
    };

    const directMessageGetAll = (msg: Record<string, DirectMessage[]>) => {
      initDirectMessage(msg);
    };

    const messageCreate = (msg: Message) => {
      addMessage(msg);
    };

    const roomCreate = (msg: Room) => {
      addRoom(msg);
    };

    const directMessageCreate = (msg: DirectMessage) => {
      addDirectMessage(msg);
    };

    socket.on("message_create", messageCreate);
    socket.on("room_get_all", roomGetAll);
    socket.on("direct_message_get_all", directMessageGetAll);
    socket.on("room_create", roomCreate);
    socket.on("direct_message", directMessageCreate);

    socket.emit("ready");

    return () => {
      socket.off("message_create", messageCreate);
      socket.off("room_get_all", roomGetAll);
      socket.off("room_create", roomCreate);
      socket.off("direct_message_get_all", directMessageGetAll);
      socket.off("direct_message", directMessageCreate);
    };
  }, [init, addMessage, addRoom, data.username, addDirectMessage]);
}
