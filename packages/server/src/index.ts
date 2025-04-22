import { DirectMessageCreate, RoomCreate, type MessageCreate } from "@sendhelp/core";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import { messageCreate, roomGetAll, roomCreate, findOrCreateUser, directMessage, directMessageGetAll } from "./usecases";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = new Map();

io.on("connection", async (socket) => {
  const username = socket.handshake.auth.username;
  users.set(username, socket.id);

  io.emit("user_update", Array.from(users.keys())); // broadcast

  socket.on("disconnect", () => {
    users.delete(username);
    io.emit("user_update", Array.from(users.keys()));
  });

  socket.on("message_create", async (body: MessageCreate) => {
    
    await findOrCreateUser(username);

    console.log(`[${username}](${body.roomName}): ${body.content}`);
    const message = await messageCreate(body, username);
    io.emit("message_create", message);
  });

  socket.on("room_create", async (body: RoomCreate) => {
    const room = await roomCreate(body);
    if (!room) {
      return;
    }
    io.emit("room_create", room);
  });

  socket.on("ready", async () => {
    const username = socket.handshake.auth.username;
    console.log(`[${username}]: ready`);
    const allRooms = await roomGetAll();
    const allDirectMessages = await directMessageGetAll();
    socket.emit("room_get_all", allRooms);
    socket.emit("direct_message_get_all", allDirectMessages);
  });

  socket.on("direct_message", async (body: DirectMessageCreate) => {

    await findOrCreateUser(username);

    const message = await directMessage(body, username)
  
    socket.emit("direct_message", message);
  });
});

io.listen(8000);
