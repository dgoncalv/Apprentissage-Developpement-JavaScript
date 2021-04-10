## Nom: Goncalves
## Prenom: Denis


# <center> Test des portees var et let : </center>


```javascript
function f()
{
    let x = 1;
    var y = 2;
    if(true)
    {
        let x = 5;
        var y = 10;
        console.log('x (dans if) = ' + x);
        console.log('y (dans if) = ' + y);
    }
    console.log('x (hors if) = ' + x);
    console.log('y (hors if) = ' + y);
}
f();
```

    x (dans if) = 5
    y (dans if) = 10
    x (hors if) = 1
    y (hors if) = 10


#### -	A partir du résultat que vous avez obtenu, que pouvez-vous en déduire sur la portée des variables var et let ?

Nous pouvons observer que la variable "var" est utilisé pour déclarer une variable globale alors que la variable "let" est utilisé pour déclarer une variable dont la portée est limitée à un bloc.

# <center> Hissage (hoisting) : </center>


```javascript
var c;
console.log(c);
var d = 1;
console.log(d);
```

    undefined
    1


Les variables globales non défini après déclaration renvoie l'argument "undifined" qui correspond à non défini et une variable défini renvoie sa valeur.


```javascript
console.log(e);
console.log(f);
var e = 1;
var f;
```

    undefined
    undefined


Déclarer des variables gloables après l'affichage ne permet pas d'afficheur leurs valeur qu'elle soit défini ou non.


```javascript
var g = "externe";
function testVar(interne) 
{
    var g;
    if (interne) 
    {
        g = "interne";
        return g;
    }
    return g;
}
console.log(testVar(true));
console.log(testVar(false));
```

    interne
    undefined





```javascript
let h = "externe";
function testLet(interne) 
{
    if (interne) 
    {
        let h = "interne";
        return h;
    }
    return h;
}
console.log(testLet(true));
console.log(testLet(false));
```

    interne
    externe




#### -	Expliquez les résultats obtenus. Pour vous aider, vous pouvez regarder une documentation expliquant le principe du hissage de variable (hoisting).



#### -	Expliquez pourquoi l’utilisation de var est maintenant déconseillé.

L'utilisation de var est maintenant déconseillé car elle n'est désormais plus pris en charge depuis les dernières versions.

# <center> Les fonctions : </center>


#### hello_world() : affiche "Hello World !" dans la console.


```javascript
function hello_world()
{
    console.log("Hello World !")
}

hello_world();
```

#### hello_prenom(prenom) : prend en argument un prénom et affiche « bonjour prénom » dans la console.


```javascript
function hello_prenom()
{
    let prenom = "Denis"
    console.log("Hello " + prenom + " !")
}

hello_prenom();
```

    Hello Denis !


#### voyelle(str) : compte et retourne le nombre de voyelles de la chaîne str.


```javascript
function estVoyelle(str)
{
    let voyelles = "aeiouy";
    
    return voyelles.indexOf(str) != -1;
}

function voyelle_2(str)
{
     let nbVoyelle = 0;
     for(let i = 0; i < str.length; i++)
     {
         nbVoyelle+= estVoyelle(str[i])?1:0;
     }
    
    return nbVoyelle;
}
voyelle_2('Bonjour');
```




    3



#### palindrome(str) : teste si la chaîne str est un palindrome (demande à ton voisin ce qu’est un palindrome si tu ne sais pas. S’il ne sait pas, demande de l’autre côté).


```javascript
function palindrome(str)
{
    let lePalindrome = str.length;
    let condition
    for(let i = 0; i < str.length; i++)
    {
        if (str[i+1] == str[palindrome-i])
        {
            condition = true;
        }
        else
        {
            condition = false;
        }
    }
    if(condition == true)
    {
         console.log("Cest un palindrome!");
    }
    else
    {
        console.log("Ceci n'est pas un palindrome!");   
    }
    
}
palindrome('bob');
```

    Cest un palindrome!


#### uppercase(str) : met en majuscule la première lettre de la chaîne str et tout le reste en minuscules.


```javascript
function uppercase(str)
{
    let mot = str;
    
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
uppercase('sAluT');
```




    'Salut'



#### lastButOne(tab) : retourne l’avant dernier élément d’un tableau ou undefined si le tableau a moins de deux éléments (pas de boucle ni de condition).


