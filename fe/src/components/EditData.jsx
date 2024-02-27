import { useState } from "react";

const EditData = (props) => {
  const [user, setUser] = useState({
    id: props.id,
    name: props.user.name,
    age: props.user.age,
    phone: props.user.phone,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const editData = async (event) => {
    event.preventDefault();
    console.log("event:", event);

    const res = await fetch("http://localhost:8080/user", {
      method: "PATCH",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        age: user.age,
        phone: user.phone,
      }),
    }).then((res) => res.json());
    // setData(res);
    props.updateMainData(props.id, user.name, user.age, user.phone);
    props.resetUser();
    props.handleClose();
  };

  console.log(props.user.name, props.user.age, props.user.phone, props.id);

  console.log(user, props.id);

  return (
    <div className="w-[300px] h-[400px] bg-white border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl">
      <h1 className="text-center text-xl mb-5">User Update</h1>
      <form className="flex flex-col gap-3" onSubmit={editData}>
        <label className="flex justify-between">Username:</label>
        <input
          onChange={(event) => handleInputChange(event)}
          className="border rounded-md"
          name="name"
          value={user.name}
        ></input>

        <label className="flex justify-between">Age:</label>
        <input
          onChange={(event) => handleInputChange(event)}
          className="border rounded-md"
          name="age"
          value={user.age}
        ></input>
        <label className="flex justify-between">Phone:</label>
        <input
          onChange={(event) => handleInputChange(event)}
          className="border rounded-md"
          name="phone"
          value={user.phone}
        ></input>

        <button
          type="submit"
          className="border border-black bg-gray-100 rounded-md py-1 px-3 hover:bg-gray-100 active:bg-red-50"
        >
          save
        </button>
      </form>
    </div>
  );
};
export default EditData;
// if(typeof input !=== string)
// input length >=3
// yup schema
