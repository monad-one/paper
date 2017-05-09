onmessage = function(message) {

    http("https://jsonplaceholder.typicode.com/posts/1/comments");

    function http(url) {
        var url = "https://jsonplaceholder.typicode.com/posts/1/comments";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';

        xhr.onload = function(e) {
            postMessage(applyTransform(this.responseText));
            close();
        };

        xhr.send();
    }

    function applyTransform(result) {
        return JSON.parse(result);
    }
}