/** Ajoutez vos classes ici **/
class Entreprise {
    _nom;
    _capital;
    _colaborateurs;
    _directeur;
    constructor(nom, capital) {
        this._nom = nom;
        this._capital = capital;
        this._colaborateurs = [];
        this._directeur = null;
    }
    changementDirection(directeur) {
        if (directeur instanceof Directeur)
            this._directeur = directeur;
        else
            throw new TypeError("Cast from " + directeur + " to Directeur is impossible.");
    }
    getCapital() {
        return this._capital;
    }
    getColaborateurs() {
        return this._colaborateurs;
    }
    getDirecteur() {
        return this._directeur;
    }
    getNbEmployes() {
        return this._colaborateurs.length;
    }
    getNom() {
        return this._nom;
    }
    recrute(employe) {
        if (employe instanceof Employe)
            this._colaborateurs[this._colaborateurs.length] = employe;
        else
            throw new TypeError("Cast from " + employe + " to Employe is impossible.");
    }
}

class Employe {
    _nom;
    _prenom;
    _salaire;
    _societe;
    constructor(nom, prenom, salaire, societe) {
        if (this.constructor === Employe) {
            throw new TypeError('La Classe Employe ne peut pas être instancié');
        }
        this._nom = nom;
        this._prenom = prenom;
        this._salaire = salaire;
        this._societe = societe;
    }
    ajouterSubordonne(employeEncadre) {
        if (employeEncadre instanceof EmployeEncadre) {
            this.encadres.push(employeEncadre);
        }
        else {
            throw new Exeption("Erreur : impossible de faire l'instanciation");
        }
    }
    getNom() {
        return this._nom;
    }
    getPrenom() {
        return this._prenom;
    }
    getRevenus() {
        return this._salaire;
    }
    estRecrute(entreprise) {
        this._employeur = entreprise;
    }
}

class Directeur extends Employe {
    _prime;
    constructor(nom, prenom, salaire, societe, prime) {
        super(nom, prenom, salaire, societe);
        this._prime = prime;
    }
    getRevenus() {
        return super.getRevenus() + this._prime;
    }
}

class EmployeEncadre extends Employe {
    _chef;
    constructor(nom, prenom, salaire, societe, chef) {
        super(nom, prenom, salaire, societe);

        if (this.constructor === EmployeEncadre)
            throw new TypeError("Abstract class " + EmployeEncadre + " cannot be instantiated directly");

        if (chef instanceof Employe)
            this._chef = chef;
        else
            throw new TypeError("Cast from " + chef + " to Employe is impossible.");
    }

    getChef() {
        return this._chef;
    }
}

class Vendeur extends EmployeEncadre {
    _commission;

    constructor(nom, prenom, salaire, societe, chef, commission) {
        super(nom, prenom, salaire, societe, chef);
        this._commission = commission;
    }

    getRevenus() {
        return super.getRevenus() + this._commission;
    }
}

class Livreur extends EmployeEncadre {
    constructor(nom, prenom, salaire, societe, chef) {
        super(nom, prenom, salaire, societe, chef);
    }
}

/** Fin des classes **/

let societe;
let directeur;
let vendeur;
let livreurChef;
let livreur1;
let livreur2;

$(document).ready(function () {
    societe = new Entreprise("BricoloDuDimanche", 6559);
    directeur = new Directeur("Vier", "Jean", 2250, societe, 250);
    vendeur = new Vendeur("Hey", "Harnold", 1843, societe, directeur, 200);
    livreurChef = new Livreur("Magnum", "Thomas", 1969, societe, directeur);
    livreur1 = new Livreur("Jacquie", "Michel", 1736, societe, livreurChef);
    livreur2 = new Livreur("Tchee", "Lee", 1650, societe, livreurChef);

    /** Doivent generer une erreur **/
    //employe = new Employe("tata", "dede", 1456, societe);
    //employeEncadre = new EmployeEncadre("toto", "dede", 1456, societe, directeur);
    //livreur3 = new Livreur("dede", "tata", 2000, societe, societe);
    //livreur4 = new Livreur("tata", "toto", 2000, directeur, societe);

    societe.changementDirection(directeur);
    societe.recrute(directeur);
    societe.recrute(vendeur);
    societe.recrute(livreurChef);
    societe.recrute(livreur1);
    societe.recrute(livreur2);

    console.log("Entreprise " + societe.getNom() + " au capital de " + societe.getCapital() + "€");
    console.log("Nombre d\"employés : " + societe.getNbEmployes());
    console.log("Direction : " + societe.getDirecteur().getNom() + " " + societe.getDirecteur().getPrenom());
    console.log("\nNom", "\t\tPrénom", "\t\tRevenus", "\tFonction", "\tChef");
    console.log("-------------------------------------------------------------------------");
    societe.getColaborateurs().forEach(function (element) {
        affichage = element.getNom() + "\t\t" + element.getPrenom() + "\t\t" +
            element.getRevenus() + "€\t\t" + element.constructor.name;
        if (element instanceof EmployeEncadre)
            affichage += "\t\t" + element.getChef().getNom();
        else
            affichage += "\t *****";
        console.log(affichage);
    });
    // Affichage des infos
    afficherInfo();
});

