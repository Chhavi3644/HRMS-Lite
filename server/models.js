const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const attendanceSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true }
});

// Compound index to ensure one attendance record per employee per day
attendanceSchema.index({ employee_id: 1, date: 1 }, { unique: true });

const Employee = mongoose.model('Employee', employeeSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = { Employee, Attendance };
