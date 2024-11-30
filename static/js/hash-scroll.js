document.querySelectorAll("div.widget-body ol.toc a").forEach(el => {
    if (el.host == window.location.host) {
        if (el.hash !== "") {
            el.onclick = function(event) {
                // event.preventDefault();
                document.querySelector(decodeURI(el.hash)).scrollIntoView()
            }
        }
    }
});