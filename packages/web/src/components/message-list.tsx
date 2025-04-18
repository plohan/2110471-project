"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/store";
import { type Message } from "@sendhelp/core";
import { socketMessageCreate } from "@/socket";
import { timestampString } from "@/lib/utils";

interface MessageListProps {
  activeRoom: string | null;
}

export function MessageList(props: MessageListProps) {
  const { activeRoom } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const data = useData();
  useEffect(() => {
    if (!activeRoom) {
      return;
    }
    const room = data.rooms.find((room) => room.name === activeRoom);
    if (!room) {
      return;
    }
    setMessages(room.messages);
  }, [activeRoom, data.rooms]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeRoom) {
      return;
    }

    const message = {
      roomName: activeRoom,
      content: newMessage,
    };

    socketMessageCreate(message);
    setNewMessage("");
  };

  return (
    <>
      <div className="p-4 border-b border-[#232428] shadow-sm">
        <div className="flex items-center">
          <span className="text-xl font-bold"># general</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex group">
            <div>
              <div className="flex items-baseline">
                <span className="font-medium text-white mr-2">
                  {message.authorName || "<Anonymous>"}
                </span>
                <span className="text-xs text-gray-400">
                  {timestampString(new Date(message.id))}
                </span>
              </div>
              <p className="text-gray-100">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mx-4 mb-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message #general"
            className="bg-[#40444b] border-none text-gray-100 pr-10"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent"
          >
            <Send className="h-5 w-5 text-gray-400" />
          </Button>
        </form>
      </div>
    </>
  );
}
