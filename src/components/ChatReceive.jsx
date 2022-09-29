import React from "react";

function ChatReceive({msg, username}) {
  const getFirstLetter = (params) => {
    let str = params;
    return str?.toUpperCase().charAt(0);
  };

  var randomColor = "#" + Math.floor(Math.random() * 19777215).toString(16);
  

  const avatarBG = {
    backgroundColor: randomColor,
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
      <div className="d-flex flex-row justify-content-start mb-4">
      <div className="userAvatar" style={avatarBG}>
          {getFirstLetter(username)}
        </div>
        <div
          className="p-3 ms-3"
          style={{
            borderRadius: "15px",
            backgroundColor: "rgba(57, 192, 237,.2)",
          }}
        >
          <p className="small mb-0">
            {msg}
          </p>
        </div>
      </div>
    </>
  );
}

export default React.memo(ChatReceive);
