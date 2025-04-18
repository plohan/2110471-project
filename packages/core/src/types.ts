export type MessageCreate = {
  roomName: string;
  content: string;
};

export type Message = {
  id: number;
  content: string;
  roomName: string;
  authorName: string;
};

export type Room = {
  name: string;
  messages: Message[];
};

export type RoomCreate = {
  name: string;
};
