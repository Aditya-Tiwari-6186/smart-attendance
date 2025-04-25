// app/study-material/page.tsx
"use client";

import { useState } from "react";

const books = [
  { title: "Database Systems", subject: "DBMS", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpLbgSuAGc6DJQk4OuBEyNMmBPF7Sik8_3Q&s", link: "https://en.wikipedia.org/wiki/Database" },
  { title: "Operating System Concepts", subject: "OS", image: "https://cdn.shopify.com/s/files/1/0855/1446/files/OS-buddies-1-1024x570.jpg", link: "https://en.wikipedia.org/wiki/Operating_system" },
  { title: "Computer Architecture", subject: "COA", image: "https://t4.ftcdn.net/jpg/07/62/73/67/360_F_762736702_fO5GzY33TcWpxr6LcDTp02QLR1kr4V2F.jpg", link: "https://en.wikipedia.org/wiki/Computer_architecture" },
  { title: "Artificial Intelligence", subject: "AI", image: "https://www.willbhurd.com/wp-content/uploads/2023/01/DALL%C2%B7E-2024-01-07-08.01.49-An-eye-catching-and-informative-lead-image-for-a-blog-about-artificial-intelligence-for-beginners.-The-image-should-visually-represent-the-concept-of-.png", link: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
  { title: "Web Technologies", subject: "IWT", image: "https://miro.medium.com/v2/resize:fit:1200/0*M4bxiCIjcTK-2Xr6.jpeg", link: "https://en.wikipedia.org/wiki/Web_technology" },
];

const subjects = ["All", "DBMS", "OS", "COA", "AI", "IWT"];

export default function StudyMaterial() {
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredBooks = selectedSubject === "All" ? books : books.filter(book => book.subject === selectedSubject);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-violet-100 p-8">
      <h1 className="text-3xl font-bold text-violet-700 mb-8 text-center">Study Material</h1>

      <div className="flex justify-center mb-8">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border border-violet-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBooks.map((book, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center">
            <img src={book.image} alt={book.title} className="w-32 h-40 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold text-violet-700 text-center">{book.title}</h2>
            <button
              onClick={() => window.open(book.link, "_blank")}
              className="mt-4 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded transition duration-300"
            >
              View Material
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
