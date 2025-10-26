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

window.onload = function() {
    //
    // Set breadcrumb
    //

    // Get breadcrumb element
    var breadcrumb_element = document.getElementById("breadcrumb").children[0];

    // Get URL path (crumbs)
    var url = new URL(document.URL);
    var paths = url.pathname.split("/")
    // Add to the breadcrumb excluding the origin slash on home
    if (paths.length > 1 && paths[1] != "") {
        // Compute current breadcrumb
        var breadcrumb = '<a class="crumb" href="/">Home</a>';
        var pathbuild = document.location.origin;
        for (const [index,path] of paths.entries()) {
            if (path == "") continue;
            else {
                pathbuild += '/' + path;
                if (index == paths.length-1) {
                    breadcrumb += '/<a class="crumb" id="crumb_none">'+path+'</a>';
                }
                else {
                    breadcrumb += '/<a class="crumb" href="'+pathbuild+'">'+path+'</a>';
                }
            }
        }

        // Set value of breadcrumb to breadcrumb element
        breadcrumb_element.innerHTML = breadcrumb;
    }
    fix_footer_position();
};

window.onresize = function() {
    fix_footer_position();
};
