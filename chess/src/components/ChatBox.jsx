import { useEffect, useState } from "react";
import socket from "../utils/socket";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div className="p-4 border w-80">
      <h2 className="text-lg font-bold">Chat</h2>
      <div className="h-40 overflow-auto">
        {messages.map((msg, index) => (
          <p key={index} className="text-sm">{msg}</p>
        ))}
      </div>
      <input 
        type="text" 
        className="w-full p-2 border mt-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage} className="w-full mt-2 p-2 bg-blue-500 text-white">
        Send
      </button>
    </div>
  );
};

export default ChatBox;
