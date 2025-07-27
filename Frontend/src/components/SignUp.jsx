import React, { useRef } from "react";
import { OthersSignin } from "./SmallComponents/OthersSignin";
import { signupUser } from "../api/signup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmRef = useRef(null);

  const getLoginPage = () => navigate("/login");

  const toggleVisibility = () => {
    let pass = document.getElementById("password");
    let confirmpass = document.getElementById("ConfirmPassword");
    const type = pass.type === "password" ? "text" : "password";
    pass.type = type;
    confirmpass.type = type;
  };

  async function handleSignup(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const confirmpass = confirmRef.current.value;

    if (!name || !email || !pass) {
      toast.warning("All fields are required");
      return;
    }

    if (pass !== confirmpass) {
      toast.info("Passwords do not match!");
      return;
    }

    try {
      const result = await signupUser({ name, email, password: pass });
      toast.success(result.msg);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message || "Signup failed. Try again.");
    }
  }

  return (
    <div className="body h-screen bg-gray-800 text-center justify-center overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between p-2 text-white mb-6 shadow-[0px_-1px_3px_2px_rgba(0,0,0,0.25)]">
        <div className="logo flex flex-col">
          <div className="text-3xl font-bold text-blue-500">TaskFlow</div>
          <p className="text-xs font-mono text-white">
            Your Productivity Partner
          </p>
        </div>

        {/* Hide this section on mobile */}
        <div className="sm:flex hidden items-center space-x-5">
          <p className="text-sm">Already have an Account?</p>
          <button
            onClick={getLoginPage}
            className="bg-blue-500 py-2 px-3 border border-white rounded-xl shadow-[-1px_7px_12px_rgba(0,0,0,0.25)] shadow-blue-600 hover:bg-sky-500"
          >
            Login
          </button>
        </div>
      </div>

      {/* Signup Form */}
      <div className="form bg-gray-800 flex flex-col justify-center relative backdrop-blur-md p-3 px-7 w-11/12 sm:w-1/3 mx-auto z-20 shadow-[1px_0px_2px_1px_rgba(0,0,0,0.25)] shadow-blue-600 rounded-md">
        <div className="flex flex-col text-center mb-5">
          <h3 className="text-2xl font-bold text-blue-500">
            Register YourSelf
          </h3>
          <p className="text-xs font-mono text-white">To be Productive</p>
        </div>

        <form
          action=""
          method="post"
          className="flex flex-col gap-2"
          onSubmit={handleSignup}
        >
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter Your Name"
            className="h-10 px-2 rounded-md py-1 text-sm focus:outline-none focus:ring-sky-500 focus:ring-2"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter Your Email"
            className="h-10 px-2 rounded-md text-sm focus:outline-none focus:ring-sky-500 focus:ring-2"
          />
          <input
            ref={passRef}
            id="password"
            type="password"
            placeholder="Choose Your Password"
            className="h-10 px-2 rounded-md text-sm focus:outline-none focus:ring-sky-500 focus:ring-2"
          />
          <input
            ref={confirmRef}
            id="ConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="h-10 px-2 rounded-md text-sm focus:outline-none focus:ring-sky-500 focus:ring-2"
          />
          <span className="text-left text-white text-xs">
            <input type="checkbox" id="Toggle" onClick={toggleVisibility} />{" "}
            Show Password
          </span>
          <input
            type="submit"
            value="Sign Up"
            className="bg-blue-500 py-3 mt-1 px-3 border border-white text-white rounded-xl shadow-[-1px_7px_12px_rgba(0,0,0,0.25)] shadow-blue-600 hover:bg-sky-500"
          />
        </form>

        <h3 className="text-center mt-4 text-white font-bold">OR</h3>
        <OthersSignin />

        {/* Show login link for mobile only */}
        <p className="sm:hidden mt-4 text-white text-sm">
          Already have an account?{" "}
          <span
            onClick={getLoginPage}
            className="text-blue-400 underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

      {/* Background image (fix z-index) */}
      <div className="w-1/2 h-80 absolute -bottom-4 -left-4 overflow-hidden z-0">
        <img
          src="src/assets/Abstract-Oval-Sharp--Streamline-Geometric-Gradient.png"
          className="bg-transparent w-full"
          alt="Background"
        />
      </div>

      <ToastContainer
        theme="dark"
        hideProgressBar={false}
        position="bottom-right"
      />
    </div>
  );
};
