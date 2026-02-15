import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [state, setState] = useState("signin");
  const [file, setFile] = useState(null);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //handller login page
  useEffect(() => {
    if (token) {
      window.location.href = "/home";
    }
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handllerfileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLogin = async () => {
    switch (state) {
      case "signin":
        try {
          const response = await axios.post("api/user/login", {
            email: formdata.email,
            password: formdata.password,
          });

          console.log(response);

          if (response.status === 200) {
            // console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("profile_image", response.data.profile_image);
            localStorage.setItem("user", JSON.stringify(response.data.user)); //object to convert json
            navigate("/home");
          }
        } catch (error) {
          console.log(error);
        }
        break;
      case "signup":
        const file_data = new FormData();
        file_data.append("profile_image", file);
        file_data.append("name", formdata.name);
        file_data.append("email", formdata.email);
        file_data.append("password", formdata.password);

        try {
          const response = await axios.post(
            "api/user/registration",
            file_data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          console.log(response);

          if (response.status === 200) {
            console.log(response);
            setState("signin");
          }
        } catch (error) {
          console.log(error.response);
        }
        break;
      case "forget_password":
        try {
          const response = await axios.post("/");

          if (response.status === 200) {
            console.log(response.data);
          }
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        console.log("state not found");
        break;
    }
  };

  return (
    <>
      <div className="grid place-items-center h-screen select-none">
        <div className=" border rounded-2xl p-3 w-99 max-h-max  bg-blue-600">
          <p className="text-center text-2xl font-extrabold text-white">
            FaceBook
          </p>
          <hr className="text-white mb-3" />
          <h3 className="text-center pb-3 font-black text-2xl text-white">
            Sign In
          </h3>
          <div className="p-2 text-center text-white   ">
            <form action="" className="grid grid-row-1 gap-4">
              {state === "signup" && (
                <>
                  <div className=" ">
                    <input
                      type="file"
                      name="profile_image"
                      id="profile_image"
                      className="rounded-full w-20 h-20 border bg-white"
                      onChange={handllerfileChange}
                    />
                    <p>Profile Image</p>
                  </div>
                  <div className="grid grid-cols-2 place-items-center">
                    <label htmlFor="name">Name </label>
                    <input
                      type="text"
                      className=" rounded-2xl  p-1  border focus:outline-white"
                      placeholder="Enter your Name"
                      value={formdata.name}
                      onChange={handlechange}
                      name="name"
                      id="name"
                    />
                  </div>
                </>
              )}
              <div className="grid  grid-cols-2 place-items-center">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  className=" rounded-2xl  p-1  border focus:outline-white"
                  placeholder="Enter your Email"
                  value={formdata.email}
                  onChange={handlechange}
                  name="email"
                  id="email"
                />
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  value={formdata.password}
                  onChange={handlechange}
                  className="border rounded-2xl p-1 focus:outline-white"
                  name="password"
                  placeholder="••••••••"
                  id="password"
                />
              </div>
              {state === "forget_password" && (
                <div className="grid grid-cols-2 place-items-center">
                  <label htmlFor="password">Confirm Password </label>
                  <input
                    type="password"
                    value={formdata.confirmPass}
                    onChange={handlechange}
                    className="border rounded-2xl p-1 focus:outline-white"
                    name="confirmPass"
                    placeholder="••••••••"
                    id="confirmPass"
                  />
                </div>
              )}

              <input type="checkbox" name="remember" id="" required />
              <button
                type="button"
                onClick={() => handleLogin()}
                className="bg-white p-2  w-full text-blue-700 font-bold text-2xl transition-all duration-300  rounded-2xl m-3 "
                value="Login"
              >
                Login
              </button>
            </form>

            <hr />
            <section className="m-3">
              <div>
                <p>Other Option</p>
                <p>Facebook</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
