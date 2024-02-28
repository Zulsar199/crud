import { useState } from "react";

const EditData = (props) => {
  const [warningMessage, setWarningMessage] = useState("");
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
    setWarningMessage("");
  };

  const editData = async (event) => {
    event.preventDefault();
    console.log("event:", event);
    if (user.name === "" || user.age === "" || user.phone === "") {
      setWarningMessage("All fields are required.");
      return; // Prevent submission if there are validation errors
    }
    if (!/^[a-zA-Z]+$/.test(user.name)) {
      setWarningMessage("The name must consist of letters.");
      return;
    }
    if (user.name.length < 3 || user.name.length > 100) {
      setWarningMessage("The name must be between 3 and 100 characters long.");
      return;
    }
    // Assuming age and phone are numbers and have specific length requirements
    if (isNaN(user.age)) {
      setWarningMessage("Age must be number");
      return;
    }
    if (Number(user.age) >= 110) {
      setWarningMessage("Age must be less than 110");
      return;
    }
    if (isNaN(user.phone) || user.phone.length !== 8) {
      setWarningMessage("Phone must be an 8-digit number.");
      return;
    }

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
    <div className="w-[300px] bg-white border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl">
      <h1 className="text-center text-xl mb-5">User Update</h1>
      <form className="flex flex-col gap-3" onSubmit={editData}>
        <div className="flex justify-between">
          <label className="flex justify-between">Username:</label>
          <input
            onChange={(event) => handleInputChange(event)}
            className="border rounded-md"
            name="name"
            value={user.name}
          ></input>
        </div>

        <div className="flex justify-between">
          <label className="flex justify-between">Age:</label>
          <input
            onChange={(event) => handleInputChange(event)}
            className="border rounded-md"
            name="age"
            value={user.age}
          ></input>
        </div>
        <div className="flex justify-between">
          <label className="flex justify-between">Phone:</label>
          <input
            onChange={(event) => handleInputChange(event)}
            className="border rounded-md"
            name="phone"
            value={user.phone}
          ></input>
        </div>
        {warningMessage && <p style={{ color: "red" }}>{warningMessage}</p>}

        <button
          type="submit"
          className="border border-black bg-gray-100 rounded-md py-1 px-3 bg-gray-100 hover:bg-green-100 hover:border-green-400 active:bg-green-50"
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
