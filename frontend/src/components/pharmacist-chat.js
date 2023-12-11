import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import Home from "./gohome";
const socket = io.connect("http://localhost:7000");

function PatientChat() {

    const query = new URLSearchParams(window.location.search);
    // Messages States
    const [messages, setMessages] = useState([]);
    const [messageReceived, setMessageReceived] = useState("");
    const senderId = "6570c3749f2edddc437e4569";
    const receiverId = "6550bcb645079be3a32bf955"; ////6550bcb645079be3a32bf955_Sara
    //const[receiverName,setreceiverName] = useState(query.get("id")?.split("_")[1]);
    const [room, setRoom] = useState(`${senderId}-${receiverId}`);
    const [inputMessage, setInputMessage] = useState("")


    const sendMessage = () => {
        console.log('message sent');
        socket.emit("send_message", { senderId, receiverId, inputMessage, room });
        setInputMessage("");
        setMessages((messages) => [
            ...messages,
           {senderId, receiverId, message: inputMessage},
          ]);
    };

    useEffect(() => {
        socket.emit("join", senderId, receiverId);

        socket.on("receive_message", (data) => {
            console.log(data);
            setMessages((messages) => [
                ...messages,
               data,
              ]);
        });
      }, [socket, senderId, receiverId]);

      return (
        <div className="chat-app">
          <div className="chat-messages">
            {messages.map((message) => (
                <div>
              <div key={message.senderId} className="message">
                <strong>{message.senderId}:</strong> {message.message}
              </div>
              </div>))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => {
                e.preventDefault();
                setInputMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      );
}

export default PatientChat;