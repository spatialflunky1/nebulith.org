window.onload = function() {
    // Get breadcrumb element
    var breadcrumb_element = document.getElementById("breadcrumb").children[0];

    // Compute current breadcrumb
    var breadcrumb = "/Home";
    var url = new URL(document.URL);
    // Add to the breadcrumb excluding the origin slash on home
    if (url.pathname.length != 1) {
        breadcrumb += url.pathname;
    }

    // Set value of breadcrumb to breadcrumb element
    breadcrumb_element.textContent = breadcrumb;
};
