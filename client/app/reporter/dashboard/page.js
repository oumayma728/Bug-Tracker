"use client"; //file runs on client-side
import React, { useState } from "react";

export default function AddBug() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setpriority] = useState("");
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");

  async function handleAdd(e) {
  e.preventDefault();

  const newBugData = {
    title,
    description,
    priority,
    projectName,
    status:'Unsolved',
  };

  console.log("Sending bug data:", newBugData);

  try {
    const res = await fetch("http://localhost:8000/bug/CreateBug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBugData),
    });

    const responseBody = await res.json(); // get the full response

    if (!res.ok) {
      console.error("❌ Backend rejected the request:", responseBody);
      alert("Bug creation failed: " + JSON.stringify(responseBody.message));
      return;
    }

    console.log("✅ Bug created successfully:", responseBody);

    setBugs((prev) => [...prev, responseBody]);
    setTitle("");
    setDescription("");
    setpriority("");
    setProjectName("");
    alert("Bug created!");
  } catch (error) {
    console.error("❌ Failed to send request to backend:", error);
    alert("Request failed. Check console for details.");
  }
}


  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-xl font-bold text-center mb-4">Report new Bug</h1>
      <form onSubmit={handleAdd} className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2"
        />
        <select
          value={priority}
          onChange={(e) => setpriority(e.target.value)}
          required
          className="border p-2 bg-white text-black"
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
          className="border p-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="border p-2 bg-white text-black"
        >
          <option value="Unsolved">Unsolved</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Bug
        </button>
      </form>
    </div>
  );
}
