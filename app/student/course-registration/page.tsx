"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";

const branches = [
  "Computer Science", "Mechanical Engineering", "Electrical Engineering",
  "Civil Engineering", "Electronics & Communication", "Information Technology",
  "Chemical Engineering", "Biotechnology"
];

const semesters = [
  "Semester 1", "Semester 2", "Semester 3", "Semester 4",
  "Semester 5", "Semester 6", "Semester 7", "Semester 8"
];

type Course = {
  sNo: number;
  title: string;
  credits: number;
  syllabus: string;
};

type CoursesByBranch = {
  [branch: string]: {
    [semester: string]: Course[];
  };
};

const courses: CoursesByBranch = {
  "Computer Science": {
    "Semester 1": [
      { sNo: 1, title: "Intro to Programming", credits: 4, syllabus: "/syllabus1.pdf" },
      { sNo: 2, title: "Mathematics I", credits: 3, syllabus: "/syllabus2.pdf" },
    ],
    "Semester 2": [
      { sNo: 1, title: "Data Structures", credits: 5, syllabus: "/syllabus3.pdf" },
      { sNo: 2, title: "Mathematics II", credits: 3, syllabus: "/syllabus4.pdf" },
    ],
  }
};

const CourseWebsiteLayout = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md flex justify-between items-center p-4 rounded-lg mb-6">
        <Image
          src="/profile-placeholder.png"
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full border-2 border-gray-300"
        />
        <h1 className="text-lg font-semibold">Student Name</h1>
        <Button variant="outline" className="flex items-center">
          <Home className="mr-1" /> Home
        </Button>
      </nav>

      <h1 className="text-3xl font-bold mb-6 text-center">Course Details</h1>

      <div className="flex flex-col items-center mb-6">
        <select
          className="p-3 border rounded-md w-1/2 mb-4"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        {selectedBranch && (
          <select
            className="p-3 border rounded-md w-1/2"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedBranch && selectedSemester && courses[selectedBranch]?.[selectedSemester] && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">S. No</th>
                <th className="p-3">Course Title</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Syllabus</th>
              </tr>
            </thead>
            <tbody>
              {courses[selectedBranch][selectedSemester].map((course) => (
                <tr key={course.sNo} className="text-center border-b">
                  <td className="p-3">{course.sNo}</td>
                  <td className="p-3">{course.title}</td>
                  <td className="p-3">{course.credits}</td>
                  <td className="p-3">
                    <a
                      href={course.syllabus}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseWebsiteLayout;
