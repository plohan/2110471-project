"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useData } from "@/store";
import { socketJoinRoom } from "@/socket";

interface JoinRoomPorps {
  activeRoom: string;
}

export function JoinRoom(props: JoinRoomPorps) {
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

  function handleJoinRoom() {
    socketJoinRoom(activeRoom);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="text-center text-3xl">Join #{activeRoom}?</p>
      <button onClick={() => handleJoinRoom()}>Join</button>
    </div>
  );
}
