import { create } from "zustand";
import type { Message, Room } from "@sendhelp/core";

interface State {
  username: string | null;
  setUsername: (username: string) => void;
  rooms: Room[];
  init: (rooms: Room[]) => void;
  addMessage: (message: Message) => void;
  addRoom: (room: Room) => void;
  connectedUsers: string[];
  setConnectedUsers: (users: string[]) => void;
  directMessage: (to: string, from: string) => void;
}

export const useData = create<State>((set) => ({
  username: null,
  setUsername: (username: string) => set({ username }),
  rooms: [],
  init: (rooms: Room[]) => {
    set({ rooms });
  },
  addMessage: (message: Message) =>
    set((state) => {
      const rooms = addMessage(state.rooms, message);
      return { rooms };
    }),
  addRoom: (room: Room) =>
    set((state) => {
      return { rooms: [...state.rooms, room] };
    }),
  connectedUsers: [],
  setConnectedUsers: (users) => set({ connectedUsers: users }),
  directMessage: (to: string, from: string) => {
    console.log(`Direct message from ${from} to ${to}`);
    // Extend this logic when you want to store or render DMs in frontend
  },
}));

function addMessage(rooms: Room[], message: Message): Room[] {
  const room = rooms.find((room) => room.name == message.roomName);
  if (!room) {
    return rooms;
  }
  if (room.messages.every((m) => m.id !== message.id)) {
    room.messages.push(message);
  }
  return rooms;
}