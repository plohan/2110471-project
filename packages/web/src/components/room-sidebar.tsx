"use client";

import { Hash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useData } from "@/store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { socketRoomCreate } from "@/socket";

interface RoomSidebarProps {
  activeRoom: string | null;
  setActiveRoom: (room: string) => void;
}

export function RoomSidebar(props: RoomSidebarProps) {
  const data = useData();
  const { activeRoom, setActiveRoom } = props;
  const [newRoomName, setNewRoomName] = useState<string>("");

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    socketRoomCreate({
      name: newRoomName,
    });
    setNewRoomName("");
  }

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col">
      <div className="p-4 border-b flex justify-between border-[#232428] shadow-sm">
        <h1 className="font-bold text-white">Send help</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Plus />
          </DialogTrigger>
          <DialogContent className="bg-[#292b2f] text-white border-none">
            <DialogTitle>Create new chat room</DialogTitle>

            <form onSubmit={handleSendMessage} className="relative">
              <div className="flex flex-col p-2 gap-1">
                <Input
                  className="px-3 py-6 text-xl text-white outline-none border-1"
                  onChange={(e) => setNewRoomName(e.target.value)}
                  type="text"
                  placeholder="Your room name"
                ></Input>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Create!</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-2">
        <div className="space-y-0.5 mt-1">
          {data.rooms.map((room) => (
            <div
              key={room.name}
              className={cn(
                "flex flex-col rounded p-2 cursor-pointer hover:bg-[#42464D]",
                activeRoom === room.name
                  ? "bg-[#42464D] text-white"
                  : "text-gray-400",
              )}
              onClick={() => setActiveRoom(room.name)}
            >
              <div className="flex items-center">
                <Hash className="w-5 h-5 mr-1 text-gray-400" />
                <span className="font-medium">{room.name}</span>
              </div>

              {/* Last message preview */}
              <div className="ml-6 mt-1 text-xs text-gray-400 truncate">
                <span className="font-medium text-gray-300">
                  {room.messages.length > 0
                    ? room.messages[room.messages.length - 1].content
                    : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-3 bg-[#292b2f] flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-semibold">
          U
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium">User</div>
          <div className="text-xs text-gray-400">#1234</div>
        </div>
      </div>
    </div>
  );
}
