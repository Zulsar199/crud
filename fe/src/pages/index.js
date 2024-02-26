import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import EditData from "@/component/editData";

export default function Home() {
  const [name, setName] = useState("hi");
  const [age, setAge] = useState("99");
  const [phone, setPhone] = useState("00000000");
  const [data, setData] = useState([]);

  const [id, setId] = useState();
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState();
  const [editPhone, setEditPhone] = useState("");
  // console.log(name);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const handleOpenPopup = () => {
  //   setIsPopupOpen(true);
  // };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    console.log("data is been changed");
  }, [data]);

  const updateMainData = (id, name, age, phone) => {
    data.forEach((element) => {
      if (element.id == id) {
        element.name = name;
        element.age = age;
        element.phone = phone;
      }
    });
  };

  const addData = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, age: age, phone: phone }),
    }).then((res) => res.json());
    setData(res);
    console.log(data);
  };

  const testData = () => {
    console.log("HELLO", data);
  };

  const editData = (id, editName, editAge, editPhone) => {
    console.log(
      "editName = ",
      editName,
      " editAge = ",
      editAge,
      " editPhone = ",
      editPhone
    );
    setEditAge(editAge);
    setEditName(editName);
    setEditPhone(editPhone);
    setId(id);
    setIsPopupOpen(true);
  };

  const deleteData = async (id) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/user", {
      method: "DELETE",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json());
    setData(res);
    console.log(data);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="container m-auto">
      <div>
        <div className="w-[300px] h-[250px] border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl ">
          <h1 className="text-center text-xl mb-5">User Create</h1>
          <form className="flex flex-col gap-3" onSubmit={addData}>
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
              type="submit"
              className="border border-black bg-gray-100 rounded-md py-1 px-3 hover:bg-gray-100 active:bg-red-50"
            >
              Submit
            </button>
          </form>
          <button onClick={testData}>asdf</button>
        </div>
        <div className="w-[700px] h-[250px] border border-gray-300 px-3 py-5 flex gap-5 rounded-xl ">
          <ul>
            <div className="flex gap-4 font-bold">
              <li>id</li>
              <li>name</li>
              <li>age</li>
              <li>phone</li>
            </div>

            {data?.map((el) => (
              <div key={el.id} className="flex gap-4">
                <li>{el.id}</li>
                <li>{el.name}</li>
                <li>{el.age}</li>
                <li>{el.phone}</li>
                <button
                  onClick={() => editData(el.id, el.name, el.age, el.phone)}
                  className="border border-black rounded-md bg-yellow-100 py-1 px-4"
                >
                  edit
                </button>
                <button
                  onClick={() => deleteData(el.id)}
                  className="border border-black rounded-md bg-red-100 py-1 px-4"
                >
                  delete
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="">
        {isPopupOpen && (
          <EditData
            id={id}
            name={editName}
            age={editAge}
            phone={editPhone}
            handleClose={handleClosePopup}
            setData={setData}
            updateMainData={updateMainData}
          ></EditData>
        )}
      </div>
    </div>
  );
}
