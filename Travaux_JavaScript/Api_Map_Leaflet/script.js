let cities;
let myMap;
let opacity = 1;
let goldIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-gold.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
let redIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-red.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
let violetIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-violet.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function geolocalisation(event)
{
    navigator.geolocation.getCurrentPosition(allow, reject);    
}

function lireFichier(event) {
    let reader = new FileReader();
    let fichier =  event.target.files[0];
    reader.readAsText(fichier);
    reader.addEventListener('load',function(e){ 
        ajouterMarqueur(JSON.parse(e.target.result));
    });
}

function ajouterMarqueurParAdresse(event){
    let xhr = new XMLHttpRequest();
    let street = document.getElementById('inputCity').value;
    if(street != "")
    {
        document.getElementById('inputCity').value = "";
        let adress = "https://nominatim.openstreetmap.org/?adressdetails=l&q="+street+"&format=json&limit=1";
        xhr.open('GET',adress, true);

        xhr.onreadystatechange = function ()
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200 || xhr.status == 0)
                {
                    data = JSON.parse(xhr.responseText);
                    let marker = L.marker([data[0].lat, data[0].lon],{icon:goldIcon}).addTo(myMap);
                    marker.bindPopup(data[0].display_name);
                }
            }
        }
        xhr.send();
    }
}

function ajouterMarqueur(cities){
    cities.villes.forEach(function(item){
        L.marker([item.lat, item.lon],{icon:redIcon}).addTo(myMap).bindPopup(item.nom);
    });
}

function dragover(event){
    event.preventDefault();
    (opacity > 0.5)?opacity=opacity-0.005:opacity=opacity;
    $('#dragAndDrop').css('opacity',opacity);
}

function dragout(event){
    opacity = 1;
    $('#dragAndDrop').css('opacity',opacity);
}

function drop(event){
    event.preventDefault();
    opacity = 1;
    $('#dragAndDrop').css('opacity',opacity);
    let files = event.dataTransfer.files;
    let reader = new FileReader();

    reader.onload = function(e2) {
        let data = JSON.parse(e2.target.result);
        data.villes.forEach(function(item){
        L.marker([item.lat, item.lon],{icon:violetIcon}).addTo(myMap).bindPopup(item.nom);
        });
    }
    reader.readAsText(files[0]);    
}

function allow(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;    

    console.log(lat + ", " + lon);
    L.marker([lat, lon],{icon:goldIcon}).addTo(myMap);

}
function reject(error) {
    let message = "";
    switch (error.code) {
        case 1:
            message = "Permission refusée";
            break;
        case 2:
            message = "Position non disponibe";
            break;
        case 3:
            message = "Dépassement de délai";
            break;
        case 4:
            message = "Erreur inconnue";
            break;
    }
    console.log(message);
}
function initMap() {
    // Creation de l'objet "myMap" et insertion dans l'element HTML qui a l'ID "map"
    myMap = L.map('map').setView([46, 2], 5);
    // Recuperation des cartes sur openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        {
            minZoom: 1,
            maxZoom: 20
        }).addTo(myMap);
    
}

$(document).ready(function () {
    if (typeof navigator.geolocation == 'undefined')
        alert("Géolocalisation non pris en charge");
    else {
        initMap();
    }

    $('#geolocation').on('click',geolocalisation);
    $('#loadFile').on('change',lireFichier); 
    $('#addCity').on('click',ajouterMarqueurParAdresse);
    $('#dragAndDrop').attr('ondragover','dragover(event)');
    $('#dragAndDrop').attr('ondrop','drop(event)');
    $('#dragAndDrop').on('dragleave',dragout);
});

