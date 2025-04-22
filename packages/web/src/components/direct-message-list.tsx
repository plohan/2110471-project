"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/store";
import { getPairKey, type DirectMessage } from "@sendhelp/core";
import { socketDirectMessageCreate } from "@/socket";
import { timestampString } from "@/lib/utils";

interface DirectMessageListProps {
  other: string | null;
}

export function DirectMessageList(props: DirectMessageListProps) {
  const { other } = props;
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);
  const data = useData();
  useEffect(() => {
    if (!other || !data.username) {
      return;
    }
    const userPair = data.directMessages[getPairKey(data.username, other)];
    setDirectMessages(userPair || []);
  }, [other, data.directMessages, data.username]);
  const [newDirectMessage, setNewDirectMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirectMessage.trim() || !other) {
      return;
    }

    const directMessage = {
      key: getPairKey(data.username!, other),
      content: newDirectMessage,
      other: other,
    };

    socketDirectMessageCreate(directMessage);
    setNewDirectMessage("");
  };

  return (
    <>
      <div className="p-4 border-b border-[#232428] shadow-sm">
        <div className="flex items-center">
          <span className="text-xl font-bold">
            DM: {other ?? "Text channel"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {directMessages.map((message) => (
          <div key={message.id} className="flex group">
            <div>
              <div className="flex items-baseline">
                <span
                  className="font-medium mr-2"
                  style={{ color: message.color || "#ffffff" }}
                >
                  {message.from || "<Anonymous>"}
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
            value={newDirectMessage}
            onChange={(e) => setNewDirectMessage(e.target.value)}
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
