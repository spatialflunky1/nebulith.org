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

$(document).ready(function() {
    $("#new_message").bind("enterKey", function(e) {
        // TODO: input checking and sending to server
        recieve_message($("#new_message").val(), username);
        $("#new_message").val("");
    });
    $("#new_message").keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
