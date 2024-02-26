import { useEffect, useState } from "react";
export default function EditData(props) {
  const [name, setName] = useState(props.name);
  const [age, setAge] = useState(props.age);
  const [phone, setPhone] = useState(props.phone);

  const editData = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/user", {
      method: "PATCH",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        name: name,
        age: age,
        phone: phone,
      }),
    }).then((res) => res.json());
    //     props.setData(res);
    props.updateMainData(props.id, name, age, phone);
    props.handleClose;
  };

  console.log(props.name, props.age, props.phone, props.id);

  console.log(name, age, phone, props.id);

  return (
    <div className="w-[300px] h-[250px] border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl ">
      <h1 className="text-center text-xl mb-5">User Update</h1>
      <form className="flex flex-col gap-3" onSubmit={editData}>
        <label className="flex justify-between">
          Username:
          <input
            onChange={(event) => setName(event.target.value)}
            className="border rounded-md"
            name="username"
            value={name}
          ></input>
        </label>

        <label className="flex justify-between">
          Age:
          <input
            onChange={(event) => setAge(event.target.value)}
            className="border rounded-md"
            name="age"
            value={age}
          ></input>
        </label>
        <label className="flex justify-between">
          Phone:
          <input
            onChange={(event) => setPhone(event.target.value)}
            className="border rounded-md"
            name="phone"
            value={phone}
          ></input>
        </label>

        <button
          type="submit"
          className="border border-black bg-gray-100 rounded-md py-1 px-3 hover:bg-gray-100 active:bg-red-50"
        >
          Save
        </button>
      </form>
    </div>
  );
}
