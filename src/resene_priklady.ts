
// Ukazka: projde pole, a vybere "male texty", tzn. texty, ktere jsou KRATSI nez zadana delka (parametr)
export function vyberMaleTexty(pole : string[], delka : number) : string[] {
    let vysledek : string[] = [];

    for (
        let pos : number = 0; 
        pos < pole.length; 
        pos++
    ) {
        let prvek : string = pole[pos];
        if (prvek.length < delka) {
            vysledek.push(prvek);
        }
    }

    return vysledek;
}

/**
 * Sestavujeme knihu, ktera ma kapitoly. Kazda kapitola ma urcity pocet stranek. V poli jsou cisla stranek, kde
 * jednotlive kapitoly zacinaji. Funkce vradi do knihy novou kapitolu, ktera ma udany pocet stranek a posune
 * cislovani nasledujicich kapitol.
 * 
 * @param poctyStranek 
 */
export function zaradKapitolu(zacatkyKapitol: number[], delkyKapitol: number[], pocetStranek : number, kamVsunout: number) {
    if (kamVsunout >= zacatkyKapitol.length) {
        let novaStranaNaKonci : number = zacatkyKapitol[length - 1] + delkyKapitol[length -1];
        zacatkyKapitol.push(novaStranaNaKonci);
        delkyKapitol.push(pocetStranek);
    } else {
        let pocatecniStranka : number = zacatkyKapitol[kamVsunout];
        zacatkyKapitol.splice(kamVsunout, 0, pocatecniStranka);
        delkyKapitol.splice(kamVsunout, 0, pocetStranek);

        for (let pos : number = kamVsunout + 1; pos < zacatkyKapitol.length; pos++) {
            zacatkyKapitol[pos] = zacatkyKapitol[pos - 1] + delkyKapitol[pos - 1];
        }
    }
}

let kapitolyV1 = [4, 10, 14, 28];
let kapitolyV2 : number[] = kapitolyV1;

let delkyV1 = [6, 4, 14, 8];

zaradKapitolu(kapitolyV1, delkyV1, 5, 1);
console.log(kapitolyV1);

let kapitolyV3 = [...kapitolyV2];
zaradKapitolu(kapitolyV3, delkyV1, 10, 4);
console.log(kapitolyV1);
console.log(kapitolyV3);

// Funkce ktera PREPISUJE pole, vynechava ze slov vsechny samohlasky.
export function strcPrstSkrzKrk(slova: string[]) {
    for (
        let pos : number = 0;
        pos < slova.length;
        pos++
    ) {
        let text = slova[pos];

        let out = text.replace('a', '');

        let a : number = 5;
        let b : number = Math.round(a) + 5;

        out = out.replaceAll('e', '');
        out = out.replaceAll('i', '').replaceAll('o', '').
            replaceAll('u', '').
            replaceAll('y', '');

        slova[pos] = out;
    }
}

let slova = ["Skakal", "pes", "pres", "oves", "pres", "minove", "pole"];
console.log(vyberMaleTexty(slova, 5));

strcPrstSkrzKrk(slova);
console.log(slova);

export function sachovnice(velikost : number) : string[][] {
    let plan: string[][] = new Array(velikost);

    for (let x = 0; x < velikost; x++) {
        plan[x] = [];
    }

    let zacinamCernou = false;

    for (let radek : number = 0; radek < velikost; radek = radek + 1) {
        let cerna : boolean = zacinamCernou;
        let r : string[] = [];
        for (let sloupec : number = 0; sloupec < velikost; sloupec++) {
            if (cerna) {
                r.push(' ');
            } else {
                r.push('X');
            }
            cerna = !cerna;
        }
        plan[radek] = r;
        
        if (zacinamCernou) {
            zacinamCernou = false;
        } else {
            zacinamCernou = true;
        }
    }
    return plan;
}

console.log(sachovnice(10));

