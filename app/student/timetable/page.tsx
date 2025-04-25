"use client";

import React from "react";

interface Schedule {
  day: string;
  slots: string[];
}

const schedule: Schedule[] = [
  { day: "Monday", slots: ["DBMS", "OS", "IWT", "AI", "", "DBMS Lab", "DBMS Lab", "", ""] },
  { day: "Tuesday", slots: ["DBMS", "OS", "COA", "AI", "", "", "", "", ""] },
  { day: "Wednesday", slots: ["DBMS", "IWT", "COA", "AI", "", "PY Lab", "", "", ""] },
  { day: "Thursday", slots: ["IWT", "OS", "COA", "", "", "", "", "", ""] },
  { day: "Friday", slots: ["", "OS", "COA", "", "", "OS Lab", "OS Lab", "PF Lab-I", "PF Lab-I"] }
];

const timeSlots: string[] = [
  "8:30-9:25 AM", "9:30-10:25 AM", "10:30-11:25 AM", "11:30-12:25 PM", "12:30-1:55 PM",
  "2:00-2:55 PM", "3:00-3:55 PM", "4:00-4:55 PM", "5:05-6:55 PM"
];

const StudentRoutine = () => {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-white bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl shadow-lg mb-6">
        Student Routine System
      </h1>
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="min-w-full border border-gray-300 shadow-xl rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
              <th className="border px-4 py-2">Day</th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="border px-4 py-2">{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, index) => (
              <tr key={index} className="border odd:bg-blue-100 even:bg-purple-100 hover:bg-pink-200 transition duration-300">
                <td className="border px-4 py-2 font-semibold text-blue-700">{row.day}</td>
                {row.slots.map((subject, subIndex) => (
                  <td key={subIndex} className="border px-4 py-2 text-center text-purple-800 font-medium">
                    {subject || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRoutine;
