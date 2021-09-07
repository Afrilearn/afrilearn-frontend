import React, { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import socket from "../assets/js/socket";
import { useSelector } from "react-redux";

// const SERVER = "http://127.0.0.1:5000/";

const getUserResults = (u, rs) => {
  let r = 0;
  if (u.user && u.user._id) {
    r = rs.find((res) => res.userId === u.user._id)?.count;
  }
  return r;
};
export default function Chat(props) {
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [guestId, setGuestId] = useState("");
  const [results, setResults] = useState([]);

  console.log("results", results);

  // var socket = socketClient(SERVER);
  useEffect(() => {
    // socket.emit("joinRoom", { username: "usman", roomname: "room1" });
  }, []);

  socket.on("message", (data) => {
    setMessages([...messages, data]);
  });
  socket.on("connected_users", (data) => {
    setUsers([...data]);
  });
  socket.on("updateChallengeResults", (data) => {
    setResults([...results, data]);
  });
  let count = 0;

  return (
    <div>
      <div classname="chat-app">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 my-3">
              <div className="card">
                <div className="card-header">Join Room</div>
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      socket.emit("joinRoom", {
                        username,
                        roomname,
                        user: {
                          _id: user._id,
                          email: user.email,
                          fullName: user.fullName,
                        },
                      });
                    }}
                  >
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="form-control my-2"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      name="roomname"
                      id="roomname"
                      placeholder="Room Name"
                      className="form-control my-2"
                      onChange={(e) => setRoomname(e.target.value)}
                      required
                    />
                    <input type="submit" value="Join Room" />
                  </form>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      socket.emit("invite", {
                        guest: { _id: guestId },
                        host: user,
                      });
                    }}
                  >
                    <input
                      type="text"
                      name="guestId"
                      id="guestId"
                      placeholder="Guest"
                      className="form-control my-2"
                      onChange={(e) => setGuestId(e.target.value)}
                      required
                    />

                    <input type="submit" value="Invite" />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 my-3">
              <div className="card">
                <div className="card-header">Join Room</div>
                <div className="card-body">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      socket.emit("record_challenge_result", {
                        challengeId: roomname,
                        data: {
                          userId: user._id,
                          count: count + 1,
                        },
                      });
                    }}
                  >
                    Increase count
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-header">Users</div>
                <div className="card-body">
                  {users.map((userItem) => (
                    <p>
                      {userItem.username}{" "}
                      <span className="badge bg-primary">
                        {getUserResults(userItem, results)}
                      </span>{" "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card">
                <div className="card-header">Chats</div>
                <div className="card-body">
                  {messages.map((message) => (
                    <p>{message.text}</p>
                  ))}
                  <form
                    className="d-flex justify-content-center align-items-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      socket.emit("chat", text);
                      console.log("text", text);
                    }}
                  >
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder="Type a message.."
                      className="form-control w-100"
                      required
                      onChange={(e) => setText(e.target.value)}
                    />
                    <input type="submit" value="Send" className="btn" />
                  </form>
                </div>
                <h6></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
