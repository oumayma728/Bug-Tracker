"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (res.ok) {
    const token = data.accessToken;

    // Store token first
    localStorage.setItem("token", token);

    // Decode the token AFTER storing it
const decoded = jwtDecode(token);
    console.log("role:", decoded.role);

    alert("Login successful!");

    if (decoded.role === "admin") {
      router.push("/admin/dashboard");
    } else if (decoded.role === "developer") {
      router.push("/developer/dashboard");
    } else if (decoded.role === "reporter") {
      router.push("/reporter/dashboard");
    } else {
      router.push("/Bugs");
    }
  } else {
    alert(data.message || "Login failed");
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-white/0 border border-white/10 backdrop-blur-lg rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Bug Tracker Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-md"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link href="/Auth/Register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
