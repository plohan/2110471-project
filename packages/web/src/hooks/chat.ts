import { useEffect } from "react";
import { getSocket } from "../socket";
import { useData } from "../store";
import type {
  DirectMessage,
  Message,
  Room,
  RoomUpdateNewMember,
} from "@sendhelp/core";

export function useSocketChat() {
  const data = useData();
  const {
    init,
    addMessage,
    addRoom,
    username,
    addDirectMessage,
    initDirectMessage,
    updateRoomNewMember,
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

    const roomUpdateNewMember = (msg: RoomUpdateNewMember) => {
      updateRoomNewMember(msg);
    };

    socket.on("direct_message", directMessageCreate);
    socket.on("direct_message_get_all", directMessageGetAll);
    socket.on("room_update_new_member", roomUpdateNewMember);
    socket.on("message_create", messageCreate);
    socket.on("room_get_all", roomGetAll);
    socket.on("room_create", roomCreate);

    socket.emit("ready");

    return () => {
      socket.off("direct_message", directMessageCreate);
      socket.off("direct_message_get_all", directMessageGetAll);
      socket.off("room_update_new_member", roomUpdateNewMember);
      socket.off("message_create", messageCreate);
      socket.off("room_get_all", roomGetAll);
      socket.off("room_create", roomCreate);
    };
  }, [init, addMessage, addRoom, data.username, addDirectMessage]);
}
