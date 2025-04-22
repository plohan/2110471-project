"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useData } from "@/store";
import { MessageList } from "./message-list";
import { RoomMembers } from "./room-members";
import { JoinRoom } from "./join-room";

interface ChatroomPorps {
  activeRoom: string;
}

export function Chatroom(props: ChatroomPorps) {
  const { activeRoom } = props;
  const data = useData();
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (!activeRoom) return;

    const room = data.rooms.find((room) => room.name === activeRoom);
    if (!room) return;

    setIsMember(
      !!room.members.find((member) => member.username === data.username),
    );
  }, [activeRoom, data]);

  return isMember ? (
    <div className="flex h-full">
      <MessageList activeRoom={activeRoom} />
      <RoomMembers activeRoom={activeRoom} />
    </div>
  ) : (
    <JoinRoom activeRoom={activeRoom} />
  );
}
