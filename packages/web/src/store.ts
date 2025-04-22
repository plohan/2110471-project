import { create } from "zustand";
import {
  type Message,
  type Room,
  type DirectMessage,
  type RoomUpdateNewMember,
  getPairKey,
} from "@sendhelp/core";

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
  updateRoomNewMember: (newMember: RoomUpdateNewMember) => void;
}

export const useData = create<State>((set) => ({
  username: null,
  rooms: [],
  connectedUsers: [],
  directMessages: {},
  setUsername: (username: string) => set({ username }),
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
  setConnectedUsers: (users) => set({ connectedUsers: users }),
  addDirectMessage: (directMessage: DirectMessage) => {
    const key = getPairKey(directMessage.from, directMessage.to);
    set((state) => {
      const updatedMessages = state.directMessages[key]
        ? [...state.directMessages[key], directMessage]
        : [directMessage];
      return {
        directMessages: {
          ...state.directMessages,
          [key]: updatedMessages,
        },
      };
    });
  },
  updateRoomNewMember: (newMember: RoomUpdateNewMember) =>
    set((state) => {
      const rooms = updateRoomNewMember(state.rooms, newMember);
      return { rooms };
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

function updateRoomNewMember(
  rooms: Room[],
  newMember: RoomUpdateNewMember,
): Room[] {
  const room = rooms.find((room) => room.name == newMember.roomName);
  if (!room) {
    return rooms;
  }
  if (room.members.every((m) => m.username !== newMember.user.username)) {
    room.members.push(newMember.user);
  }
  return rooms;
}
