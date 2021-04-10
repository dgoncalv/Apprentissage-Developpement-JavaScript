function recupererReponseXMLHttpRequest() {
    let query = $("input").val();
    if (query.trim() != "") {
        let url = "http://www.omdbapi.com/?i=tt3896198&apikey=7ca946c9&t=" + query;
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                afficherResultat(JSON.parse(xhr.responseText));
            }

        };
        xhr.send();
    }
    else {
        console.log("else");
        afficherResultat("");
    }
}

// créer la liste
function afficherResultat(data) {
    console.log(data);

    let result = "";
    let poster = "";

    if (typeof data != "string") {
        result = "<li>" + data.Title + "</li>";
        result += "<li>" + data.Year + "</li>";
        result += "<li>" + data.Director + "</li>";
        result += "<li>" + data.Genre + "</li>";

        poster = data.Poster;

        $("img").attr("src", poster);
        $("ul").html(result);
    }
}

$(document).ready(
    function () {
        $("h1").after('Film: <input onkeypress="recupererReponseXMLHttpRequest()" style="margin:15px">');
        $("input").after('</br>');
        $("img").after('</br>');
    }
);