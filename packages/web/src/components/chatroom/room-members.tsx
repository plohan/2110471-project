"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useData } from "@/store";
import type { User, Room } from "@sendhelp/core";

interface RoomMembersProps {
  activeRoom: string;
}

export function RoomMembers(props: RoomMembersProps) {
  const { activeRoom } = props;
  const data = useData();
  const [roomMembers, setRoomMembers] = useState<User[]>([]);

  useEffect(() => {
    if (!activeRoom) return;

    const room = data.rooms.find((room) => room.name === activeRoom);
    if (!room) return;

    setRoomMembers(room.members);
  }, [activeRoom, data]);

  return (
    <div className="flex flex-col bg-[#2f3136] h-full">
      <div className="p-4 border-b border-[#232428] shadow-sm pr-10">
        <div className="flex items-center">
          <span className="text-xl font-bold">Members</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {roomMembers.map((roomMember) => (
          <div
            key={roomMember.username}
            className="flex group"
            style={{ color: roomMember.color }}
          >
            {roomMember.username}
          </div>
        ))}
      </div>
    </div>
  );
}
