// import "./index.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
const socket = io("http://localhost:3001");

export default function App() {
  useEffect(() => {
    socket.on("message-sent", (message) => {
      console.log(message);
    });
    // socket.on("new-user-created",())
  }, [socket]);
  let [name, setName] = useState("");
  let [mssg, setMssg] = useState("");
  let [user, setUser] = useState("");
  let [toUser, setToUser] = useState("");
  return (
    <>
      {!user ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUser(name);
              socket.emit("new-user", name);
            }}
          >
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </form>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="mssg"
            value={mssg}
            onChange={(e) => {
              setMssg(e.target.value);
            }}
          />
          <button
            onClick={() => {
              socket.emit("message", { from: user, mssg: mssg });
            }}
          >
            click
          </button>
          <input value={toUser} onChange={(e) => setToUser(e.target.value)} />
          <button
            onClick={() => {
              socket.emit("p-message", { to: toUser, from: user, mssg: mssg });
            }}
          >
            Send to user
          </button>
          <h1 className="bg-red-500">Vite App</h1>
        </div>
      )}
    </>
  );
}
