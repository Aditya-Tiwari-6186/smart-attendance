// /api/student/detail/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Student from '@/models/student'; 
import connectDB from '@/lib/db';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret'; 

function getUserIdFromToken(token: string) {
  try {
 //   console.log("secret",SECRET)
    const decoded = jwt.verify(token, SECRET) as { id: string };
  //  console.log("decoded" , decoded)
   // console.log("userid checking",decoded.id)
    return decoded.id;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }
    console.log('authHeader:', authHeader);
    console.log('Token:', authHeader.split(' ')[1]);

    const token = authHeader.split(' ')[1];
   // console.log("ujjwal" , token) 
    const userId = await getUserIdFromToken(token);
 
    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const student = await Student.findById(userId);

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error('Error fetching student details:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();

    const updatedStudent = await Student.findByIdAndUpdate(userId, body, { new: true });

    if (!updatedStudent) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error('Error updating student profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
