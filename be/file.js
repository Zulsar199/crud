import fs from "fs";

// const data = fs.readFile("text.txt");
// console.log(data.toString());

const data = fs.readFileSync("text.txt");
// fs.readFile("text.txt", (err, data) => console.log(data.toString()));
console.log("data", data.toString());

const data2 = [{ id: 1, name: "Zulsar", age: 23, phone: "88888888" }];
// fs.writeFileSync("dataBase.json", JSON.stringify(data2));

const stringify = JSON.stringify(data2);
const parse = JSON.parse(stringify);
console.log(stringify, "---", parse);
// const getData = async() => {
//     const data = fs.readFile("text.txt", (err, data) => console.log(data.toString()));
//     return data;
// }
// console.log(textFiles, "hello");

export function readFromFile() {
  const data = fs.readFileSync("dataBase.json");
  return JSON.parse(data);
}

export function insertToFile(data) {
  const allData = readFromFile();
  allData.push(data);

  fs.writeFileSync("dataBase.json", JSON.stringify(allData));
  return allData;
}

export function updateFile(id, name, age, phone) {
  const allData = readFromFile();
  const index = allData.findIndex((user) => {
    return id === user.id;
  });

  allData[index].name = name;
  allData[index].age = age;
  allData[index].phone = phone;

  fs.writeFileSync("dataBase.json", JSON.stringify(allData));

  return allData;
}

export function deleteFromFile(id) {
  const allData = readFromFile();
  const index = allData.findIndex((user) => {
    return id === user.id;
  });
  allData.splice(index, 1);

  fs.writeFileSync("dataBase.json", JSON.stringify(allData));

  return allData;
}
