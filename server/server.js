const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database');
const { Employee, Attendance } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>HRMS Lite API</h1><p>Backend is running.</p>');
});

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ created_at: -1 });
        const data = employees.map(emp => {
            const obj = emp.toObject();
            obj.id = obj._id;
            return obj;
        });
        res.json({ message: "success", data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/employees', async (req, res) => {
    const { employeeId, name, email, department } = req.body;

    if (!employeeId || !name || !email || !department) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        const newEmployee = new Employee({ employeeId, name, email, department });
        await newEmployee.save();

        const responseData = newEmployee.toObject();
        responseData.id = responseData._id;

        res.status(201).json({ message: "success", data: responseData });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Employee ID or Email already exists." });
        }
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const result = await Employee.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "deleted", data: result });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format or error deleting" });
    }
});

app.post('/api/attendance', async (req, res) => {
    const { employee_id, date, status } = req.body;

    if (!employee_id || !date || !status) {
        return res.status(400).json({ error: "employee_id, date, and status are required" });
    }

    try {
        const record = await Attendance.findOneAndUpdate(
            { employee_id, date },
            { status },
            { new: true, upsert: true }
        );
        res.json({ message: "success", data: record });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/attendance', async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate('employee_id', 'name employeeId')
            .sort({ date: -1 });

        const flatRecords = records.map(rec => {
            const r = rec.toObject();
            if (r.employee_id) {
                r.name = r.employee_id.name;
                r.employeeId = r.employee_id.employeeId;
                r.employee_id = r.employee_id._id;
                r.id = r._id;
            }
            return r;
        });

        res.json({ message: "success", data: flatRecords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/attendance/:employee_id', async (req, res) => {
    try {
        const records = await Attendance.find({ employee_id: req.params.employee_id }).sort({ date: -1 });
        res.json({ message: "success", data: records });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
