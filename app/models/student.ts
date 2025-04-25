// models/Student.js
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  enrolled: { type: String, required: true },
  major: { type: String, required: true },
  skills: { type: [String], default: [] },
  rollNo: { type: String, required: true, unique: true },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;
