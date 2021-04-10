function afficherActu() {
    let xhr = new XMLHttpRequest();
    let contenu;
    // Fonction de callback
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState, xhr.status,
            xhr.response);
    }; 
    xhr.open('GET', 'https://www.univ-larochelle.fr/actualites/lequipe-newseye-du-l3i-grande-gagnante-de-la-competition-clef-hipe-2020/', true);
    xhr.send();
    xhr.onload = function () {
        $('#actu').html(xhr.response);
    }
}

$(document).ready(
    function()
    {
        $('#bouton').on('click',afficherActu);
    }
);