const fs = require('node:fs/promises');
const { resolve } = require('node:path');
const readline = require('node:readline');

const numberToGuess = Math.floor(Math.random() * 1000);

const greetings = `\nПривет! Я загадал число: ${numberToGuess}`;
console.log(greetings);

let numberOfAttempts = 1;

const pathFile = 'Task3/gameLog.txt';

fs.writeFile(pathFile, greetings);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function event() {
    return new Promise ((resolve, reject) => {
       rl.on('line', (line) => {resolve(line)}).on('close', () => {resolve('exit')});
    });
};

(async () => {
    while (true) {
        const promptText = `\nПопытка номер ${numberOfAttempts}. \nВведите число от 0 до 999: `;
        rl.setPrompt(promptText);
        await fs.appendFile(pathFile, promptText);
        rl.prompt();
        const line = await event();
        await fs.appendFile(pathFile, line);
        if (line === 'exit' || line.trim() === 'exit') {
            const parting = '\nИгра прервана. До новых встреч!';
            const log = await fs.appendFile(pathFile, parting);
            console.log(parting);
            process.exit(0);
            break;
    
        } else if (isNaN(+line.trim()) || (+line.trim() < 0 || +line.trim() > 999)) {
            const notNumber = '\nВы ввели не число от 0 до 999';
            const log = await fs.appendFile(pathFile, notNumber);
            console.log(notNumber);
            numberOfAttempts++;
    
        } else if (line.trim() == numberToGuess) {
            const win = `\nВы угадали! Общее количество попыток: ${numberOfAttempts}`;
            const log = await fs.appendFile(pathFile, win);
            console.log(win);
            process.exit(0);
            break;
    
        } else if (line.trim() <= numberToGuess) {
            const lesserNumber = '\nВаше число меньше моего';
            const log = await fs.appendFile(pathFile, lesserNumber);
            console.log(lesserNumber);
            numberOfAttempts++;
            
        } else {
            const greaterNumber = '\nВаше число больше моего';
            const log = await fs.appendFile(pathFile, greaterNumber);
            console.log(greaterNumber);
            numberOfAttempts++;
        };
    }
}) ();