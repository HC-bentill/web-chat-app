const msgsData = [];
var db;

export const initialzeDb = () => {
  var request = window.indexedDB.open("chatroomMessages", 1);
  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains("messages")) {
      // if there's no "message" store
      var objectStore = db.createObjectStore("messages", {
        autoIncrement: true,
      });
      // create it
    }
  };
  return request;
};

const request = initialzeDb();

request.onerror = function (event) {
  console.log("error initiating IDB: ", request.error);
};

request.onsuccess = function (event) {
  db = request.result;
  console.log("success: IDB initiated");
};

//   for (var i in msgsData) {
//     objectStore.add(msgsData[i]);
//   }
// };

export function read() {
  var transaction = db.transaction(["messages"]);
  var objectStore = transaction.objectStore("messages");
  var request = objectStore.get("1fee3a92-84f9-4b08-3ff5-5e4fb1330ca0");

  request.onerror = function (event) {
    alert("Unable to retrieve data from database!");
  };

  request.onsuccess = function (event) {
    // Do something with the request.result!
    if (request.result) {
      console.log(request.result);
    } else {
      console.log(request.error);
    }
  };
}

// export function readAllMessages() {
//   let results = {data:[]};
//   function outputResults(data){
//     // console.log("all message", data)
//     results.data = [...results.data, data];
//   }

//   function query(db, myCallbackFunction) {
//     const tx = db.transaction("messages");
//     const store = tx.objectStore("messages");
//     const request = store.getAll();

//     request.onsuccess = (event) => {
//       const data = event.target.result;
//       myCallbackFunction(data);
//     };
//   }

//   // Open the database and then run the query
//   var openRequest = indexedDB.open("chatroomMessages");
//   openRequest.onsuccess = (event) => {
//     query(db, (data = []) => {
//       // This gets called when the query has run with the loaded
//        outputResults(data);
//     });
//   };

//   return results
// }

export function readAllMessages() {
  function query(db, myCallbackFunction) {
    const tx = db.transaction("messages");
    const store = tx.objectStore("messages");
    const request = store.getAll();

    request.onsuccess = (event) => {
      const data = event.target.result;
      myCallbackFunction(data);
    };
  }

  // Open the database and then run the query
  var openRequest = indexedDB.open("chatroomMessages");
  openRequest.onsuccess = (event) => {
    query(db, (data = []) => {
      // This gets called when the query has run with the loaded
      localStorage.setItem("results", JSON.stringify(data));
    });
  };
}

export function addMessage(payload) {
  var request = db
    .transaction(["messages"], "readwrite")
    .objectStore("messages")
    .add(payload);

  request.onsuccess = function (event) {
    console.log("message added");
    window.dispatchEvent(new Event("storage"));
  };

  request.onerror = function (event) {
    alert("Unable to add message");
    console.log("unable to add msg", request.error);
  };
}

export function remove() {
  var request = db
    .transaction(["message"], "readwrite")
    .objectStore("d172dec5-7f55-436f-efbe-ba37d84ecb85")
    .delete("00-03");

  request.onsuccess = function (event) {
    alert("Kenny's entry has been removed from your database.");
  };
}
