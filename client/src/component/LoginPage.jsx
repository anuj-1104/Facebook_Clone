import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [state, setState] = useState("signin");
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);
  const [error, setError] = useState("");
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirm_pass: "",
  });

  //click a image to ref to access a hidden field access
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
    const [file] = profile_image.files; //access first image
    blash.src = URL.createObjectURL(file); //access a property of image id to src
  }; //used a method to create a url and pass on the src property in image element render image

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    switch (state) {
      case "signin":
        try {
          const response = await axios.post("api/user/login", {
            email: formdata.email,
            password: formdata.password,
          });

          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("profile_image", response.data.profile_image);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/home");
          }
        } catch (error) {
          setError(error.response.data.message);
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
          setError(error.response.data.message);

          console.log(error.response);
        }
        break;
      case "forget_password":
        try {
          const response = await axios.patch("/api/user/forget_password", {
            email: formdata.email,
            password: formdata.password,
            confirm_pass: formdata.confirm_pass,
          });

          if (response.status === 200) {
            console.log(response); //handle a backend not completed
            setState("signin");
          }
        } catch (error) {
          setError(error.response.data.message);
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
        setError("");
        break;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen select-none">
        <div className="hidden md:flex items-center justify-center bg-white">
          <div className="text-center px-8">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">facebook</h1>
            <p className="text-2xl text-gray-700">
              Connect with friends and the world around you on Facebook.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <form className="space-y-4" onSubmit={handleLogin}>
              {state === "signup" && (
                <>
                  <div className="flex justify-center mb-4">
                    <img
                      src="#"
                      id="blash"
                      onClick={handleImage}
                      alt="Profile Image"
                      className="rounded-full w-20 h-20 border-2 border-gray-300 bg-gray-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your Name"
                      value={formdata.name}
                      onChange={handlechange}
                      name="name"
                      id="name"
                      required
                    />
                  </div>

                  {/* Hidden file input for profile image */}
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

              <div>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address or phone number"
                  value={formdata.email}
                  onChange={handlechange}
                  name="email"
                  id="email"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={formdata.password}
                  onChange={handlechange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="password"
                  placeholder="Password"
                  id="password"
                  required
                />
              </div>

              {state === "forget_password" && (
                <div>
                  <input
                    type="password"
                    value={formdata.confirm_pass}
                    onChange={handlechange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="confirm_pass"
                    placeholder="Confirm Password"
                    id="confirm_pass"
                    required
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                  <p className="font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
              >
                {state === "signin"
                  ? "Log In"
                  : state === "signup"
                    ? "Create Account"
                    : "Reset Password"}
              </button>

              {state === "signin" && (
                <div className="text-center">
                  <a
                    href="#"
                    onClick={() => setState("forget_password")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Forgotten password?
                  </a>
                </div>
              )}

              {state === "signin" && (
                <div className="border-t pt-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setState("signup")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
                  >
                    Create New Account
                  </button>
                </div>
              )}

              {state === "signup" && (
                <div className="text-center mt-4">
                  <a
                    href="#"
                    onClick={() => setState("signin")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Already have an account?
                  </a>
                </div>
              )}

              {state === "forget_password" && (
                <div className="text-center mt-4">
                  <a
                    href="#"
                    onClick={() => setState("signin")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Back to Login
                  </a>
                </div>
              )}
            </form>

            {state === "signin" && (
              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-gray-600 mb-3">Other Options</p>
                <div className="flex justify-center">
                  <button className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition duration-200">
                    <FcGoogle className="text-xl" />
                    <span className="ml-2 text-sm font-medium">
                      Continue with Google
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
