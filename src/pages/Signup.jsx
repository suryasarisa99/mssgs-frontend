import axios from "axios";
import { useEffect, useState, useContext, useReducer } from "react";
import { io } from "socket.io-client";
const socket = io(`${import.meta.env.VITE_SERVER}`);
import { DataContext } from "../../Context/DataContext";
import { useNavigate, Link } from "react-router-dom";

const reducer = (errors, action) => {
  // errors[action.type] = action.value;
  return { ...errors, [action.type]: action.value };
};

export default () => {
  let { userData } = useContext(DataContext);
  let [errors, dispatch] = useReducer(reducer, {
    fnameReq: false,
    usernameReq: false,
    userInvalid: false,
    passLen: false,
  });
  const navigate = useNavigate();
  let [pass, setPass] = useState("");
  let [fname, setFname] = useState("");
  let [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("signup", (data) => {
      if (data === "userFound") dispatch({ type: "userInvalid", value: true });
      else if (data === "successful") navigate("/login");
    });
  }, [socket]);
  useEffect(() => {
    if (userData) {
      console.log("user Data found");
      navigate("/main");
    } else console.log("No user Data");
  }, [userData]);

  useEffect(() => {
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
            new Notification("Surya Hello", {
              body: "Notification Message",
              // Other options like icon, badge, etc. can be specified here
            });
          }
        });
      }
    }

    new Notification("Surya Hello", {
      body: "Notification Message",
      // Other options like icon, badge, etc. can be specified here
    });
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (fname.trim().length < 1) dispatch({ type: "fnameReq", value: true });
    if (userName.trim().length < 1)
      dispatch({ type: "usernameReq", value: true });
    if (pass.trim().length < 3) dispatch({ type: "passLen", value: true });

    // console.log(Object.entries(errors));
    let noError = true;
    for (let error in errors) {
      if (errors[error] === true) {
        console.log(`${error}: ${errors[error]}`);
        noError = false;
        break;
      }
    }
    console.log(`noError: ${noError}`);
    if (noError) {
      console.log("no Error");
      socket.emit("signup", {
        id: e.target.id.value,
        fname: e.target.fname.value,
        sname: e.target.sname.value,
        password: e.target.password.value,
      });
    }
  };
  return (
    <form className="signup" onSubmit={handleSignUp}>
      <h1 className="signup">Create Account</h1>
      <div className="field">
        <input
          name="fname"
          placeholder="First Name"
          value={fname}
          onChange={(e) => {
            setFname(e.target.value);
            if (errors.fnameReq && e.target.value.length >= 1)
              dispatch({ type: "fnameReq", value: false });
          }}
        />
        {errors.fnameReq && <Error>First Name Cant't be Empty</Error>}
      </div>

      <input name="sname" placeholder="Last Name" />

      <div className="field">
        <input
          name="id"
          placeholder="username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (errors.usernameReq && e.target.value.length >= 1)
              dispatch({ type: "usernameReq", value: false });
            if (errors.userInvalid)
              dispatch({ type: "userInvalid", value: false });
          }}
        />
        {errors.usernameReq && <Error>User Name can't be Empty</Error>}
        {errors.userInvalid && <Error>The User Name is Alrady Taken</Error>}
      </div>

      <div className="field">
        <input
          name="password"
          placeholder="password"
          value={pass}
          onChange={(e) => {
            if (errors.passLen && e.target.value.length >= 3)
              dispatch({ type: "passLen", value: false });
            setPass(e.target.value);
          }}
        />
        {errors.passLen && <Error>Password is Minium 3 characters</Error>}
      </div>

      <button>Signup</button>
      <p className="sm-txt">
        Already have a account? <Link to="/login">signin</Link>
      </p>
    </form>
  );
};

function Error({ children }) {
  return <di className="error">{children}</di>;
}
