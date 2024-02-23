import fs from "fs";

// const data = fs.readFile("text.txt");
// console.log(data.toString());

const data = fs.readFileSync("text.txt");
fs.readFile("text.txt", (err, data) => console.log(data.toString()));
console.log("data", data.toString());

const data2 = {"age":9, "name":"kk"};
fs.writeFileSync("dataBase.json", JSON.stringify(data2));

const stringify = JSON.stringify(data2);
const parse = JSON.parse(stringify);
console.log(stringify, "---", parse);
// const getData = async() => {
//     const data = fs.readFile("text.txt", (err, data) => console.log(data.toString()));
//     return data;
// }
// console.log(textFiles, "hello");
