"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

var connectionClock = new signalR.HubConnectionBuilder().withUrl("/hubs/clock").build();

connectionClock.on("ShowTime", function (curenttime) {
    //var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = curenttime;
    //console.log(curenttime);
    document.getElementById("timeId").textContent = encodedMsg;
});

connectionClock.start().then(function () {
    ;
}).catch(function (err) {
    return console.error(err.toString());
});
