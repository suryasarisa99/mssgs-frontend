import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io(`${import.meta.env.VITE_SERVER}`);
const DataContext = createContext();
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default ({ children }) => {
  let [userData, setUserData] = useState(null);
  let [to, setTo] = useState(null);
  let [otherUsers, setOtherUsers] = useState([
    { _id: "global", fname: "Global", sname: "Chat" },
  ]);
  let [mssgs, setMssgs] = useState({ global: [] });
  // surya99: [{ text: "HI Hello" }]
  // let navigate = useNavigate();
  useEffect(() => {
    // socket.on('join',(id))
    // Get Private Message

    console.log("hello");
    socket.on("p-mssg", (data) => {
      console.log(data);
      setMssgs((prv) => {
        let y = { ...prv };
        console.log(data.to);
        if (data.to === "global") {
          // for Global Users
          y?.[data.to].push({ from: data.from, text: data.mssg });
        } else if (y?.[data.from])
          // For Other Users
          y?.[data.from].push({ from: data.from, text: data.mssg });
        else y[data.from] = [{ from: data.from, text: data.mssg }];
        console.log(y);
        return y;
      });
      console.log(mssgs);
    });
  }, [socket]);

  useEffect(() => {
    // socket.emit("get",userData(if))
    axios
      .get(`${import.meta.env.VITE_SERVER}/`, { withCredentials: true })
      // .get(`http://localhost:3001/`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data?.mssg === "notLogined") {
          // setUserData(null);
        } else if (res.data?.mssg === "noUserFound") {
          // setUserData(null);
        } else if (typeof res.data === "object") {
          console.log("LOGined");
          // navigate("/mssg");
          setUserData(res.data.me);
          socket.emit("join", res.data.me._id);
          setOtherUsers((prv) => [...prv, ...res.data.users]);
        }
      });
  }, []);
  let value = {
    setUserData,
    userData,
    socket,
    mssgs,
    setMssgs,
    setOtherUsers,
    otherUsers,
    setTo,
    to,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext };
