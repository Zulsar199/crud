import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState({ name: "hi" });
  const [age, setAge] = useState({ age: "99" });
  const [phone, setPhone] = useState({ phone: "00" });
  // console.log(name);
  const createData = async () => {
    const data = await fetch("http://localhost:8080/user", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, age: age, phone: phone }),
    });
    console.log(data);
  };
  const addData = () => {
    // console.log(name);
    createData();
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
              onChange={(event) => setName( event.target.value )}
              className="border rounded-md"
              name="username"
            ></input>
          </label>

          <label className="flex justify-between">
            Age:
            <input
              onChange={(event) => setAge( event.target.value )}
              className="border rounded-md"
              name="age"
            ></input>
          </label>
          <label className="flex justify-between">
            Phone:
            <input
              onChange={(event) => setPhone(event.target.value )}
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
        </form>
      </div>
      <div className="w-[700px] h-[250px] border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl ">
        <div>
          <h1>Username</h1>
        </div>
        <div>
          <h1>Age</h1>
        </div>
        <div>
          <h1>Phone</h1>
        </div>
      </div>
    </div>
  );
}
