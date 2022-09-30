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
import { getItem } from "../../services/jwt.service";
import { addMessage } from "../../redux/app/appSlice";

const testDat = [
  //change ids to test for senders and receivers chat bubble
  {
    userId: "11049f5e-60d1-4b14-e5d5-619e9f7848d9",
    userMsg: "asd",
    userName: "abei",
  },
  {
    userId: "3388f2e6-7a31-4e2sd-7e80-09e8aedac1d9",
    userMsg: "asd",
    userName: "abei",
  },
  {
    userId: "3388f2e6-7a31-4ed2d-7e80-09e8aedac1d9",
    userMsg: "asd",
    userName: "abei",
  },
];

function ChatRoom({ messages }) {
  const msgRef = useRef();

  setTimeout(function () {
    window.location.reload(1);
  }, 5000);

  const dispatch = useDispatch();
  var element = document.getElementById("chat-body");
  const [newMessageList, setNewMessageList] = useState([]);
  const getUserId = JSON.parse(getItem("User Data"));
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const resetMessages = () => {
    setNewMessageList([...messages]);
  };

  useEffect(() => {
    resetMessages();
    console.log("new message added =", messages);
    var element = document.getElementById("chat-body");
    element.scrollTo(0, 9000);
  }, [messages]);

  const handleMsgSend = (event) => {
    window.dispatchEvent(new Event("storage"));
    event.preventDefault();
    function scrollToBottom(element) {
      element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    }
    scrollToBottom(element);
    const userMsg = {
      userId: getUserId?.userId,
      userMsg: msgRef?.current?.value,
      userName: getUserId?.username,
    };
    let action = dispatch(addMessage(userMsg));
    if (action) {
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
                        <ChatSend
                          key={idx}
                          msg={msg.userMsg}
                          username={msg?.userName}
                        />
                      );
                    } else {
                      return (
                        <ChatReceive
                          key={idx}
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
