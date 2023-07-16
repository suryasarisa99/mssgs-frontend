import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import axios from "axios";

import Signup from "./pages/Signup";
import Sigin from "./pages/Sigin";
import Message from "./pages/Message";
import ChatList from "./pages/ChatList";
import "./index.css";
export default () => {
  let navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Sigin />} />
        <Route path="/main" element={<ChatList />} />
        <Route path="/mssg" element={<Message />} />
      </Routes>
    </div>
  );
};
