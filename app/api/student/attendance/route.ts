import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { rollNo } = body;

    if (!rollNo) {
      return NextResponse.json({ error: 'rollNo is required in request body' }, { status: 400 });
    }

    const record = await mongoose.connection
      .collection('studentAttendance')
      .findOne({ _id: rollNo }); 

    if (!record) {
      return NextResponse.json({ message: 'Attendance not found' }, { status: 404 });
    }

    return NextResponse.json(record, { status: 200 });
  } catch (err) {
    console.error('Error fetching attendance:', err);
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}
