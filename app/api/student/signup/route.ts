// /app/api/student/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Student from '@/models/student'; 

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { fullName, email, phone, enrolled, major, skills = '', rollNo } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !enrolled || !major || !rollNo) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json({ success: false, message: 'Student already exists' }, { status: 409 });
    }

    // Create a new student
    const newStudent = new Student({
      fullName,
      email,
      phone,
      enrolled,
      major,
      skills: skills.split(',').map((skill: string) => skill.trim()).filter((s: string) => s.length > 0),
      rollNo,
    });
    await newStudent.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Student registered successfully',
      token,
      student: {
        id: newStudent._id,
        fullName: newStudent.fullName,
        email: newStudent.email,
      }
    }, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Signup Error:', error.message);
    } else {
      console.error('Signup Error:', error);
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
