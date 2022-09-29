import React, { useEffect, useRef, useState } from "react";
import "./chatroom.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
  MDBBtn,
} from "mdb-react-ui-kit";
import ChatReceive from "../../components/ChatReceive";
import ChatSend from "../../components/ChatSend";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/user/userSlice";
import { addMessage } from "../../redux/app/appSlice";
import { getItem } from "../../services/jwt.service";
import swal from "sweetalert";

function ChatRoom({ messages }) {
  const dispatch = useDispatch();

  const [newMessageList, setNewMessageList] = useState([]);
  const getUserId = JSON.parse(getItem("User Data"));
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const msgRef = useRef();

  const resetMessages = () => {
    setNewMessageList([...messages])
  }

  useEffect(()=>{
    resetMessages();
  },[messages])

  useEffect(()=>{
    window.addEventListener('storage', ()=>{
      resetMessages();
      console.log("messages=",messages)
    })
  },[])

  const handleMsgSend = (event) => {
    event.preventDefault();
    const userMsg = {
      userId: getUserId?.userId,
      userMsg: msgRef?.current?.value,
      userName: getUserId?.username,
    };
    let action = dispatch(addMessage(userMsg));
    //actions after msg is sent
    if (action) {
      //dispatch event that new item has been added to storage
      window.dispatchEvent(new Event("storage"));
      //scroll to latest text
      var element = document.getElementById("chat-body");
      function scrollToBottom(element) {
        element.scroll({ top: element.scrollHeight, behavior: "smooth" });
      }
      scrollToBottom(element);
      //clean up send message input field
      document.getElementById("msgForm").reset();
    }
  };

  const truncateText = (strn, len) => {
    const string = strn?.slice(0, len).concat("...");
    return string;
  };



  return (
    <>
      <MDBContainer className="py-3">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="8" lg="6" xl="4">
            <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
              <MDBCardHeader
                className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <MDBBtn
                  rounded
                  onClick={() => {
                    handleLogout();
                  }}
                  type="buttton"
                  className="mx-2"
                  color="danger"
                >
                  Logout
                </MDBBtn>
                <p className="mb-0 fw-bold">
                  Live chat : {truncateText(getUserId?.username, 10)}{" "}
                </p>
              </MDBCardHeader>

              <MDBCardBody>
                <div className="chatBody" id="chat-body">
                  {newMessageList.map((msg, idx) => {
                    if (msg.userId === getUserId?.userId) {
                      return (
                        <ChatSend msg={msg.userMsg} username={msg?.userName} />
                      );
                    } else {
                      return (
                        <ChatReceive
                          msg={msg.userMsg}
                          username={msg?.userName}
                        />
                      );
                    }
                  })}
                </div>

                <form id="msgForm" onSubmit={handleMsgSend}>
                  <div className=" mb-4">
                    <input
                      ref={msgRef}
                      type="text"
                      id="form3Example3"
                      className="form-control form-control-lg form-outline"
                      placeholder="Enter Message"
                      required
                    />
                  </div>

                  <MDBBtn type="submit" className="w-100 mt-1" color="primary">
                    Send
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default React.memo(ChatRoom);
