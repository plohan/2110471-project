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
  members: User[];
};

export type RoomCreate = {
  name: string;
};

export type RoomJoin = {
  roomName: string;
};

export type RoomUpdateNewMember = {
  roomName: string;
  user: User;
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
