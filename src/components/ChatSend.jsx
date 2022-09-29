import React from "react";

function ChatSend({ msg, username }) {
  const getFirstLetter = (params) => {
    let str = params;
    return str?.toUpperCase().charAt(0);
  };


  const avatarBG = {
    backgroundColor: "#39c0ed",
    borderRadius: "100%",
    height: "40px",
    display: "grid",
    width: "40px",
    placeItems: "center",
    fontWeight: "bold",
    color:"black"
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-4">
        <div
          className="p-3 me-3 border"
          style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
        >
          <p className="small mb-0">{msg}</p>
        </div>
        <div className="userAvatar" style={avatarBG}>
          {getFirstLetter(username)}
        </div>
      </div>
    </>
  );
}

export default React.memo(ChatSend);