function afficherInfo() {
    document.getElementById("titreEntreprise").innerHTML = "Entreprise " + societe.getNom();
    document.getElementById("capital").innerHTML = "Capital de : " + societe.getCapital() + "€ ";
    document.getElementById("nbEmployes").innerHTML = "Nombre d'employés : " + societe.getNbEmployes();
    document.getElementById("directeur").innerHTML = "Direction : " + societe.getDirecteur().getPrenom() + "  " + directeur.getNom();
    listeEmployes();

}

function listeEmployes() {

    let body = document.body;

    // Creation du tableau
    let table = document.createElement("table");
    body.appendChild(table);
    let tr = document.createElement("tr");
    table.appendChild(tr);

    let Nom = document.createElement("th");
    Nom.className = "Nom";
    Nom.innerHTML = "Nom";
    tr.appendChild(Nom);

    let Prenom = document.createElement("th");
    Prenom.className = "Prenom";
    Prenom.innerHTML = "Prenom";
    tr.appendChild(Prenom);

    let Revenus = document.createElement("th");
    Revenus.className = "Revenus";
    Revenus.innerHTML = "Revenus";
    tr.appendChild(Revenus);

    let Fonction = document.createElement("th");
    Fonction.className = "Fonction";
    Fonction.innerHTML = "Fonction";
    tr.appendChild(Fonction);

    let Chef = document.createElement("th");
    Chef.className = "Chef";
    Chef.innerHTML = "Chef";
    tr.appendChild(Chef);

    //Remplissage du tableau
    for (let i = 0; i <= societe.getNbEmployes(); i++) 
    {
        let tr_Employe = document.createElement("tr");
        table.appendChild(tr_Employe);

        let nomEmploye = document.createElement("td");
        nomEmploye.className = "nomEmploye";
        nomEmploye.innerHTML = societe.getColaborateurs()[i].getNom();
        tr_Employe.appendChild(nomEmploye);

        let prenomEmploye = document.createElement("td");
        prenomEmploye.className = "prenomEmploye";
        prenomEmploye.innerHTML = societe.getColaborateurs()[i].getPrenom();
        tr_Employe.appendChild(prenomEmploye);

        let SalaireEmploye = document.createElement("td");
        SalaireEmploye.className = "RevenusEmploye";
        SalaireEmploye.innerHTML = societe.getColaborateurs()[i].getRevenus();
        tr_Employe.appendChild(SalaireEmploye);

        let table_style = document.getElementsByTagName('table')[0];
        table_style.style.border = "1px solid #333";

        if (societe.getColaborateurs()[i] instanceof Livreur) {
            let FonctionEmploye = document.createElement("td");
            FonctionEmploye.className = "FonctionEmploye";
            FonctionEmploye.innerHTML = "Livreur ";
            tr_Employe.appendChild(FonctionEmploye);
            let ChefEmploye = document.createElement("td");
            ChefEmploye.className = "ChefEmploye";
            ChefEmploye.innerHTML = societe.getColaborateurs()[i].getChef().getNom();
            tr_Employe.appendChild(ChefEmploye);

        }

        if (societe.getColaborateurs()[i] instanceof Directeur) {
            let FonctionEmploye = document.createElement("td");
            FonctionEmploye.className = "FonctionEmploye";
            FonctionEmploye.innerHTML = "Directeur";
            tr_Employe.appendChild(FonctionEmploye);
            let ChefEmploye = document.createElement("td");
            ChefEmploye.className = "ChefEmploye";
            ChefEmploye.innerHTML = "...";
            tr_Employe.appendChild(ChefEmploye);
        }

        if (societe.getColaborateurs()[i] instanceof Vendeur) {
            let FonctionEmploye = document.createElement("td");
            FonctionEmploye.className = "FonctionEmploye";
            FonctionEmploye.innerHTML = "Vendeur"
            tr_Employe.appendChild(FonctionEmploye);
            let ChefEmploye = document.createElement("td");
            ChefEmploye.className = "ChefEmploye";
            ChefEmploye.innerHTML = societe.getDirecteur().getNom();
            tr_Employe.appendChild(ChefEmploye);
        }

        let td_styleNomEmploye = document.getElementsByClassName("nomEmploye")[i];
        td_styleNomEmploye.style.border = "2px solid";

        let td_stylePrenomEmploye = document.getElementsByClassName("prenomEmploye")[i];
        td_stylePrenomEmploye.style.border = "2px solid";

        let td_styleRevenusEmploye = document.getElementsByClassName("RevenusEmploye")[i];
        td_styleRevenusEmploye.style.border = "2px solid";

        let td_styleFontionEmploye = document.getElementsByClassName("FonctionEmploye")[i];
        td_styleFontionEmploye.style.border = "2px solid";

        let td_styleChef = document.getElementsByClassName("ChefEmploye")[i];
        td_styleChef.style.border = "2px solid";

        let th_style = document.getElementsByTagName('th')[i];
        th_style.style.border = "2px solid";
    }
}