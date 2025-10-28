function fix_footer_position() {
    //
    // Fix footer position
    //

    // Get innner body div
    var body_div = document.getElementById("body");

    // Check if content extends into footer
    //     True when body div height > (document height - navibar height - footer height)
    // If so, disable absolute positioning of footer and let the browser push it to the bottom
    var navibar = document.getElementById("navibar");
    var footer = document.getElementById("footer");
    if (body_div.offsetHeight > (window.innerHeight - navibar.offsetHeight - footer.offsetHeight)) {
        footer.style.position = "static";
        // Set the margin to be acceptable with this positioning
        body_div.style.marginBottom = "16px";
    }
    // This function goes both ways so it should set it back otherwise
    else {
        footer.style.position = "absolute";
        // Set the margin to be acceptable with this positioning
        body_div.style.marginBottom = "141px";
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Array
// [path,size,resolution,date,location,takenby,descshort,desclong]
function setImage(image_details) {
    var imageElem = document.getElementById("image");
    var imageNameCol = document.getElementById("image_name");
    var imageSizeCol = document.getElementById("image_size");
    var imageResCol = document.getElementById("image_resolution");
    var imageDateCol = document.getElementById("image_date");
    var imageLocCol = document.getElementById("image_location");
    var imageTakenbyCol = document.getElementById("image_takenby");
    var imageDescription = document.getElementById("image_description");

    imageElem.src = "/static/Photos/"+image_details[0];
    imageElem.alt = image_details[6];
    imageNameCol.textContent = image_details[0];
    imageSizeCol.textContent = image_details[1];
    imageResCol.textContent = image_details[2];
    imageDateCol.textContent = image_details[3];
    imageLocCol.textContent = image_details[4];
    imageTakenbyCol.textContent = image_details[5];
    imageDescription.textContent = image_details[7];
}

function loadImage() {
    var socket = io.connect(document.location.origin);
    socket.on('connect', function() {
        var image = getParameterByName("image");
        socket.send(['image', image]);
    });
    socket.on('message', function(image_details) {
        setImage(image_details);
        socket.disconnect();
    });
}

$(document).ready(function() {
    $("#image").on("load", function() {
        console.log("here");
        fix_footer_position();
    });
    loadImage();
});
