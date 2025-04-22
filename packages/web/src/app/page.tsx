"use client";

import { MessageList } from "@/components/message-list";
import { RoomSidebar } from "@/components/room-sidebar";
import { useSocketChat } from "@/hooks/chat";
import { useState, useEffect } from "react";
import { useData } from "@/store"; // Adjust the path if needed
import { UsernamePrompt } from "@/components/username-prompt";

export default function Home() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const data = useData();
  
  useEffect(() => {
    if (!data.username) {
      const stored = localStorage.getItem("username");
      if (stored && stored.trim() !== "") {
        data.setUsername(stored);
      } else {
        setShowUsernamePrompt(true);
      }
    }
  }, []);
  useSocketChat();
  return (
    <div className="flex h-screen bg-[#36393f] text-gray-100">
      {showUsernamePrompt && (
        <UsernamePrompt
          onSubmit={(name) => {
            localStorage.setItem("username", name);
            console.log("Name", name);
            data.setUsername(name);
            setShowUsernamePrompt(false);
          }}
        />
      )}
      <RoomSidebar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      <main className="flex-1 flex flex-col">
        <MessageList activeRoom={activeRoom} />
      </main>
    </div>
  );
}
