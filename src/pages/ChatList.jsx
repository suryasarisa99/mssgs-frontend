import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { FaChevronLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-toastify";
export default () => {
  let navigate = useNavigate();
  let { otherUsers, to, setTo, socket, userData, setUserData, setOtherUsers } =
    useContext(DataContext);

  useEffect(() => {
    setTo("");
    // toast.success("Success!", {
    //   position: toast.POSITION.TOP_RIGHT, // Change the notification position
    //   autoClose: 2000, // Automatically close the notification after 2 seconds
    // });

    if ("Notification" in window) {
      // Check if the browser supports notifications
      if (Notification.permission === "granted") {
        // Permission has already been granted, create and display the notification
        new Notification("Notification Title", {
          body: "Notification Message",
          // Other options like icon, badge, etc. can be specified here
        });
      } else if (Notification.permission !== "denied") {
        // Permission has not been granted or denied yet, request permission from the user
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // Permission has been granted, create and display the notification
            new Notification("Notification Title", {
              body: "Notification Message",
              // Other options like icon, badge, etc. can be specified here
            });
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!userData) navigate("/login");
  }, [userData]);

  return (
    <div className="chat-list">
      {otherUsers?.map((user) => {
        return (
          <div
            key={user?._id}
            onClick={() => {
              setTo(user?._id);
              navigate("/mssg");
            }}
            className="chat-list-item"
          >
            {/* <CgProfile className="profile-icon icon" /> */}
            <VscAccount className="profile-icon icon" />
            {/* {user?._id} */}
            {user?.fname} {user?.sname}
          </div>
        );
      })}
      <div className="other-btns">
        <button onClick={() => socket.emit("active", userData._id)}>
          Active
        </button>
        <button
          onClick={(e) => {
            axios
              .get(`${import.meta.env.VITE_SERVER}/logout`, {
                withCredentials: true,
              })
              .then((res) => console.log(res.data));
            setUserData(null);
            setOtherUsers([{ _id: "global", fname: "Global", sname: "Chat" }]);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
