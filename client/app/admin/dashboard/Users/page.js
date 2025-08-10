"use client";
import React, { useEffect, useState } from "react";

export default function UserManagementModal() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/user");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className=" shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6 ">Users</h1>
        <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden">
          <thead>
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Bugs</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
<tr key={index} className="hover:bg-green-600 hover:text-black transition-colors duration-200">
                <td className="p-3 border-b border-white-200">{user.name}</td>
                <td className="p-3 border-b border-white-200">{user.email}</td>
                <td className="p-3 border-b border-white-200">{user.role}</td>
                <th className="p-3 text-left text-sm font-semibold text-white-700">View Bugs reported</th>

            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
  );
}
