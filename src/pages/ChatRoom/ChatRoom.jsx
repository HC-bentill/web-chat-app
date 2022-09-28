import React, { useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/user/userSlice";
import { addMessage, selectMessages } from "../../redux/app/appSlice";
import { getItem } from "../../services/jwt.service";

export default function ChatRoom() {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const getUserId = JSON.parse(getItem("User Data"));
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const msgRef = useRef();

  const handleMsgSend = (event) => {
    event.preventDefault();

    const userMsg = {
      userId: getUserId?.userId,
      userMsg: msgRef?.current?.value,
    };

    //actions after msg is sent
    if (dispatch(addMessage(userMsg))) {
      document.getElementById("msgForm").reset();
      var element = document.getElementById('chat-body');
      function scrollToBottom(element) {
        element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
      }

      scrollToBottom(element)
    }
  };

  const truncateText = (strn, len) => {
    const string = strn.slice(0, len).concat("...");
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
                  {messages.map((msg, idx) => {
                    if (msg.userId === getUserId?.userId) {
                     return <ChatSend msg={msg.userMsg} />;
                    } else {
                     return <ChatReceive msg={msg.userMsg} />;
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
