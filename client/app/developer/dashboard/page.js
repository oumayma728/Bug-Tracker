"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Fix() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await fetch("http://localhost:8000/bug");
        const data = await res.json();
        setBugs(data);
      } catch (error) {
        console.error("Failed to fetch bugs", error);
      }
    };
    fetchBugs();
  }, []);

  async function handleStatusChange(bugId, currentStatus) {
    const statuses = ["Unsolved", "In progress", "Solved"];
    const newStatus =
      statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
//This finds the index (position) of the current status.
// if currentStatus is "In Progress", it returns 1.
    try {
      const res = await fetch(`http://localhost:8000/bug/${bugId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setBugs((bugs) =>
          bugs.map((bug) =>
            bug._id === bugId ? { ...bug, status: newStatus } : bug
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  }

  async function handleDelete(bugId) {
    if (confirm("Are you sure you want to delete this bug?")) {
      try {
        await fetch(`http://localhost:8000/bug/${bugId}`, {
          method: "DELETE",
        });
        setBugs((prev) => prev.filter((bug) => bug._id !== bugId));
      } catch (error) {
        console.error("Failed to delete bug", error);
      }
    }
  }

  return (
    <div className="p-6">
      <h1>Developer dashboard</h1>
      <h1 className="text-xl font-bold text-center mb-4">Bugs</h1>

      <table className="w-full text-sm border">
        <thead>
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Project Name</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug._id}>
              <td className="p-2 border">{bug.title}</td>
              <td className="p-2 border">{bug.description}</td>
              <td className="p-2 border">{bug.priority}</td>
              <td className="p-2 border">{bug.projectName}</td>
              <td className="p-2 border">{bug.createdAt}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleStatusChange(bug._id, bug.status)}
                  className={`px-2 py-1 rounded text-white ${
                    bug.status === "Unsolved"
                      ? "bg-red-500"
                      : bug.status === "In progress"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {bug.status}
                </button>
              </td>
              <td className="p-2 border text-red-500">
                <button onClick={() => handleDelete(bug._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
