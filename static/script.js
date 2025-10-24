window.onload = function() {
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
};
