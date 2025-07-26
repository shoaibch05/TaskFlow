import React, { useRef, useState } from "react";
import { OthersSignin } from "./SmallComponents/OthersSignin";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/login";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const emailRef = useRef("null");
  const passRef = useRef("null");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function getSignupPage() {
    navigate("/signup");
  }
  function toggleVisibility() {
    let pass = document.getElementById("password");

    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }
  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    let email = emailRef.current.value;
    let pass = passRef.current.value;
    loginUser({ email, password: pass }, (err, result) => {
      setLoading(false);
      if (err) {
        console.error("Login failed:", err);
        toast.error("Something went wrong!");
        return;
      }

      if (result.token) {
        localStorage.setItem("token", result.token); // Store token
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/"); // Navigate to some protected page
        }, 1700);
      } else {
        toast.error(result.message || "Invalid login credentials");
      }
    });
  }

  return (
    <div className="body h-screen bg-gray-800 text-center justify-center ">
      <div className="flex items-center justify-between p-4 text-white mb-6 shadow-[0px_-1px_3px_2px_rgba(0,0,0,0.25)] shadow-blue-600 ">
        <div className="text-3xl font-bold bg text-blue-500">TaskFlow</div>
        <div className="flex s items-center space-x-5  ">
          <p className="text-sm">Dont have an Account?</p>

          <button
            onClick={getSignupPage}
            className="bg-blue-500 py-2 px-3 border-1 hover:bg-sky-500 border-solid border-white rounded-xl shadow-[-1px_7px_12px_rgba(0,0,0,0.25)] shadow-blue-600 "
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="form flex flex-col justify-center  relative backdrop-blur-md p-3 px-7 w-1/3 h-3/4 mx-auto  z-20 shadow-[0px_-1px_1px_1px_rgba(0,0,0,0.25)] shadow-blue-600 rounded-md">
        <div className="logo flex flex-col text-center mb-5 ">
          <h3 className=" text-2xl font-bold text-blue-500 ">Welcome Back</h3>
          <p className=" text-xs font-mono text-white ">Manage Your Progress</p>
        </div>

        <form action="" method="post" className="flex flex-col gap-2">
          <input
            type="email"
            ref={emailRef}
            name="email"
            placeholder="Full Name"
            className="h-10 px-2 text-sm rounded-md"
          />

          <input
            placeholder="Password"
            ref={passRef}
            type="password"
            name="password"
            id="password"
            className="h-10 px-2 text-sm rounded-md"
          />
          <span>
            <input type="checkbox" id="Toggle" onClick={toggleVisibility} />{" "}
            Show Password
          </span>
          <button
            type="submit"
            disabled={loading}
            onClick={handleLogin}
            className={`bg-blue-500 py-3 px-3 text-white rounded-xl shadow-[-1px_7px_12px_rgba(0,0,0,0.25)] shadow-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <h3 className="text-center mt-4 mb-4 text-white text-bold"> OR </h3>
        <OthersSignin />
      </div>
      <div className="w-1/2 h-80 absolute -bottom-4 -left-4 overflow-hidden -z-1">
        <img
          src="src/assets/Abstract-Oval-Sharp--Streamline-Geometric-Gradient.png"
          className="bg-transparent w-full"
          alt="Picture is not loaded"
        />
      </div>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};
