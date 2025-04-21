import { create } from "zustand";
import type { Message, Room, DirectMessage } from "@sendhelp/core";

interface State {
  username: string | null;
  setUsername: (username: string) => void;
  rooms: Room[];
  init: (rooms: Room[]) => void;
  userPairs: Record<string, DirectMessage[]>;
  addMessage: (message: Message) => void;
  addRoom: (room: Room) => void;
  connectedUsers: string[];
  setConnectedUsers: (users: string[]) => void;
  addDirectMessage: (from: string, to: string, content: string) => void;
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
  userPairs: {},
  addDirectMessage: (from, to, content) => {
    const key = getPairKey(from, to);
    set((state) => {
      const newMessage: DirectMessage = {
        id: Date.now(),
        from,
        to,
        content,
      };
      const updatedMessages = state.userPairs[key]
        ? [...state.userPairs[key], newMessage]
        : [newMessage];
      return {
        userPairs: {
          ...state.userPairs,
          [key]: updatedMessages,
        },
      };
    });
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

function getPairKey(user1: string, user2: string): string {
  return [user1, user2].sort().join("|");
}
