import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";
import { selectMessages } from "./redux/app/appSlice";
import { selectUser } from "./redux/user/userSlice";
import { addMessage, initialzeDb } from "./services/chatRoomDB";
import { getItem } from "./services/jwt.service";

function App() {
  const userSession = useSelector(selectUser);
  const userData = JSON.parse(getItem("User Data"));
  const messages = useSelector(selectMessages);

  useEffect(()=>{
    initialzeDb();
    addMessage({
      userId: "d172dec5-7f55-436f-efbe-ba37d84ecb85",
      userMsg: "Hi",
      userName: "obed",
   })
  },[])

  return (
    <div className="App">
      {userSession && userData ? <ChatRoom messages={messages} /> : <Login />}
    </div>
  );
}

export default App;
