import { useEffect, useState } from "react";
import EditData from "@/components/editData";

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
  let userCreateStyle = {};
  let bodyBackgroundStyle = {};
  let userUpdateStyle = {};
  let position = {};
  // const mystyle = {
  //   color: "white",
  //   backgroundColor: "DodgerBlue",
  //   padding: "10px",
  //   fontFamily: "Arial"
  // };
  useEffect(() => {
    if (isPopupOpen) {
      position = { position: "relative", alignItems: "center" };
      userCreateStyle = { display: "hidden" };
      bodyBackgroundStyle = {
        backgroundColor: "#e2e8f0",
        position: "absolute",
        zIndex: 2,
        width: "100%",
        height: "100%",
      };
      userUpdateStyle = { position: "absolute", zIndex: 3 };
    }
    console.log("data is been changed");
  }, [data]);

  const updateMainData = (id, name, age, phone) => {
    let newJson = { id, name, age, phone };
    const index = data.findIndex((user) => {
      return id == user.id;
    });
    console.log("index", index);
    data[index] = { id: id, name: name, age: age, phone: phone };
    // const updateUser = {
    //   data[index].id: id,

    // }
    // const newData = data.filter((user) => {
    //   return user.id != id;
    // });
    // newData.push(newJson);

    // setData(newData);
    setData(data);
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
    <div
      style={position}
      className="container m-auto h-[100vh] flex justify-center"
    >
      <div
        style={userCreateStyle}
        className="flex flex-col items-center gap-[50px]"
      >
        <div className="w-[300px] h-[250px] border border-gray-300 px-3 py-5 flex flex-col gap-5 rounded-xl mt-[70px]">
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
        <div className="overflow-x-auto border border-gray-300 rounded-xl p-3">
          <table className="min-w-full divide-y divide-gray-400 ">
            <thead>
              <tr>
              <th>#</th>
                <th>id</th>
                <th>name</th>
                <th>age</th>
                <th>phone</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.map((el, i) => (
                <tr className="*:px-3 " key={el.id}>
                  <td className="w-10">{i+1}</td>
                  <td className="w-10">{el.id}</td>
                  <td className="w-[300px]">{el.name}</td>
                  <td className="w-3">{el.age}</td>
                  <td className="w-[150px]">{el.phone}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => editData(el.id, el.name, el.age, el.phone)}
                      className="border border-black rounded-md bg-yellow-100 py-1 px-4 active:bg-yellow-300"
                      aria-label="Edit item"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        // if (
                        //   window.confirm(
                        //     "Are you sure you want to delete this item?"
                        //   )
                        // ) {
                        //   deleteData(el.id);
                        // }
                        deleteData(el.id);
                      }}
                      className="border border-black rounded-md bg-red-100 py-1 px-4 active:bg-red-300"
                      aria-label="Delete item"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={bodyBackgroundStyle}></div>
      <div style={userUpdateStyle} className="">
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
