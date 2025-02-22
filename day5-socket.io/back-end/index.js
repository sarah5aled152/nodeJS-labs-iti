import express from "express";
import { Server } from "socket.io";
import { dbConnection } from "./DB/connection.js";
import { postModel } from "./DB/models/post-model.js";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

dbConnection();

const server = app.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  // socket.on("sendMessage", (data) => {
  //   console.log(data);
  //   // io.emit("reply", data + "from backend");
  //   io.emit("reply", data + " from backend");
  // });

  // socket.on("typing", () => {
  //   socket.broadcast.emit("userTyping");
  // });

  // socket.on("stopTyping", () => {
  //   socket.broadcast.emit("userStopTyping");
  // });

  socket.on("addpost", async (data) => {
    const post = await postModel.create(data);
    console.log(post);
    let posts = await postModel.find();
    io.emit("posts", posts);
  });

  socket.on("load", async () => {
    let posts = await postModel.find();
    io.emit("posts", posts);
  });

  socket.on("search", async (query) => {
    let matchingPosts;
    try {
      if (query && query.trim() !== "") {
        matchingPosts = await postModel.find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        });
      } else {
        matchingPosts = await postModel.find();
      }
    } catch (err) {
      console.log("Search error:", err);
      return;
    }

    socket.emit("posts", matchingPosts);
  });
  console.log(socket.id);
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log(`user with id ${socket.id} disconnected`);
  });
});
