import { create } from "zustand";
import type { Message, Room, DirectMessage } from "@sendhelp/core";

interface State {
  username: string | null;
  setUsername: (username: string) => void;
  rooms: Room[];
  init: (rooms: Room[]) => void;
  initDirectMessage: (directMessages: Record<string, DirectMessage[]>) => void;
  directMessages: Record<string, DirectMessage[]>;
  addMessage: (message: Message) => void;
  addRoom: (room: Room) => void;
  connectedUsers: string[];
  setConnectedUsers: (users: string[]) => void;
  addDirectMessage: (directMessage: DirectMessage) => void;
}

export const useData = create<State>((set) => ({
  username: null,
  setUsername: (username: string) => set({ username }),
  rooms: [],
  init: (rooms: Room[]) => {
    set({ rooms });
  },
  initDirectMessage: (directMessages: Record<string, DirectMessage[]>) => {
    set({ directMessages });
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
  directMessages: {},
  addDirectMessage: (directMessage: DirectMessage) => {
    const key = getPairKey(directMessage.from, directMessage.to);
    set((state) => {
      const newMessage: DirectMessage = {
        id: Date.now(),
        from: directMessage.from,
        to: directMessage.to,
        content: directMessage.content,
        color: directMessage.color 
      };
      const updatedMessages = state.directMessages[key]
        ? [...state.directMessages[key], newMessage]
        : [newMessage];
      return {
        directMessages: {
          ...state.directMessages,
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
