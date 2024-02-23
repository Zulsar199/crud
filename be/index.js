import express from "express";
import cors from "cors";

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

let id = 1;

const user = [{ id, name: "Zulsar", age: 23, phone: "88888888" }];

app.get("/user", (request, response) => {
  const index = user.findIndex((user) => {
    return request.query.id == user.id;
  });
  response.json(user[index]);
});

app.get("/test", (request, response) => {
  console.log("user", user);
  response.json(user);
});

app.post("/user", (req, res) => {
  id++;
  user.push({
    id,
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
  });
  console.log(req.body);

  res.send(user);
});

app.patch("/user", (req, res) => {
  const index = user.findIndex((user) => {
    return req.body.id === user.id;
  });

  user[index].name = req.body.name;
  user[index].age = req.body.age;
  user[index].phone = req.body.phone;

  res.json({
    status: 200,
    message: "success",
  });
});

app.delete("/user", (req, res) => {
  const index = user.findIndex((user) => {
    return req.body.id === user.id;
  });
  user.splice(index, 1);

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
