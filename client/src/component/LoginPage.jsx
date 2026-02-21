import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";

const LoginPage = () => {
  const [state, setState] = useState("signin");
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmpass: "",
  });

  const handleImage = () => {
    imageRef.current.click();
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //handller login page
  useEffect(() => {
    if (token) {
      window.location.href = "/home";
    }
  }, [token]);

  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handllerfileChange = (e) => {
    setFile(e.target.files[0]);
    const [file] = profile_image.files;
    blash.src = URL.createObjectURL(file);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    switch (state) {
      case "signin":
        try {
          const response = await axios.post("api/user/login", {
            email: formdata.email,
            password: formdata.password,
          });

          if (response.status === 200) {
            // console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("profile_image", response.data.profile_image);
            localStorage.setItem("user", JSON.stringify(response.data.user));
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

          if (response.status === 200) {
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
            console.log(response.data); //handle a backend not completed
          }
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
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
          <h3 className="text-center pb-3 font text-2xl text-white">
            {state === "signin"
              ? "Login"
              : state === "signup"
                ? "Create Account"
                : "Forget Password"}
          </h3>
          <div className="p-2 text-center text-white   ">
            <form className="grid grid-row-1 gap-4" onSubmit={handleLogin}>
              {state === "signup" && (
                <>
                  <div className="justify-items-center-safe">
                    <img
                      src="#"
                      id="blash"
                      onClick={handleImage}
                      alt="your image"
                      className="rounded-full w-20 h-20 border bg-white"
                    />
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
                      required
                    />
                  </div>

                  {/* used of the input a profile image*/}
                  <input
                    type="file"
                    name="profile_image"
                    id="profile_image"
                    ref={imageRef}
                    style={{ display: "none" }}
                    onChange={handllerfileChange}
                  />
                </>
              )}
              <div className="grid grid-cols-2 place-items-center">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  className=" rounded-2xl  p-1  border focus:outline-white"
                  placeholder="Enter your Email"
                  value={formdata.email}
                  onChange={handlechange}
                  name="email"
                  id="email"
                  required
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
                  required
                />
              </div>
              {state === "forget_password" && (
                <div className="grid grid-cols-2 place-items-center">
                  <label htmlFor="password">Confirm Password </label>
                  <input
                    type="password"
                    value={formdata.confirmpass}
                    onChange={handlechange}
                    className="border rounded-2xl p-1 focus:outline-white"
                    name="confirmpass"
                    placeholder="••••••••"
                    id="confirmpass"
                    required
                  />
                </div>
              )}
              <div className="flex relative left-15 gap-3 ">
                <input type="checkbox" name="remember" id="remember" required />
                <label htmlFor="remember">I agree to the terms</label>
              </div>
              <button
                type="submit"
                className="bg-white p-2 active:scale-95  w-full text-blue-700 font-bold text-2xl transition-all duration-200  rounded-2xl m-3 "
                value="Login"
              >
                {state === "signin"
                  ? "Login"
                  : state === "signup"
                    ? "Create Account"
                    : "forget password"}
              </button>
            </form>

            {state === "signin" && (
              <Link to={"#"} onClick={() => setState("forget_password")}>
                forget password ?
              </Link>
            )}

            {state === "forget_password" && (
              <Link to={"#"} onClick={() => setState("signup")}>
                Create New Account ?
              </Link>
            )}

            {state === "signup" && (
              <Link to={"#"} onClick={() => setState("signin")}>
                allready account ?
              </Link>
            )}

            <hr />
            <section className="m-3">
              <div>
                <p>Other Option</p>
                <div className="flex justify-center gap-20 pt-3">
                  <div className="backdrop-blur-md p-1 rounded-2xl justify-items-center-safe w-full hover:scale-99 duration-200  bg-gray-400 ">
                    <FcGoogle className="text-2xl " />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
