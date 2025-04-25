"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

// Define the types for the data
interface AttendanceData {
    total_attendance: number;
    // total_class : number;
}

interface StudentProfile {
    rollNo: string;
    name: string;
}

const AttendancePage: React.FC = () => {
    const router = useRouter();
    const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
    const [studentInfo, setStudentInfo] = useState<StudentProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    let presentAtt = 0;
    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/student/login");
                    return;
                }
                const profileRes = await fetch("/api/student/detail", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const profileData = await profileRes.json();
                if (!profileRes.ok) {
                    toast.error(profileData.message || "Failed to fetch student details");
                    return;
                }
                setStudentInfo(profileData);
                const attendanceRes = await fetch("/api/student/attendance", {
                    method: "POST",
                    body: JSON.stringify({ rollNo: profileData.rollNo }),
                });

                const attendance = await attendanceRes.json();
                 //console.log("attendance" , attendance);
                if (!attendanceRes.ok) {
                    toast.error(attendance.message || "Failed to fetch attendance data");
                    return;
                }

                // Set attendance data
                 //presentAtt  = attendance;
                setAttendanceData(attendance);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Something went wrong while fetching data");
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, [router]);

    const getAttendanceColor = (percentage: number) => {
        if (percentage >= 85) return "bg-green-500";
        if (percentage >= 75) return "bg-yellow-400";
        return "bg-red-500";
    };

    const dummyCourses = [
        { courseId: "CS101", courseName: "Computer Science Basics", instructor: "Dr. A. Kumar" },
        { courseId: "MATH201", courseName: "Mathematics II", instructor: "Prof. B. Singh" }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!studentInfo) {
        return <div>No student data found!</div>;
    }

    if (!attendanceData) {
        return <div>No attendance data found!</div>;
    }


    const totalClasses = 30;  
// 
    const percentage = Math.round((attendanceData.total_attendance / totalClasses) * 100);
    const colorClass = getAttendanceColor(percentage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-500 to-blue-400 p-6 text-black">
            <Navbar />

            <div className="text-center my-8">
                <h1 className="text-3xl font-bold text-white">Student Attendance</h1>
                <p className="text-xl mt-2 font-semibold text-white">
                    Roll No: <span className="font-bold">{studentInfo.rollNo}</span> | Name: <span className="font-bold">{studentInfo.fullName}</span>
                </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="p-3">COURSE ID</th>
                            <th className="p-3">COURSE NAME</th>
                            <th className="p-3">INSTRUCTOR</th>
                            <th className="p-3">TOTAL PRESENT</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {dummyCourses.map((course, idx) => {
                            return (
                                <tr key={idx} className="hover:bg-violet-50">
                                    <td className="p-3">{course.courseId}</td>
                                    <td className="p-3">{course.courseName}</td>
                                    <td className="p-3">{course.instructor}</td>
                                    <td className="p-3">
                                        {attendanceData.total_attendance}
                                    </td>
                                    {/* <td className="p-3">
                                        <span className={`px-4 py-1 rounded-full text-white font-semibold ${colorClass}`}>
                                            {percentage}%
                                        </span>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Navbar: React.FC = () => {
    return (
        <div className="w-full bg-gradient-to-r from-violet-400 via-violet-300 to-blue-300 shadow-lg py-4 px-6 flex items-center justify-center relative rounded-md">
            <img
                src="https://upload.wikimedia.org/wikipedia/en/7/7d/National_Institute_of_Technology%2C_Jamshedpur_Logo.png"
                alt="NIT Jamshedpur Logo"
                className="absolute left-4 h-12 w-auto"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 text-center">
                National Institute of Technology, Jamshedpur
            </h1>
        </div>
    );
};

export default AttendancePage;
