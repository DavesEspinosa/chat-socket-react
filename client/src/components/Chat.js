import React, { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "./InfoBar";
import io from "socket.io-client";
import "./Chat.css";
import Input from "./Input";
import Messages from "./Messages/Messages";
import TextContainer from "./TextContainer";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "https://react-socket-chat-netlify.herokuapp.com/";

  useEffect(() => {
    /*   const data = queryString.parse(location.search);
    console.log(data);
    console.log(location.search); */

    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // to emit since our client side, to happen on the backend
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        /* socket.emit("disconnect");

        socket.off(); */
      }
    });
  }, [ENDPOINT, location.search]);
  //needed to prevent, connected with backend
  /*  return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]); */

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  //function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(messages, message);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users}></TextContainer>
    </div>
  );
}

export default Chat;
