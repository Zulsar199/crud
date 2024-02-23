import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState({ name: "hi" });
  const [age, setAge] = useState({ age: "99" });
  const [phone, setPhone] = useState({ phone: "00" });
  const [data, setData] = useState();
  // console.log(name);
  const addData = async () => {
    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, phone }),
    }).then((res) => {
      return res;
    });
    console.log(data);
  };

  const testData = () => {
    console.log("HELLO", data);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="container m-auto">
      <div className="w-[300px] h-[250px] border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl ">
        <h1 className="text-center text-xl mb-5">User CRUD</h1>
        <form className="flex flex-col gap-3">
          <label className="flex justify-between">
            Username:
            <input
              onChange={(event) => setName(event.target.value)}
              className="border rounded-md"
              name="username"
            ></input>
          </label>

          <label className="flex justify-between">
            Age:
            <input
              onChange={(event) => setAge(event.target.value)}
              className="border rounded-md"
              name="age"
            ></input>
          </label>
          <label className="flex justify-between">
            Phone:
            <input
              onChange={(event) => setPhone(event.target.value)}
              className="border rounded-md"
              name="age"
            ></input>
          </label>

          <button
            onClick={addData}
            className="border border-black bg-gray-100 rounded-md py-1 px-3 hover:bg-gray-100 active:bg-red-50"
          >
            Submit
          </button>
          <button
            onClick={testData}
            className="border border-black bg-gray-100 rounded-md py-1 px-3 hover:bg-gray-100 active:bg-red-50"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-[700px] h-[250px] border border-gray-300 px-3 py-5 flex gap-5 rounded-xl ">
        <ul>
          id
          {data?.map((el) => (
            <li>{el.id}</li>
          ))}
        </ul>
        <ul>
          <h1>Username</h1>
          {data?.map((el) => (
            <li>{el.name}</li>
          ))}
        </ul>
        <ul>
          <h1>Age</h1>
          {data?.map((el) => (
            <li>{el.age}</li>
          ))}
        </ul>
        <ul>
          <h1>Phone</h1>
          {data?.map((el) => (
            <li>{el.phone}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
