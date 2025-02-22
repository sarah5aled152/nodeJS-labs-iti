const socket = io("http://localhost:3000");

let msgInput = document.getElementById("msginput");
let sendBtn = document.getElementById("sendBtn");

let messages = document.getElementById("messages");
let typingEle = document.getElementById("type");

function sendMessage() {
  let msg = msgInput.value;

  socket.emit("sendMessage", msg);

  msgInput.value = "";
}

socket.on("reply", (data) => {
  console.log(data);

  let item = document.createElement("li");
  item.textContent = data;
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
});

sendBtn.addEventListener("click", (e) => {
  sendMessage();
});

msgInput.addEventListener("input", () => {
  socket.emit("typing");
});

msgInput.addEventListener("keyup", () => {
  socket.emit("stopTyping");
});

socket.on("userTyping", () => {
  typingEle.innerHTML = "Typing ...";
});

socket.on("userStopTyping", () => {
  setTimeout(() => {
    typingEle.innerHTML = " ";
  }, 1000);
});
