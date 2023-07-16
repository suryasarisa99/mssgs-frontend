import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";
export default () => {
  let navigate = useNavigate();
  let { setUserData, userData, setOtherUsers, otherUsers } =
    useContext(DataContext);
  useEffect(() => {
    if (userData) {
      console.log("user Data found");
      navigate("/main");
    } else console.log("No user Data");
  }, [userData]);

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/login`,
        {
          id: e.target.id.value,
          password: e.target.password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data?.mssg === "incorrectPassword") {
        } else if (res.data?.mssg === "noUserFound") {
        } else if (typeof res.data === "object") {
          navigate("/main");
          setUserData(res.data.me);
          let y = [...otherUsers, ...res.data.users];
          console.log(y);

          setOtherUsers(y);
        }
      });
  };
  return (
    <div>
      <form className="signin" onSubmit={handleSignIn}>
        <h1 className="signin">Sigin</h1>
        <input name="id" placeholder="User Name" />
        <input name="password" type="password" placeholder="password" />
        <button>SignIn</button>
      </form>
      <p className="sm-txt">
        Create Account ? <Link to="/">signup</Link>
      </p>
    </div>
  );
};
