import { MessageCreate, RoomCreate } from "@sendhelp/core";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export interface SocketOption {
  username: string;
}

export function getSocket({ username }: SocketOption) {
  if (!socket) {
    socket = io("http://localhost:8000", {
      auth: {
        username,
      },
    });
  }
  return socket;
}

export function socketRoomCreate(body: RoomCreate) {
  if (!socket) {
    console.error("Socket not initialized");
    return;
  }
  socket.emit("room_create", body);
}

export function socketMessageCreate(body: MessageCreate) {
  if (!socket) {
    console.error("Socket not initialized");
    return;
  }
  socket.emit("message_create", body);
}