```javascript
function lastButOne(tab)
{
    let tab2 = tab.slice(3,tab.length);
    let c = tab2.slice(tab2.length-2, tab2.length-1)[0];
    console.log(c);
}
lastButOne([1,2]);
lastButOne([1,2,3,4,5]);
```

    undefined
    4


#### square(tab) : crée un tableau dont les éléments sont le carré du tableau passé en paramètre.


```javascript
function square(tab)
{
    let tableau =[];
    for(let i=0; i<tab.length ; i++)
    {
        tableau[i]=tab[i]*tab[i];
    }
    return tableau;
}
let tab=square([2,4,6]);
console.log(tab);
```

    [ 4, 16, 36 ]


#### gt10(tab) : crée un tableau en ne gardant que les éléments supérieurs à 10 du tableau.


```javascript
function gt10(tab)
{
    let leTab = [];
    for(let i=0; i<tab.length ; i++)
    {
        if(tab[i]>10)
        {
            leTab.push(tab[i]);
        }
    }
    return leTab;
}
let tab=gt10([2,4,6,10,12,15,9000]);
console.log(tab);
```

    [ 12, 15, 9000 ]


#### sum(tab) : calcule la somme des éléments du tableau.


```javascript
function sum(tab)
{
    let resultat = 0;
    for(let i=1; i<tab.length+1 ; i++)
    {
        resultat+=tab[i-1];
    }
    return resultat;
}
let tab=sum([2,4,6]);
console.log(tab);
```

    12


#### max(a,b) : prend deux nombres en argument et retourne le plus grand. Ecrire avec if et opérateur conditionnel.


```javascript
function max(a,b)
{
    let result = 0;
    
    if (a > b)
    {
        console.log("Le nombre de la variable a: "+a+" est plus grand que celui de b: "+b+".");
    }
    else
    {
        console.log("Le nombre de la variable b: "+b+" est plus grand que celui de a: "+a+".");
    }
}
max(4,2);
max(6,9);
```

    Le nombre 4 est plus grand que 2.
    Le nombre 6 est plus grand que 9.


#### max3(a,b,c) : comme max mais avec 3 arguments


```javascript
function max3(a,b,c)
{   
    if (a > b && a > c)
    {
        console.log("Le nombre de la variable a: "+a+" est plus grand que celui de b: "+b+" et celui de c: "+c+".");
    }
    else if (b > a && b > c)
    {
        console.log("Le nombre de la variable b: "+b+" est plus grand que celui de a: "+a+" et celui de c: "+c+".");
    }
    else if (c > a && c > b)
    {
        console.log("Le nombre de la variable c: "+c+" est plus grand que celui de a: "+a+" et celui de b: "+b+".");
    }
}
max3(1,2,3);
max3(6,5,4);
max3(7,9,8);
```

    Le nombre de la variable c: 3 est plus grand que celui de a: 1 et celui de b: 2.
    Le nombre de la variable a: 6 est plus grand que celui de b: 5 et celui de c: 4.
    Le nombre de la variable b: 9 est plus grand que celui de a: 7 et celui de c: 8.


#### jour(a) : prend un numéro de jour entre 1 et 7 et retourne le nom du jour (ne pas utiliser de tableau)


```javascript
function jour(a)
{
    switch(a)
    {
        case 1:
            console.log("Le jour choisi est: Lundi.")
        break;
        case 2:
            console.log("Le jour choisi est: Mardi")
        break;
        case 3:
            console.log("Le jour choisi est: Mercredi")
        break;
        case 4:
            console.log("Le jour choisi est: Jeudi")
        break;
        case 5:
            console.log("Le jour choisi est: Vendredi")
        break;
        case 6:
            console.log("Le jour choisi est: Samedi.")
        break;
        case 7:
            console.log("Le jour choisi est: Dimanche.")
        break;
        default:
            console.log("Erreur, ce n'est pas un jour. ")
    }
}
jour(1);
jour(2);
jour(3);
jour(4);
jour(5);
jour(6);
jour(7);
jour(8);
```

    Le jour choisi est: Lundi.
    Le jour choisi est: Mardi
    Le jour choisi est: Mercredi
    Le jour choisi est: Jeudi
    Le jour choisi est: Vendredi
    Le jour choisi est: Samedi.
    Le jour choisi est: Dimanche.
    Erreur, ce n'est pas un jour. 


#### factorielle_it_for(a) : calcule et retourne la factorielle d’un nombre avec une boucle for (n ! = n x (n-1) x … x 2 x 1)


