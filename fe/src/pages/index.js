import { useEffect, useState } from "react";
import EditData from "@/component/editData";

export default function Home() {
  const [data, setData] = useState([]);

  const [id, setId] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [user, setUser] = useState({
    name: "",
    age: "",
    phone: "",
  });

  const updateName = (name) => {
    setUser((prevUser) => ({
      ...prevUser,
      name,
    }));
  };

  const updateAge = (age) => {
    setUser((prevUser) => ({
      ...prevUser,
      age,
    }));
  };

  const updatePhone = (phone) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone,
    }));
  };

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/user", {
      method: "GET",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setData(res);
    console.log("data is ", data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    console.log("Handle close is working");
    setIsPopupOpen(false);

    console.log(isPopupOpen);
  };

  useEffect(() => {
    console.log("data is been changed");
  }, [data]);

  const updateMainData = (id, name, age, phone) => {
    let newJson = { id, name, age, phone };
    const newData = data.filter((user) => {
      return user.id != id;
    });
    newData.push(newJson);

    setData(newData);
  };

  const resetUser = () => {
    setUser((prevUser) => {
      const newUser = {};
      Object.keys(prevUser).forEach((key) => {
        newUser[key] = "";
      });
      return newUser;
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
      body: JSON.stringify(user),
    }).then((res) => res.json());
    setData(res);
    console.log(data);
    resetUser();
  };

  const editData = (id, editName, editAge, editPhone) => {
    setId(id);
    updateAge(editAge);
    updateName(editName);
    updatePhone(editPhone);

    handleOpenPopup();
  };

  const deleteData = async (id) => {
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

  return (
    <div className="container m-auto">
      <div>
        <div className="w-[300px] h-[250px] border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl ">
          <h1 className="text-center text-xl mb-5">User Create</h1>
          <form className="flex flex-col gap-3" onSubmit={addData}>
            <label className="flex justify-between">
              Username:
              <input
                onChange={(event) => updateName(event.target.value)}
                className="border rounded-md"
                name="name"
                value={user.name}
              ></input>
            </label>

            <label className="flex justify-between">
              Age:
              <input
                onChange={(event) => updateAge(event.target.value)}
                className="border rounded-md"
                name="age"
                value={user.age}
              ></input>
            </label>
            <label className="flex justify-between">
              Phone:
              <input
                onChange={(event) => updatePhone(event.target.value)}
                className="border rounded-md"
                name="phone"
                value={user.phone}
              ></input>
            </label>

            <button
              type="submit"
              className="border border-black bg-gray-100 rounded-md py-1 px-3 hover:bg-gray-100 active:bg-red-50"
            >
              Submit
            </button>
          </form>
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
            user={user}
            handleClose={handleClosePopup}
            setData={setData}
            updateMainData={updateMainData}
            resetUser={resetUser}
          ></EditData>
        )}
      </div>
    </div>
  );
}
