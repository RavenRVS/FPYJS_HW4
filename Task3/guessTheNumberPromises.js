const fs = require('node:fs/promises');
const readline = require('node:readline');

async function writeMyFile(pathFile, data) {
    try {
        const promise = fs.writeFile(pathFile, data);
        await promise;
    } catch (err) {
        console.error(err);
    }
};

async function appendMyFile(pathFile, data) {
    try {
        const promise = fs.appendFile(pathFile, data);
        await promise;
    } catch (err) {
        console.error(err);
    }
};

const numberToGuess = Math.floor(Math.random() * 1000);

const greetings = `\nПривет! Я загадал число: ${numberToGuess}`;
console.log(greetings);

let numberOfAttempts = 1;
const pathFile = 'Task3/gameLog.txt';

writeMyFile(pathFile, greetings);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,});

function input(promptText) {
    return new Promise((resolve, reject) => {
        rl.setPrompt(promptText)
        rl.prompt()
        rl.on('line', (line) => {
            resolve(line)}).on('close', () => {resolve('close')});
    })
};

async function run(numberOfAttempts) {
    const promtText = `\nПопытка номер ${numberOfAttempts}. \nВведите число от 0 до 999: `;
    const line = await input(promtText);
    const log = await appendMyFile(pathFile, promtText + line.trim());
    if (line === 'close') {
        const parting = '\nИгра прервана. До новых встреч!';
        const log = await appendMyFile(pathFile, parting);
        console.log(parting);
        process.exit(0);
    };
    if (isNaN(+line.trim()) || (+line.trim() < 0 || +line.trim() > 999)) {
        const notNumber = '\nВы ввели не число от 0 до 999';
        const log = await appendMyFile(pathFile, notNumber);
        console.log(notNumber);
        numberOfAttempts++;
        run(numberOfAttempts);

    } else if (line.trim() == numberToGuess) {
        const win = `\nВы угадали! Общее количество попыток: ${numberOfAttempts}`;
        const log = await appendMyFile(pathFile, win);
        console.log(win);
        process.exit(0);

    } else if (line.trim() <= numberToGuess) {
        const lesserNumber = '\nВаше число меньше моего';
        const log = await appendMyFile(pathFile, lesserNumber);
        console.log(lesserNumber);
        numberOfAttempts++;
        run(numberOfAttempts);
        
    } else {
        const greaterNumber = '\nВаше число больше моего';
        const log = await appendMyFile(pathFile, greaterNumber);
        console.log(greaterNumber);
        numberOfAttempts++;
        run(numberOfAttempts);
    }
};

run(numberOfAttempts);
