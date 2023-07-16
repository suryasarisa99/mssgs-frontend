// import { io } from "socket.io-client";
// const socket = io("http://localhost:3001");
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";
export default () => {
  let { userData, socket, setUserData, mssgs, setMssgs, to } =
    useContext(DataContext);

  let navigate = useNavigate();
  // console.log(userData);
  useEffect(() => {
    if (!userData) navigate("/login");
  }, [userData]);

  const handleSendMssg = (e) => {
    e.preventDefault();
    let text = e.target.mssg.value;
    socket.emit("p-mssg", {
      mssg: e.target.mssg.value,
      from: userData._id,
      to,
    });
    setMssgs((prv) => {
      let y = { ...prv };
      if (!y?.[to]) y[to] = [];
      console.log("i: " + e.target.mssg.value);
      y?.[to].push({ from: "me", text: text });
      return y;
    });
    e.target.mssg.value = "";
  };
  // setMssgs([...mssgs, { from: "me", text: e.target.mssg.value, to }]);

  return (
    <div>
      {/* <p>To: {userData?._id}</p> */}
      {/* <p>To: {to}</p> */}
      <div className="chat-header">
        {" "}
        <FaChevronLeft onClick={() => navigate("/main ")} />{" "}
        <VscAccount className="profile-icon" /> {to}
      </div>
      <div className="messages">
        {mssgs?.[to]?.map((m, index) => {
          return (
            <div class={m.from == "me" ? "me message" : "incomming message"}>
              <div key={index}>{m.text}</div>

              {to == "global" && <p>{m.from}</p>}
            </div>
          );
        })}
      </div>
      <form action="" className="message-box" onSubmit={handleSendMssg}>
        <input
          name="mssg"
          placeholder="Enter Message"
          // aria-autocomplete="inline"
          autoComplete=""
        />
        <button>
          <MdSend />
        </button>
      </form>
    </div>
  );
};
