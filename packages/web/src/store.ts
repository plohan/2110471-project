import { create } from "zustand";
import type { Message, Room } from "@sendhelp/core";
import { randomUsername } from "./lib/utils";

interface State {
  username: string | null;
  setUsername: (username: string) => void;
  rooms: Room[];
  init: (rooms: Room[]) => void;
  addMessage: (message: Message) => void;
  addRoom: (room: Room) => void;
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
