const fs = require("fs");

const numbers = `


`;

const formatIndianPhoneNumber = (phoneNumber = "") => {
  if (phoneNumber === "") {
    return "";
  }

  if (Number(phoneNumber.charAt(0)) === 0) {
    return phoneNumber.substring(1);
  }

  let trimmedNumber = phoneNumber.replace("+91", "");
  if (trimmedNumber.length === 10) {
    return trimmedNumber;
  }

  let key = "";
  const results = trimmedNumber.replace(/[()-/\s]/g, (char) => key[char] || "");
  return results;
};

const numberArr = numbers.split("\n");
console.log(numberArr);

const formattedNumbers = numberArr.reduce((acc, current) => {
  const sanitizedNumber = formatIndianPhoneNumber(current);
  if (sanitizedNumber && sanitizedNumber.length === 10) {
    acc.push(`https://wa.me/+91${sanitizedNumber}`);
    //acc.push(`+91${sanitizedNumber}`);
  }
  return acc;
}, []);

console.log(formattedNumbers);

fs.writeFile(
  "./whatsAppLinks.json",
  JSON.stringify(formattedNumbers, null, 4),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  }
);
