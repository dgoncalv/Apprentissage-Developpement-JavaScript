function afficherPosition(event) {
    document.getElementById('x').innerHTML = "x = " + event.x;
    document.getElementById('y').innerHTML = "y = " + event.y;
}
function transformInInput(event) {
    if (event.type == 'click') {
        let input = document.createElement('input');
        input.value = this.innerHTML;
        this.parentElement.replaceChild(input, this);
        input.setAttribute('id', this.id);
        input.addEventListener("mouseout", transformInInput);
    }
    else
        if (event.type == 'mouseout') {
            let paragraphe = document.createElement('p');
            paragraphe.innerHTML = this.value;
            this.parentElement.replaceChild(paragraphe, this);
            paragraphe.setAttribute('id', this.id);
            paragraphe.addEventListener("click", transformInInput);
        }
}
Element.prototype.hide = function () {
    this.style.display = 'none';
    // this.style.visibility = 'hidden';
}
Element.prototype.show = function () {
    this.style.display = '';
}
Element.prototype.hideAndShow = function (duree) {
    this.hide();
    let x = this;
    setTimeout(function () { x.show(); }, duree);
}

Element.prototype.toggle = function (duree) {
    let x = this;
    setInterval(function () { x.hide() }, 2 * duree);
    setTimeout(function () { setInterval(function () { x.show() }, 2 * duree) }, duree);
}

Element.prototype.heure = function () {
    let x = this;
    let h = function () {
        let d = new Date();
        x.innerHTML = d.toLocaleTimeString();
    };
    let intervalle = setInterval(h, 1000);
    h();
    return intervalle;
}
let inter
function afficherHeure(event) {
    if (this.innerHTML == "Stop") {
        clearInterval(inter);
        this.innerHTML = "Quelle heure est-il?";
    }
    else {
        inter = document.getElementById("heure").heure();
        this.innerHTML = "Stop";
    }

}

$(document).ready(
    function () {
        document.getElementById('z').addEventListener("mousemove", afficherPosition);
        document.getElementById('z').addEventListener("click", transformInInput);
        //document.getElementById('boutonHeure').hideAndShow(2000);
        //document.getElementById('boutonHeure').toggle(2000);
        document.getElementById('boutonHeure').addEventListener("click", afficherHeure);
    }
);
