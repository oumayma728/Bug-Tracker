"use client";
import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen  flex items-center justify-center p-6">
<div className="w-full max-w-md p-8 bg-white/0 border border-white/30 backdrop-blur-md rounded-xl shadow-lg space-y-6 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link
              href="/admin/Users"
              className="block text-center bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 rounded-lg shadow hover:bg-white/20 transition"
            >
              ✅ Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/Bugs"
              className="block text-center bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 rounded-lg shadow hover:bg-white/20 transition"
            >
              📊 View Bug Stats
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
