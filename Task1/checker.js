function getPasswordChecker(password) {
    return (verifiablePassword) => {return password === verifiablePassword};
};

const test = getPasswordChecker('gfhjkm');

console.log(test('пароль'));
console.log(test('gfhjkm'));
console.log(test('пароль'));
console.log(test('gfhjkm'));