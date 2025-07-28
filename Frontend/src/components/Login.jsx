import React, { useRef, useState } from "react";
import { OthersSignin } from "./SmallComponents/OthersSignin";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/login";
import { ToastContainer, toast } from "react-toastify";
import BackgroundImage from "../assets/Abstract-Oval-Sharp--Streamline-Geometric-Gradient.png";

export const Login = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function getSignupPage() {
    navigate("/signup");
  }
  function toggleVisibility() {
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
  }

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    let email = emailRef.current.value;
    let pass = passRef.current.value;
    loginUser({ email, password: pass }, (err, result) => {
      setLoading(false);
      if (err) {
        toast.error("Something went wrong!");
        return;
      }
      if (result.token) {
        localStorage.setItem("token", result.token);
        toast.success("Login successful!");
        setTimeout(() => navigate("/"), 1700);
      } else {
        toast.error(result.message || "Invalid login credentials");
      }
    });
  }

  return (
    <div className="body h-screen bg-gray-800 text-center justify-center relative">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 text-white mb-6 shadow-[0px_-1px_3px_2px_rgba(0,0,0,0.25)] shadow-blue-600">
        <div className="text-3xl font-bold text-blue-500">TaskFlow</div>
        {/* Hide on mobile */}
        <div className="sm:flex hidden items-center space-x-5">
          <p className="text-sm">Don’t have an Account?</p>
          <button
            onClick={getSignupPage}
            className="bg-blue-500 py-2 px-3 border border-white hover:bg-sky-500 rounded-xl shadow-[-1px_7px_12px_rgba(0,0,0,0.25)] shadow-blue-600"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div
        className="
    form flex flex-col justify-center relative 
    backdrop-blur-md 
    p-4 sm:p-5 lg:p-6   /* reduce padding for large screens */
    w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 
    max-w-sm            /* smaller max width */
    h-auto mx-auto z-20 
    shadow-[0px_-1px_1px_1px_rgba(0,0,0,0.25)] 
    shadow-blue-600 
    rounded-md
  "
      >
        <div className="logo flex flex-col text-center mb-5">
          <h3 className="text-2xl font-bold text-blue-500">Welcome Back</h3>
          <p className="text-xs font-mono text-white">Manage Your Progress</p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="h-10 px-2 text-sm rounded-md focus:outline-none focus:ring-sky-500 focus:ring-2"
          />
          <input
            ref={passRef}
            id="password"
            type="password"
            placeholder="Password"
            className="h-10 px-2 text-sm rounded-md focus:outline-none focus:ring-sky-500 focus:ring-2"
          />
          <span className="text-left text-white text-xs">
            <input type="checkbox" id="Toggle" onClick={toggleVisibility} />{" "}
            Show Password
          </span>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 py-3 px-3 text-white rounded-xl shadow-[-1px_7px_12px_rgba(0,0,0,0.25)] shadow-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <h3 className="text-center mt-4 mb-4 text-white font-bold">OR</h3>
        <OthersSignin />

        {/* Mobile alternative sign-up link */}
        <p className="sm:hidden mt-4 text-white text-sm">
          Don’t have an account?{" "}
          <span
            onClick={getSignupPage}
            className="text-blue-400 underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>

      {/* Background image fix */}
      <div className="w-1/2 h-80 absolute -bottom-4 -left-4 overflow-hidden z-0">
        <img
          src={BackgroundImage}
          className="bg-transparent w-full"
          alt="Background"
        />
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};
