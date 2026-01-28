///
/// Functions
///

/**
 * recieve_message()
 * @param msg - the message recieved from the server
 * @param username - the username that is sent from flask on page load
 *
 * Takes the message recieved from the server, 
 * formats the string with the username, 
 * and adds it to the IRC message box on the page.
 */
function recieve_message(msg, username) {
    // Create message structure
    var message_box = document.getElementById("messages");
    var new_message_item = document.createElement("li");
    var new_message = document.createElement("p");

    // Set attribute to correct stylization
    new_message_item.setAttribute("class", "message");
    new_message.setAttribute("class", "message_text");

    // Set text and parent-child element linkage
    if (username != null) {
        new_message.appendChild(document.createTextNode("> (" + username + ") " + msg));
    }
    else {
        new_message.appendChild(document.createTextNode("> " + msg));
    }
    new_message_item.appendChild(new_message);
    message_box.appendChild(new_message_item);
}

/**
 * send_message()
 * @param msg - the message to send to the server
 * @return success - boolean representation of whether or not the message was sent to the server
 *
 * Packs the message in a list and sends the data to the server.
 */
function send_message(msg, socket) {
    message = msg.trim();
    if (check_input(message) != true) {
        return false
    }
    // First index of the array needs to be the page name for the server
    socket.send(["irc", message]);
    return true;
}

/**
 * check_input()
 * @param message - the message recieved from the client textbox
 * @return success - boolean representation of input message validity
 *
 * precondition: the message should = message.trim() prior to calling
 *
 * Checks if the input message passes a list of checks.
 */
function check_input(msg) {
    if (msg == "") {
        return false;
    }
    return true;
}


///
/// Entry Point
///

$(document).ready(function() {
    //
    // Connect to server
    //
    var socket = io.connect(document.location.origin, {"page": "irc"});

    //
    // Set event binding on receiving message from server
    //
    socket.on("message", function(message) {
        recieve_message(message[0], message[1]);
    });
    socket.on("acknowledge", function() {
        $("#new_message").val("");
    });
    socket.on("new_connection", function(username) {
        recieve_message(username + " has connected", null);
    });

    //
    // Bind enter key in message textbox to send a message
    //
    $("#new_message").bind("enterKey", function(e) {
        // Get message from text box and send it to the server
        var message = $("#new_message").val();
        send_message(message, socket);
    });
    $("#new_message").keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
