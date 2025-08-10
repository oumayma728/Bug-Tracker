"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Sign up successful!");
      localStorage.setItem("token", data.accessToken);
    } else {
      alert(data.message || "Sign up failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center ">
<div className="w-full max-w-md p-8 bg-white/0 border border-white/30 backdrop-blur-md rounded-xl shadow-lg space-y-6 text-white">
        <h1 className="text-4xl font-bold text-center text-white-700">
          Bug Tracker
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border  bg-white/0  border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white/0 "
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white/0 "
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white/0 "
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none bg-black "
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="reporter">Reporter</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link href="/Auth/Login" className="text-blue-600 hover:underline ml-1">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
