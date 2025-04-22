export type MessageCreate = {
  roomName: string;
  content: string;
};

export type Message = {
  id: number;
  content: string;
  roomName: string;
  authorName: string;
  color: string;
};

export type Room = {
  name: string;
  messages: Message[];
};

export type RoomCreate = {
  name: string;
};

export type User = {
  username: string;
  color: string;
};

export type DirectMessage = {
  id: number;
  from: string;
  to: string;
  content: string;
  color: string;
};

export type DirectMessageCreate = {
  content: string;
  to: string;
};
