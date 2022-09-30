import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";
import { selectUser } from "./redux/user/userSlice";
import { initialzeDb, readAllMessages } from "./services/chatRoomDB.service";
import { getItem } from "./services/jwt.service";

function App() {
  const userSession = useSelector(selectUser);
  const userData = JSON.parse(getItem("User Data"));
  const [messages, setMessages] = useState([]);
  const getMsgsFromLocalStore = JSON.parse(localStorage.getItem('results'));

  // console.log("getMsgsFromLocalStore-", getMsgsFromLocalStore)

  useEffect(() => {
    initialzeDb();
    readAllMessages();
  }, []);


  return (
    <div className="App">
      {userSession && userData ? <ChatRoom messages={getMsgsFromLocalStore} /> : <Login />}
    </div>
  );
}

export default App;
