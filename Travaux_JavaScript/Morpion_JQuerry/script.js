let symbole = 'x';

function verifGagnant()
{
    let res = '';
    let coupsGagnants = [7, 56, 448, 73, 146, 292, 273, 84];
    
    let identifiant = 'croix';
    if(symbole == 'o')
    {
        identifiant = 'rond';
    }
    
    // Creation d'un nombre binaire (1 quand l'identifiant est dans la case, 0 sinon)
    $('#grilleMorpion td').each(function(elem, i)
    {        
        if($(this).html().search(identifiant) != -1)
            res += '1';
        else
            res += '0';
    });
    
    //conversion en entier base dix 
    let resBase10 = parseInt(res,2);
           
    for(i=0; i<coupsGagnants.length; i++) 
    {
        // ET logique
        if((resBase10 & coupsGagnants[i]) == coupsGagnants[i]) 
        {
            console.log("Les " + identifiant + " gagnent !");
            alert("Les " + identifiant + " gagnent !");
            $('td').off("click");
            if(identifiant == 'croix')
            {
                $('#bouton').css('background', 'red');
            }
            else{
                $('#bouton').css('background', 'blue');
            }
            $('#bouton').html("Click ici pour rejouer !");
        } 
    }    
}

function reset(event)
{
    $('#grilleMorpion td').html("");
    $('#grilleMorpion td').on('click',morpion);
    $('#bouton').css('background', '');
    symbole = 'x';
}

function morpion(event)
{
    $(this).off('click');
    if(symbole == 'x'){
        $(this).html('<img id ="croix" src="img/croix.png" width="40px">');
    } else {
        $(this).html('<img id ="rond" src="img/rond.png" width="40px">');
    }
    verifGagnant();
    (symbole === 'x')?symbole='o': symbole='x';
}

$(document).ready(
    function()
    {   
        $('#grilleMorpion td').on('click',morpion);
        $('#bouton').on('click',reset);
    }
);