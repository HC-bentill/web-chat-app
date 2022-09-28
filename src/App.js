import { useSelector } from "react-redux";
import "./App.css";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";
import { selectUser } from "./redux/user/userSlice";

function App() {
  const user = useSelector(selectUser);

  return <div className="App">{user ? <ChatRoom /> : <Login />}</div>;
}

export default App;
