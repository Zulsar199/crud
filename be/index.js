import express from "express";
import cors from "cors";
import fs from "fs";

function readFromFile() {
  const data = fs.readFileSync("dataBase.json");
  return JSON.parse(data);
}

function insertToFile(data) {
  const allData = readFromFile();
  allData.push(data);

  fs.writeFileSync("dataBase.json", JSON.stringify(allData));
  return allData;
}

function updateFile(id, name, age, phone) {
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

function deleteFromFile(id) {
  const allData = readFromFile();
  const filteredData = allData.filter((user) => {
    return id !== user.id;
  });

  fs.writeFileSync("dataBase.json", JSON.stringify(filteredData));

  return filteredData;
}

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

let id = 0;

const findMaxID = () => {
  const data = readFromFile();
  console.log("hello world", data);
  data.forEach((element) => {
    if (element.id > id) {
      id = element.id;
    }
  });
};

findMaxID();

console.log("maxid = ", id);

app.get("/test", (request, response) => {
  const data = readFromFile();
  response.send(data);
});

app.get("/user", (request, response) => {
  const data = readFromFile();
  response.send(data);
});

app.post("/user", (req, res) => {
  id++;

  insertToFile({
    id,
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
  });

  res.send(readFromFile());
});

app.patch("/user", (req, res) => {
  console.log("id=", req.body.id);
  console.log("body=", req.body);
  const updatedData = updateFile(
    req.body.id,
    req.body.name,
    req.body.age,
    req.body.phone
  );

  res.json({
    status: 200,
    message: "success",
    updatedData,
  });
});

app.delete("/user", (req, res) => {
  const data = deleteFromFile(req.body.id);

  res.json(data);
  res.send("amjilttai ustgalaa");
});

app.listen(port, () => {
  console.log(`ene port deer server  aslaa http://localhost:${port}`);
});
