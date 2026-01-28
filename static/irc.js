/**
 * recieve_message()
 * @param msg - the message recieved from the server
 * @param username - the username that is sent from flask on page load
 *
 * Takes the message recieved from the server, 
 * formats the string with the username, 
 * and adds it to the IRC message box on the page
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
    new_message.appendChild(document.createTextNode("> (" + username + ") " + msg));
    new_message_item.appendChild(new_message);
    message_box.appendChild(new_message_item);
}

/**
 * check_input()
 * @param message - the message recieved from the client textbox
 *
 * precondition: the message should = message.trim() prior to calling
 */
function check_input(message) {
    if (message == "") {
        return false;
    }
    return true;
}

$(document).ready(function() {
    $("#new_message").bind("enterKey", function(e) {
        // Get message from text box and input check it
        var message = $("#new_message").val();
        message = message.trim();
        if (check_input(message)) {
            recieve_message(message, username);
            $("#new_message").val("");
        }
    });
    $("#new_message").keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
