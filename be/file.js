import fs from "fs";

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
  console.log("index ", index);
  console.log("id ", id);

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
