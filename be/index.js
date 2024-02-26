import express from "express";
import cors from "cors";
import {
  updateFile,
  deleteFromFile,
  readFromFile,
  insertToFile,
} from "./file.js";

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
  // const index = user.findIndex((user) => {
  //   return request.query.id == user.id;
  // });
  // response.json(user[index]);

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

// const arr = [{ name: "zula", age: "30", lastName: "hi", id: 1 }, { name: "gal", age: "20", lastName: "hello", id: 2 }];

// app.get("/", (req, res) => {
//   res.send(arr);
// });

// app.post("/", (req, res) => {
//   console.log("hello world workin over here");
//   arr.push({ name: "duluu", age: "20", lastName: "hello", id: 3 });
//   res.send(arr);
// });

// app.delete("/", (req, res) => {
//   // Find the index of the object with id equal to  1
//   const indexToDelete = arr.findIndex(item => item.id ===  1);

//   // If the object is found, remove it from the array
//   if (indexToDelete !== -1) {
//     arr.splice(indexToDelete,  1);
//   }

//   // Send the updated array as a response
//   res.send(arr);
// });
