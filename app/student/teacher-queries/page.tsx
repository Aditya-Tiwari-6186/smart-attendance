// app/teacher-queries/page.tsx
"use client";

import { useState } from "react";

const teachers = ["Dr. Smith", "Prof. Johnson", "Dr. Williams", "Prof. Brown"];

export default function TeacherQueries() {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`Query sent to ${selectedTeacher}: ${message}`);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-violet-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-violet-700 mb-8">Teacher Queries</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl space-y-4">
        <label className="block text-violet-600 font-semibold">Select Teacher:</label>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="w-full p-2 border border-violet-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">-- Select --</option>
          {teachers.map((teacher, idx) => (
            <option key={idx} value={teacher}>{teacher}</option>
          ))}
        </select>

        <label className="block text-violet-600 font-semibold">Your Query:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full p-2 border border-violet-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Type your message here..."
        />

        <button
          onClick={handleSend}
          className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
          disabled={!selectedTeacher || !message}
        >
          Send
        </button>
      </div>
    </div>
  );
}
