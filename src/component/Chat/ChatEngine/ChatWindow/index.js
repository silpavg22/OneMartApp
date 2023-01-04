import React, { useState } from "react";
import io from "socket.io-client";
import { styles } from "../styles";
import Chat from "./Chat";


const socket = io.connect("http://localhost:3001");

const ChatWindow = (props) => {
  const [usernameChat, setUsernameChat] = useState("");
  const [room, setRoom] = useState("admin");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (usernameChat != "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  //   useEffect(() => {
  //     // Update the document title using the browser API
  //     socket.emit("join_room", 'admin');
  //     setShowChat(true);
  //   }, []);
  return (
    <div
      className="transition-5"
      style={{
        ...styles.supportWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      <div className="AppChat">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(event) => {
                setUsernameChat(event.target.value);
              }}
            />
            {/* <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            /> */}
            <button onClick={joinRoom}>Continue</button>
          </div>
        ) : (
          <Chat socket={socket} username={usernameChat} room={room} />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
