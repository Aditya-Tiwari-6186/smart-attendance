"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const data = [
  { label: "👨‍🎓 UG Students", value: 2105 },
  { label: "🎓 PG Students", value: 4112 },
  { label: "🔬 MS Scholars", value: 746 },
  { label: "📖 PhD Scholars", value: 2963 },
  { label: "👨‍🏫 Faculty", value: 591 },
  { label: "👥 Staff", value: 677 },
  { label: "🏅 Patents", value: 146 },
  { label: "📊 Projects", value: 829 },
];

const images = [
  "https://nitjsr.ac.in/backend/uploads/banner/add/ecb12f68-a5cb-4cec-aa33-c0ac7d622791-1.jpg",
  "https://nitjsr.ac.in/backend/uploads/banner/add/96a050e3-1f9b-4997-9956-71735fae2c15-Hockey%20Boys'%20team%20secured%203rd%20position.jpg",
  "https://nitjsr.ac.in/backend/uploads/banner/add/f6c1d386-7856-4a6e-94b4-b66aab1ef2cb-convo.JPG",
  "https://nitjsr.ac.in/backend/uploads/banner/add/1089dd82-decc-4ebe-bbd3-283a4775ce5a-23%20(1).jpg",
  "https://nitjsr.ac.in/backend/uploads/banner/add/676e345a-c030-464f-aac9-59077b6445ca-placement%20(1).jpg",
];

export default function HomePage() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const moveSlide = (direction: number) => {
    setIndex(
      (prevIndex) => (prevIndex + direction + images.length) % images.length
    );
  };

  return (
    <div className="bg-gradient-to-b from-white to-violet-100 min-h-screen p-5">
      <nav className="flex items-center p-5 bg-white shadow-lg rounded-2xl gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/7/7d/National_Institute_of_Technology%2C_Jamshedpur_Logo.png"
          alt="NIT JSR Logo"
          className="w-24 h-auto"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#191970]">राष्ट्रीय प्रौद्योगिकी संस्थान जमशेदपुर</h1>
          <p className="text-lg font-bold text-[#191970]">
            National Institute of Technology Jamshedpur, Jamshedpur
          </p>
          <p className="text-sm text-[#191970]">
            An Institute of National Importance Established by Government of India
          </p>
        </div>
      </nav>

      <div className="relative w-4/5 mx-auto overflow-hidden rounded-2xl bg-white mt-6 shadow-xl">
        <Button
          onClick={() => moveSlide(-1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-violet-600 text-white rounded-full"
        >
          &#10094;
        </Button>

        <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center bg-white">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`,
              width: `${images.length * 100}%`,
            }}
          >
            {images.map((src, i) => (
              <div key={i} className="w-full h-[70vh] flex items-center justify-center flex-shrink-0">
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="max-w-full max-h-full object-contain rounded-xl transition-opacity duration-500"
                />
              </div>

            ))}
          </div>

        </div>


        <Button
          onClick={() => moveSlide(1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-violet-600 text-white rounded-full"
        >
          &#10095;
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 my-10">
        {[
          {
            title: "For Students",
            icon: <GraduationCap className="text-violet-700 w-10 h-10" />,
            onClick: () => router.push("/student/login"),
          },
          {
            title: "For Faculty",
            icon: <Users className="text-violet-700 w-10 h-10" />,
            onClick: () => router.push("/faculty/login"),
          },
          {
            title: "For Administrator",
            icon: <Settings className="text-violet-700 w-10 h-10" />,
            onClick: () => router.push("http://127.0.0.1:5000/login"),
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="w-80 text-center hover:bg-violet-50 cursor-pointer"
            onClick={item.onClick}
          >
            <CardContent className="flex flex-col items-center p-6">
              {item.icon}
              <p className="text-violet-700 font-semibold text-lg mt-3">
                {item.title}
              </p>
              <p className="mt-2 text-gray-600">
                Find all resources for {item.title.toLowerCase()} in one place!
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-violet-700 text-white p-10 rounded-2xl shadow-md mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">NIT Jamshedpur by the Numbers</h2>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              tick={{ fill: "#ffffff", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="label"
              type="category"
              tick={{ fill: "#ffffff", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
              width={160}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", color: "#000", borderRadius: "8px" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar dataKey="value" fill="#c4b5fd" barSize={20} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="container mx-auto px-4">


        <div className="bg-gray-900 text-white p-10 mt-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-center">Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {[
              "Aerospace Engineering",
              "Applied Mechanics",
              "Biotechnology",
              "Chemical Engineering",
              "Chemistry",
              "Civil Engineering",
              "Computer Science and Engineering",
              "Data Science & Artificial Intelligence",
              "Electrical Engineering",
              "Engineering Design",
              "Humanities and Social Sciences",
              "Management Studies",
              "Mathematics",
              "Mechanical Engineering",
              "Medical Science and Technology",
              "Metallurgical and Materials Engineering",
              "Ocean Engineering",
              "Physics",
            ].map((dept, i) => (
              <p key={i} className="text-lg font-medium">
                {dept}
              </p>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white text-center p-5 mt-10 rounded-xl shadow-md">
        <p>&copy; 2025 NIT Jamshedpur. All rights reserved.</p>
      </footer>
    </div>
  );
}