```javascript
function factorielle_it_for(a)
{
    let nb = 1;
    for(let i = 1;i <= a;i++)
    {
        nb*=i;
    }
    console.log("Factorielle "+a+" = "+nb+".");
}
factorielle_it_for(5);
```

    Factorielle 5 = 120.


#### factorielle_it_while(a) : idem avec une boucle while


```javascript
function factorielle_it_while(a)
{
    let nb = 1;
    let i = 1;
    while(i <= a)
    {
        nb*=i;
        i++;
    }
    console.log("Factorielle "+a+" = "+nb+".");
}
factorielle_it_for(5);
```

    Factorielle 5 = 120.


#### factorielle_rec(a) : idem en récursif


```javascript
function factorielle_rec(a)
{
    let nb = 1;
    if (a == 0)
    {
      return 1;
    }
    else 
    {
        return a * factorielle_rec(a - 1);
    }
}
factorielle_rec(5);
```




    120



#### exposant_rec(a,b) (Je ne sais pas faire l'exposant en Markdown, donc regardez le PDF pour savoir ce que fait cette fonction)


```javascript
function exposant_rec(a,b)
{
    let nb = 1;
    if(b == 0)
    {
        nb=1;
    }
    else
    {
        nb=a*exposant_rec(a,b-1)
    }
    return nb;
}
exposant_rec(2,3);
```




    8



#### ack(m,n) permettant de calculer la fonction d’Ackerman et calculer ack(1,1) et ack(4,1)


```javascript
function ack(m,n) {
      if(m == 0){ 
        return n+1;
      }
      else {
        if(n == 0){
            return ack(m-1,1);
        }
        else {
            return ack(m-1,(ack(m,n-1)));
        }
      }
    }
 
console.log(ack(1,1));
console.log(ack(4,1)); // La taille maximum a été dépassé
```

    3



    evalmachine.<anonymous>:1

    function ack(m,n) {

                ^

    

    RangeError: Maximum call stack size exceeded

        at ack (evalmachine.<anonymous>:1:13)

        at ack (evalmachine.<anonymous>:7:20)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)

        at ack (evalmachine.<anonymous>:10:29)


#### fibo(n) permettant de calculer la suite de Fibonacci 


```javascript
function fibo(n) 
{
    if (n < 2)
    {
        return n;
    }
    return fibo(n-2) + fibo(n-1)
}
console.log(fibo(10));
```

    55


#### supprime(tab,x) permettant de retourner le tableau tab amputé de tous les x


```javascript
function supprime(tab,x){
    let tableauPropre = [];
    for(let i = 0;i < tab.length;i++)
    {
        if(tab[i] != x)
        {
            tableauPropre[i] = tab[i];
        }
    }
    return tableauPropre;
}
let tab=supprime([1,2,3,2,5],2);
console.log(tab);
```

    [ 1, <1 empty item>, 3, <1 empty item>, 5 ]


#### selectionne(tab,x) permettant de retourner le tableau tab amputé d’un seul élément x


```javascript
function supprime(tab,x){
    let tableauPropre = [];
    let empute = false;
    for(let i = 0;i < tab.length;i++)
    {
        if(tab[i] != x || empute == true)
        {
            tableauPropre[i] = tab[i];
        }
        else if(empute == false)
        {
            empute = true;   
        }
        
    }
    return tableauPropre;
}
let tab=supprime([1,2,3,2,5],2);
console.log(tab);
```

    [ 1, <1 empty item>, 3, 2, 5 ]


#### sousliste(tab1,tab2) qui retourne true si tab2 est une un sous tableau de tab1


```javascript
function sousliste(tab1,tab2)
{
    for(let i=0; i<tab2.length; i++)
    {
        if(tab1.indexOf(tab2[i]) == -1)
        {
            return false;
        }
    }
    return true;
}
sousliste([1,2,3],[1,2]);
```

#### prefixe(tab1,tab2) qui retourne true si tab2 débute tab1


```javascript
function prefixe(tab1,tab2){
    let condition = true;
    for(let i = 0;i < tab2.length;i++)
    {  
        if(tab1[i] != tab2[i])
        {
            condition = false;
        }
    }
    return condition;
}
console.log(prefixe([1,2,3,4,5],[1,2,3]));
console.log(prefixe([1,2,3,4,5],[1,4,3]));
```

    true
    false



```javascript

```
