'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentDashboard() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enrolled, setEnrolled] = useState('');
  const [major, setMajor] = useState('');
  const [skills, setSkills] = useState('');
  const [rollNo, setRollNo] = useState('');

  useEffect(() => {
    // ✅ Fetch student details from API
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/student/login');
          return;
        }

        const res = await fetch('/api/student/detail', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch student details');
          return;
        }

        // Fill data in state
        setFullName(data.fullName || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setEnrolled(data.enrolled || '');
        setMajor(data.major || '');
        setSkills(data.skills || '');
        setRollNo(data.rollNo || '');

      } catch (error) {
        console.error('Error fetching student details:', error);
        toast.error('Something went wrong while fetching details');
      }
    };

    fetchStudentDetails();
  }, [router]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/student/login');
        return;
      }

      const updatedProfile = { fullName, email, phone, enrolled, major, skills, rollNo };

      const res = await fetch('/api/student/detail', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to update profile');
        return;
      }

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Something went wrong while updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/student/login');
  };

  const menuItems = [
    { label: '🙋 Attendance', path: 'attendance' },
    { label: '🔔 Notice', path: 'notifications' },
    { label: '📝 Assignments', path: 'assignments' },
    { label: '📊 Exam Results', path: 'exam-results' },
    { label: '🗓 Timetable', path: 'timetable' },
    { label: '📖 Study Materials', path: 'study-materials' },
    { label: '📚 Course Registration', path: 'course-registration' },
    { label: '👨‍🏫 Teacher Queries', path: 'teacher-queries' },
    { label: '🎓 Internship Opportunities', path: 'internship-opportunities' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-500 to-indigo-700 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/3 p-6 flex flex-col justify-between min-h-screen">
        <nav>
          <ul className="space-y-6 text-lg font-semibold">
            <li>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="hover:bg-purple-600 px-4 py-2 block rounded transition duration-300 w-full text-left"
              >
                ✏ Edit Profile
              </button>
            </li>
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={`/student/${item.path}`}
                  className="hover:bg-purple-600 px-4 py-2 block rounded transition duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="hover:bg-red-600 px-4 py-2 block rounded cursor-pointer transition duration-300 w-full text-left"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-center border-t border-gray-500 pt-4">
          © 2025 Student Portal
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10 bg-white text-gray-900">
        <div className="flex flex-col items-center border-b-4 pb-6">
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <Image
              src="/default-profile.jpg" 
              alt="Profile Pic"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>

          {isEditing ? (
            <>
              <EditableField label="Full Name" value={fullName} setValue={setFullName} />
              <EditableField label="Email" value={email} setValue={setEmail} />
              <EditableField label="Phone" value={phone} setValue={setPhone} />
              <EditableField label="Enrolled Date" value={enrolled} setValue={setEnrolled} />
              <EditableField label="Major" value={major} setValue={setMajor} />
              <EditableField label="Skills" value={skills} setValue={setSkills} />
              <EditableField label="Roll Number" value={rollNo} setValue={setRollNo} />

              <button
                onClick={handleSave}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mt-4 text-gray-800">{fullName}</h2>
              <p className="text-lg mt-2 text-gray-700">Email: {email}</p>
              <p className="text-lg mt-2 text-gray-700">Phone: {phone}</p>
              <p className="text-lg mt-2 text-gray-700">Enrolled: {enrolled}</p>
              <p className="text-lg mt-2 text-gray-700">Major: {major}</p>
              <p className="text-lg mt-2 text-gray-700">Skills: {skills}</p>
              <p className="text-lg mt-2 text-gray-700">Roll No: {rollNo}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

type EditableFieldProps = {
  label: string;
  value: string;
  setValue: (val: string) => void;
};

function EditableField({ label, value, setValue }: EditableFieldProps) {
  return (
    <div className="mt-4 w-full">
      <label className="text-gray-600 font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 w-full text-lg text-center text-gray-800 border-b-2 border-gray-400 outline-none"
      />
    </div>
  );
}
