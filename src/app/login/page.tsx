"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await (
        await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          body: JSON.stringify(formData),
        })
      ).json();
      if (response?.success) {
        router.push("/");
        toast.success(response?.message, {
          duration: 2000,
          position: "top-right",
        });
        return;
      }
      toast.error(response?.error, { duration: 2000, position: "top-right" });
    } catch (error) {
      toast.error("Something went wrong", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="font-bold text-3xl text-center text-blue-600 mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Login to access your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/signup" className="text-blue-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
