"use client";

import { MessageList } from "@/components/message-list";
import { RoomSidebar } from "@/components/room-sidebar";
import { useSocketChat } from "@/hooks/chat";
import { useState } from "react";

export default function Home() {
  useSocketChat();
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  return (
    <div className="flex h-screen bg-[#36393f] text-gray-100">
      <RoomSidebar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      <main className="flex-1 flex flex-col">
        <MessageList activeRoom={activeRoom} />
      </main>
    </div>
  );
}
