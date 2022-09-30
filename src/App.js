import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";
import { selectMessages } from "./redux/app/appSlice";
import { selectUser } from "./redux/user/userSlice";
// import { initialzeDb, readAllMessages } from "./services/chatRoomDB.service";
import { getItem } from "./services/jwt.service";

function App() {
  const userSession = useSelector(selectUser);
  const userData = JSON.parse(getItem("User Data"));
  const [messages, setMessages] = useState([]);
  const reduxStoredMessages = useSelector(selectMessages)

  useEffect(() => {
    setMessages([...reduxStoredMessages]);
  }, [reduxStoredMessages]);

  window.addEventListener("storage", () => {
    setMessages([...reduxStoredMessages]);
  });


  return (
    <div className="App">
      {userSession && userData ? <ChatRoom messages={messages} /> : <Login />}
    </div>
  );
}

export default App;
