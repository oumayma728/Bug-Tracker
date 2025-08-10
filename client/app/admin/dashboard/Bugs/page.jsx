// app/Bugs/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Bugs() {
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


  async function handleDelete(bugId) {
    if (confirm("Are you sure you want to delete this bug?")) {
      try {
        await fetch(`http://localhost:8000/bug/${bugId}`, {
          method: "DELETE",
        });
        setBugs((prev) => prev.filter((bug) => bug.id !== bugId));
      } catch (error) {
        console.error("Failed to delete bug", error);
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-center mb-4">Bugs</h1>
      <Link href="/admin/Bugs/AddBug">
  <button>Add Bug</button>
</Link>

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
            <th className="p-2 border">{bug.status}</th>

              <td className="p-2 border text-red-500">
                <button onClick={() => handleDelete(bug.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
