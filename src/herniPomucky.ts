
import chalk from 'chalk';
import * as readline from 'readline';
import { tick } from './index.js';

export type THraciPlan = string[][];
export const kostka : string = '\u2588';

let hraciPlan : THraciPlan = [];

export let sirka = -1;
export let vyska = -1;

import { Writable } from 'stream';

const mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
      // Do nothing to prevent echo in the terminal
      callback();
    }
  });
  

const rl = readline.createInterface({
    input: process.stdin, output: process.stdout
});

export function zapniZnakovyRezim() {
    readline.emitKeypressEvents(process.stdin, rl);
    //process.stdin.setRawMode(true);
}

export function zapniKurzor(viditelny: boolean) {
    if (viditelny) {
        process.stdout.write('\u001B[?25h');
    } else {
        process.stdout.write('\u001B[?25l');
    }
}

export function vypniZnakovyRezim() {
    process.stdin.setRawMode(false);
}

export function prazdnyPlan(dx : number, dy? : number) : THraciPlan {
    let plan : THraciPlan = [];

    if (!dy) {
        dy = dx;
    }
    if (process.stdout.rows < dy + 1) {
        console.log(chalk.redBright('Obrazovka je prilis nizka, zvetsi okno!'));
        process.exit(1);
    }
    sirka = dx;
    vyska = dy;

    for (let  i : number = 0; i < dy; i++) {
        let radek : string[]  = [];
        for (let j : number = 0; j < dx; j++) {
            radek.push('');
        }
        plan.push(radek);
    }
    return plan;
}

export function radekSOkrajem() : string[] {
    return [ kostka, ...new Array(sirka - 2), kostka ];
}

export function kresliObvod(plan : THraciPlan) {
    let prvni : string[] = plan[0];
    let posledni : string[] = plan[plan.length - 1];
    for (let x : number = 0; x < plan[0].length; x++) {
        prvni[x] = kostka;
        posledni[x] = kostka;
    }
    for (let y : number =  1; y < plan.length - 1; y++) {
        let radek = plan[y];
        radek[0] = kostka;
        radek[radek.length - 1] = kostka;
    }
}

/**
 * Natiskne plan, kazde pole tiskne 2x, aby byl vysledek podobne siroky jako vysoky
 * @param plan herni plan
 */
export function tiskniPlan2(plan : THraciPlan) {
    tiskniPlan(plan, 2);
    zapniKurzor(false);
}

/**
 * Vytiskn plan od pozice [0, 0]. Kazdou bunku zopakuje "repeatX" krat, aby se natahly znaky
 * v ose "X" (znak je vysoky a uzky).
 * @param plan plan k tisku
 * @param repeatX kolikrat se ma kazda bunka zopakovat, default: 1
 */
export function tiskniPlan(plan : THraciPlan, repeatX: number = 1) {
    process.stdout.cursorTo(0, 0);
    let tisk : string;
    for (let y : number = 0; y < plan.length; y++) {
        tisk = '';
        let radek : string[] = plan[y];
        for (let x : number = 0; x < radek.length; x++) {
            if (!radek[x]) {
                tisk += ' '.repeat(repeatX);
            } else {
                let s = radek[x];
                if (s.startsWith("!")) {
                    tisk += s.substring(1) + ' '.repeat(Math.max(0, repeatX - 1));
                } else {
                    tisk += radek[x].repeat(repeatX);
                }
            }
        }
        console.log(tisk);
    }
}

let running : boolean = false;

function t() {
    setTimeout(t, 1000);
    if (!running) {
        return;
    }
    tick();
}

export function startTick() {
    if (running) {
        return;
    }
    running = true;
    t();
}

export function stopTick() {
    running = false;
}
