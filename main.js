// Elements
const resultOutput = document.querySelector(".result");
const rangeLength = document.querySelector(".range-length");
const inputLength = document.querySelector(".input-length");
const checkUppercase = document.querySelector(".uppercase");
const checkLowercase = document.querySelector(".lowercase");
const checkNumbers = document.querySelector(".numbers");
const checkSymbols = document.querySelector(".symbols");
const copyBtn = document.querySelector(".copy-btn");
const generateBtn = document.querySelector(".generate-btn");

// Input-range event listener
rangeLength.addEventListener("input", setLengthOfPassword);
inputLength.addEventListener("input", setLengthOfPassword);
function setLengthOfPassword(e) {
  const value = e.target.value;
  rangeLength.value = value;
  inputLength.value = value;
}

// Object of random functions
const randomFanc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate event listener
generateBtn.addEventListener("click", () => {
  const length = Number(inputLength.value);
  const hasUpper = checkUppercase.checked;
  const hasLower = checkLowercase.checked;
  const hasNumber = checkNumbers.checked;
  const hasSymbol = checkSymbols.checked;

  resultOutput.innerHTML = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  );
});

// Generate Password function
function generatePassword(length, upper, lower, number, symbol) {
  let generatedPassword = "";
  const typesCount = upper + lower + number + symbol;
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i++) {
    const type = typesArr[Math.floor(Math.random() * typesArr.length)];
    const funcName = Object.keys(type)[0];
    generatedPassword += randomFanc[funcName]();
  }
  return generatedPassword;
}

// Copy password function
copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultOutput.innerText;
  if (!password) return;
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("The password is copied to the clipboard!");
});

// Generators functions - https://www.w3schools.com/html/html_charset.asp
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
