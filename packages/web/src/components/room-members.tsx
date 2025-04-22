"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useData } from "@/store";
import { timestampString } from "@/lib/utils";

interface RoomMembersProps {
  activeRoom: string | null;
}

export function RoomMembers(props: RoomMembersProps) {
  const roomMembers = ["a", "b", "c"];

  return (
    <div className="flex flex-col bg-[#2f3136] h-full">
      <div className="p-4 border-b border-[#232428] shadow-sm pr-10">
        <div className="flex items-center">
          <span className="text-xl font-bold">Members</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {roomMembers.map((roomMember) => (
          <div key={roomMember} className="flex group">
            {roomMember}
          </div>
        ))}
      </div>
    </div>
  );
}
