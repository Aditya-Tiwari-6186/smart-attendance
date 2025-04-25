'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';  // 👈 Import toast
import 'react-toastify/dist/ReactToastify.css'; // 👈 Import css (already globally once is enough)

export default function StudentAuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enrolled, setEnrolled] = useState('');
  const [major, setMajor] = useState('');
  const [skills, setSkills] = useState('');
  const [rollNo, setRollNo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await fetch('/api/student/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, rollNo }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Login failed'); // 👈 toast error
          return;
        }

        localStorage.setItem('token', data.token);

        toast.success('Login successful!'); // 👈 toast success
        router.push('/student/home');
      } else {
        // SIGNUP
        const res = await fetch('/api/student/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            enrolled,
            major,
            skills,
            rollNo,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Signup failed'); // 👈 toast error
          return;
        }

        toast.success('Signup successful! Please login.'); // 👈 toast success
        setIsLogin(true); 
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Something went wrong.'); // 👈 toast fallback
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-700 p-6">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          {isLogin ? 'Student Login' : 'Student Signup'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <InputField label="Full Name" value={fullName} setValue={setFullName} />
              <InputField label="Phone" value={phone} setValue={setPhone} />
              <InputField label="Enrolled Date" value={enrolled} setValue={setEnrolled} />
              <InputField label="Major" value={major} setValue={setMajor} />
              <InputField label="Skills" value={skills} setValue={setSkills} />
            </>
          )}

          <InputField label="Email" value={email} setValue={setEmail} type="email" />
          <InputField label="Roll No" value={rollNo} setValue={setRollNo} />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-700 font-semibold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

function InputField({ label, value, setValue, type = 'text' }: { label: string, value: string, setValue: (val: string) => void, type?: string }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}
