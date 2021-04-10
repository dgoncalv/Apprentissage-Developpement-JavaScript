Element.prototype.insertAfter = function(nouvelle_balise, balise_reference){
    this.insertBefore(nouvelle_balise, balise_reference.nextSibling);
}
Element.prototype.replaceChild = function(ancienne, nouvelle){
    this.insertBefore(nouvelle, ancienne);
    this.removeChild(ancienne);
}
Element.prototype.hide = function(){
    this.style.display = 'none';
    // this.style.visibility = 'hidden';
}
Element.prototype.show = function(){
    this.style.display = '';
}
DOMTokenList.prototype.contains = function(classe){
    for(let i=0;i>this.length;i++)
    {
        if(this[i] == classe)
        {
        return true;
        }
    }
    return false;
}
$(document).ready(
        function()
    {
        console.log(document.getElementById('description').innerHTML);
        console.log(document.getElementsByTagName('li')[1].innerHTML);
        console.log(document.getElementById('info').firstElementChild);
        console.log(document.getElementById('wiki').href);
        let balise_h1 = document.getElementsByTagName('h1')[0];
        console.log(balise_h1.nextElementSibling);
        let balise_a = document.getElementsByTagName('a')[0];
        console.log(balise_a.parentElement.nextElementSibling.nextElementSibling.lastElementChild);
        let nouvelle_balise = document.createElement('h2');
        nouvelle_balise.innerHTML = "un texte";
        document.body.insertAfter(nouvelle_balise, balise_h1);
        document.body.replaceChild(balise_h1, nouvelle_balise);
        document.getElementById('description').hide();
        document.getElementById('description').show();
        document.body.classe.contains("test");
    }
);