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
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { getSocket, socketRoomCreate } from "@/socket";

interface ConnectedUserSidebarProps {
  other: string | null;
  setOther: (room: string) => void;
}

export function ConnectedUserSidebar(props: ConnectedUserSidebarProps) {
  const data = useData();
  const { other, setOther } = props;

  useEffect(() => {
    function handleUsersUpdate(users: string[]) {
      data.setConnectedUsers(users);
    }

    if (!data.username) return;
    const socket = getSocket({ username: data.username });

    socket.on("user_update", handleUsersUpdate);

    return () => {
      socket.off("user_update", handleUsersUpdate);
    };
  }, [data.username]);

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col">
      <div className="flex-1 overflow-y-auto p-2">
        <h3 className="text-lg font-bold">Connected Users</h3>
        <div>
          {data.connectedUsers.map((user, index) => (
            <button
              key={index}
              onClick={() => setOther(user)}
              className={cn(
                "block w-full text-left px-2 py-1 rounded hover:bg-[#40444b]",
                other === user && "bg-[#5865f2] text-white"
              )}
            >
              {user}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-auto p-3 bg-[#292b2f] flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-semibold">
          U
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium">{data.username}</p>
        </div>
      </div>
    </div>
  );
}
