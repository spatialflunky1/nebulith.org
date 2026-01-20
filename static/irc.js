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
