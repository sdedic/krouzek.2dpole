#!/usr/bin/node
// import * as process from 'process';
// import * as fn from './funkce';
// import * as fs from 'fs';

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import promptSync from 'prompt-sync';
import * as hra from './herniPomucky.js';
import * as readline from 'readline';
import chalk from 'chalk';

// zalozime herni plan, zaroven se zapamatuje vyska a sirka. Program vypise chybu, pokud je 
// obrazovka mensi nez vyska.
let plan : hra.THraciPlan = hra.prazdnyPlan(20);

// vypneme kurzor, a vycistime konzoli.
hra.zapniKurzor(false);
console.clear();

// znakovy rezim umozni zpracovavat JEDNOTLIVE znaky, ne cele radky az po ENTER.
hra.zapniZnakovyRezim();

// dp planu se nakresli s pomoci znaku 'hra.kostka' obvod.
hra.kresliObvod(plan);

// vytiskneme plan
hra.tiskniPlan2(plan);

process.on("SIGINT", (x) => { process.exit(0); return true; });

export function posunDolu(plan : hra.THraciPlan, odRadku: number, doRadku? : number) {
}

let jidloX = hra.sirka - 2;
let jidloY = hra.vyska - 2;  

let jidloSekund = 10;

let hracX = Math.floor(hra.sirka / 2);
let hracY = Math.floor(hra.vyska / 2);

let dx : number = 0;
let dy : number = 0;

function stiskKlavesy(klavesa: string) {
    // left, right, down, up jsou systemove nazvy por klavesy sipek.

    // UKOL 1: dodelat pohyby vlevo-vpravo-nahoru-dolu. Pozor - v programu jsou chyby a nedodelky !!!
    // UKOL 2: zaridit, aby hrac nemohl vlezt do okraje a za nej
    switch (klavesa) {
        case 'left':
            dx = -1;
            break;
        case 'right':
            dy = 1;
            break;
        case 'up':
        case 'down':
    }

    hracX += dx;
    hracY += dy;

    // UKOL5: kdyz hrac dostihne jidlo, VYPIS pod plan (na urcitou pozici!) text: "Skore: " a 
    // soucet zbastenych jidel.
    plan[hracY][hracX] = chalk.green(hra.kostka);

    hra.tiskniPlan2(plan);
}

/**
 * Funkce se bude volat KAZDOU sekundu
 */
export function tick() {
    // UKOL 3: zarid, aby po "jidloSekund" jidlo zmizelo
    // UKOL 4: po zmizeni jidla se jidlo objevi jinde na planu
}


process.stdin.on("keypress", (a, x, y) => {
    if (x.name === 'c' && x.ctrl === true) {
        hra.zapniKurzor(true);
        process.exit(0);
    }
    stiskKlavesy(x.name);
})

// Umistime jidlo. tisk2 zdvojuje znaky, ale chceme aby natiskl jen jediny znak. Tisk2 
// je napsany tak, ze NEZDVOJI znak, kdyz text zacina vykricnikem 
plan[jidloY][jidloX] = '!' + chalk.red('3');

// prvotni umisteni hrace
plan[hracY][hracX] = chalk.green(hra.kostka);

// hrac, jidlo i obrys je v planu -> natisknout.
hra.tiskniPlan2(plan);

// spustime casovac
hra.startTick();

// PRIKLAD: nastaveni kurzoru na urcitou pozici
process.stdout.cursorTo(0, 0);
