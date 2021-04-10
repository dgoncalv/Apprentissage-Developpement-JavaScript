let current_diapo;
let nb_diapo;
let duration;
let timer;

// show_diapo : prend un événement pouvant valoir :
// {type: "next"} par défaut
// {type: "previous"}
// {type: "image", pos: "x"} avec x étant l'identifiant de l'image souhaitée
function showDiapo(event = { type: "next" }) {
    clearTimeout(timer);
    nb_diapo = document.getElementsByTagName("img").length;
    if (event.type == "previous") {
        1
        current_diapo = (current_diapo - 1) % nb_diapo;
        if (current_diapo < 0) {
            current_diapo = nb_diapo - 1;
        }
    }
    else if (event.type == "next") {
        current_diapo = (current_diapo + 1) % nb_diapo;
    }
    else {
        current_diapo = event.pos;
    }

    // cache toutes les images sauf la courante en agissant sur le display
    let images = document.getElementById("diapo").getElementsByTagName("img");
    [...images].forEach(function (elem, position) {
        if (position !== current_diapo) {
            elem.style.display = "none";
        }
        else {
            elem.style.display = "";
        }
    })
    timer = setTimeout(function () { showDiapo({ type: "next" }) }, 2000);
}
    // création de la pagination avec les symboles previous, next et toutes les images + événéments
    // chacun des éléments de la pagination est mis dans un span (pour pouvoir gérer les événements)
    function createPagination() {
        let parent = document.getElementById("diapo");
        let pagination = document.createElement("div");
        nb_diapo = document.getElementsByTagName("img").length;
        parent.appendChild(pagination);
        pagination.innerHTML += "<span>&lt;</span> ";
        for (let i = 0; i < nb_diapo; i++) {
            pagination.innerHTML += "<span>" + (i + 1) + "</span> ";
        }
        pagination.innerHTML += "<span>&gt;</span>";

        pagination.addEventListener("click", function (event) {
            if (event.target.textContent == "<") {
                showDiapo({ "type": "previous" });
            }
            else if (event.target.textContent == ">") {
                showDiapo({ "type": "next" });
            }
            else if (Number.isInteger(parseInt(event.target.textContent))) {
                i = parseInt(event.target.textContent);
                showDiapo({"type": "image", pos: (i-1)});
            }
        })
    }

    $(document).ready(
        function () {
            // initialisation du diapo, de la pagination,
            let diapoElement = document.getElementById("diapo");
            current_diapo = 0;
            showDiapo();
            createPagination();
        }
    );