

const msgsData = [];

export const initialzeDb = () => {
  var request = window.indexedDB.open("chatroomMessages", 1);
  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains("messages")) {
      // if there's no "message" store
      var objectStore = db.createObjectStore("messages", { keyPath: "userId" });
      // create it
    }
  };
  return request, db;
};

const {request, db} = initialzeDb();

request.onerror = function (event) {
  console.log("error: ", request.error);
};

request.onsuccess = function (event) {
  db = request.result;
  console.log("success: " + db);
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
    alert("Unable to retrieve daa from database!");
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

export function readAll() {
  var objectStore = db.transaction("messages").objectStore("messages");

  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log(cursor);
      cursor.continue();
    } else {
      console.log("no entries");
    }
  };
}

export function addMessage(payload) {
  var request = db
    .transaction(["message"], "readwrite")
    .objectStore("message")
    .add(payload);

  request.onsuccess = function (event) {
    alert("message added");
  };

  request.onerror = function (event) {
    alert("Unable to add message");
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
