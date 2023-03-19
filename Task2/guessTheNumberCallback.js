const fs = require('node:fs');
const readline = require('node:readline');

const numberToGuess = Math.floor(Math.random() * 1000);

const greetings = `\nПривет! Я загадал число: ${numberToGuess}`;
console.log(greetings)

let numberOfAttempts = 1;
const pathFile = 'Task2/gameLog.txt';


const firstTry = `\nПопытка номер ${numberOfAttempts}. \nВведите число от 0 до 999: `;

fs.writeFile(pathFile, greetings + firstTry, (err) => {
    if (err) throw err;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: firstTry,
      });
      
      rl.prompt();
      
      rl.on('line', (line) => {
            fs.appendFile(pathFile, line.trim(), (err) => {
                if (err) throw err;
            
                if (isNaN(+line.trim()) || (+line.trim() < 0 || +line.trim() > 999)) {
                    const notNumber = '\nВы ввели не число от 0 до 999';
                    fs.appendFile(pathFile, notNumber, (err) => {
                        if (err) throw err;
                        console.log(notNumber);
                        numberOfAttempts++;
                        nextTry(numberOfAttempts);
                    });

                } else if (line.trim() == numberToGuess) {
                    const win = `\nВы угадали! Общее количество попыток: ${numberOfAttempts}`;
                    fs.appendFile(pathFile, win, (err) => {
                        if (err) throw err;
                        console.log(win);
                        process.exit(0);
                    });

                } else if (line.trim() <= numberToGuess) {
                    const lesserNumber = '\nВаше число меньше моего';
                    fs.appendFile(pathFile, lesserNumber, (err) => {
                        if (err) throw err;
                        console.log(lesserNumber);
                        numberOfAttempts++;
                        nextTry(numberOfAttempts);
                    });
                    
                } else {
                    const greaterNumber = '\nВаше число больше моего';
                    fs.appendFile(pathFile, greaterNumber, (err) => {
                        if (err) throw err;
                        console.log(greaterNumber);
                        numberOfAttempts++;
                        nextTry(numberOfAttempts);
                    });
                    
                };
        
                function nextTry (numberOfAttempts) {
                    const nextTryText = `\nПопытка номер ${numberOfAttempts}. \nВведите число от 0 до 999: `;
                    fs.appendFile(pathFile, nextTryText, (err) => {
                        if (err) throw err;
                        rl.setPrompt(nextTryText);
                        rl.prompt();
                    });
                }
            });
      
        }).on('close', () => {
            const parting = '\nИгра прервана. До новых встреч!';
            fs.appendFile(pathFile, parting, (err) => {
                if (err) throw err;
                console.log(parting);
                process.exit(0);
            });
            
      });
  });


