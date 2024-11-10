import promptSync from 'prompt-sync';

function x() {
const prompt = promptSync();
//----------------------------  POLE a SADY --------------------------------------

// Udelame pole cisel, muze obsahovat 0-mnoho hodnot. Ale TED nema zadnou
let pole1 : number[];
// musim mu nejprve priradit hodnotu:
pole1 = [];

// Udelame promennou ... a hned ji priradime hodnotu: prazdne pole.
let pole2 : number[] = [];

// Jde zjistil DELKA pole. Pocet prvku v nem. Prazdne pole ma delku 0. Pozor: length je vlastnost (property), ne funkce !
let delka = pole2.length;

// Stvorime promennou, ktera priradime POLE (seznam) cisel.
let poleCisel : number[] = [ 1, 10, 20, 50];

// Seznam si pamatuje svoji delku. 
console.log(poleCisel.length);

// Muzu si primo vzit kterykoliv prvek, nebo na nejake misto zapsat. Pozice v [] jsou VZDY od 0 a konci na length - 1 (!!)
let druheCislo : number = poleCisel[1];

// zapise do prvku na pozici 2, tedy 0-1-2 ... a prepise cislo 20 na 33.
poleCisel[2] = 33;

// VELKY POZOR: **obsah** se nekopiruje ! Obe promenne ted "ukazuji" na stejne pole.
let dalsiPole : number[] = poleCisel;

// protoze "dalsiPole" a "poleCisel" ukazuji na TOTEZ pole...
// ... bude odted dalsiPole[0] a take poleCisel[0] rovno -1. Dve promenne, ale "ukazuji" na stejny kus pameti.
dalsiPole[0] = -1;

// Tady se kopiruje: operator "..." znamena "vyjmenuj vsechny prvky, jako bych je napsal oddelene carkou"
let kopiePole: number[] = [...dalsiPole];

// Do promenne se priradi pole s velikosti 10... ma celkem 10 pozic (.length == 10), ale prvky ma nevyplnene (undefined).
let prazdnePole : string[] = new Array(10);

// ----------- PROCHZENI PRVKU POLE --------------

// Pomoci CYKLU s RIDICI PROMENNOU "i" projdu pole od 1. prvku (pozice 0) do posledniho (pozice .length - 1) 
// -- pozor na OSTROU nerovnost
for (let i : number = 0; i < poleCisel.length; i++) {
    console.log(poleCisel[i]);
}

// Zkratka, take projde VSCECHNY prvku - ale jen vzestupne, a pripadne pociadlo pozic si musim zaridit sam.
// Nekdy ale pozici nepotrebuji (leda na vyzvednuti prvku z pole). 
// 
for (let cislo of poleCisel) {
    console.log(cislo);
}

// ----------- PRIDAVANI PRVKU DO POLE ---------------

// vsuneme na konec (za vsechny existujici prvky)
poleCisel.push(100);
// nebo na zacatek
poleCisel.unshift(0);
// a pridavat i vice najednou
poleCisel.unshift(55, 6, 77);

let vsunout1 : number[] = [0, 11, 12];
// Ale pro vsunuti z jineho pole musim pouzit operator "...". Triteckovy "operator" je "expanze": znamena "jako kdybych kazdy prvek pole napsal samostatne"
poleCisel.unshift(...vsunout1);

// ----------- VYBIRANI PRVKU Z POLE ---------------

// Vezmu 1. prvek, a zbytek pole se posune (a zmensi)
let prvniPrvek  = poleCisel.shift();
// A tady vezmu posledni prvek, pole se zmensi.
let poslednIprvek = poleCisel.pop();

/**
 *  unshift --->            <---- push
 *                [ POLE ]
 *  <---- shift             pop ---->
 */

// ----------- HLEDANI V POLI ----------------

// Zjisti, na ktere pozici se naleza hodnota 10. Najde prvni takovou pozici od zacatku pole!
let pozice = poleCisel.indexOf(10);
// Najde prvni pozici, na ktere se naleza hodnota 10, ale zacne od pozice 2 (tzn. od 3. cisla)
let pozice2 = poleCisel.indexOf(10, 2);

// ------------ VKLADANI A VYBIRANI jinde nez na zacatku a konci -------------

// Muzu vkladat a mazet "nekde uprostred" ? Ano ... tohle vlozi na pozici 1 (2. prvek) cislo 55
poleCisel.splice(1, 0, 55);

// Jendoduche mazani "uprostred": na 3. pozici (4. cislo v poradi) smaze 2 prvky
poleCisel.splice(3, 2);

// A ted oboji najednou: od 2. pozice 3 prvky, a NAMISTO nich tam vlozi prvky z jineho pole
poleCisel.splice(2, 3, 11, 22, 33, 44);
// Da se predat i pole, ale musi se rozvinout (viz dokumentace)
poleCisel.splice(2, 3, ...[11, 22, 33, 44]);

// --------------- Pripomenuti z minula  -------------------
let zadaneCislo : number = Number(prompt("Zadej cislo:"));
if (Number.isNaN(zadaneCislo)) {
    // uzivatel zadal nejaky nesmysl
}

}