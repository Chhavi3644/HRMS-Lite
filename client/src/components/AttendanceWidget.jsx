import React, { useState } from 'react';
import { markAttendance } from '../services/api';

const AttendanceWidget = ({ employees, attendanceHistory, refreshData }) => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [status, setStatus] = useState('Present');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEmployee) return alert('Please select an employee');

        setLoading(true);
        try {
            await markAttendance({
                employee_id: selectedEmployee,
                date,
                status
            });
            refreshData();
            // Reset slightly

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>

            {/* Mark Attendance Form */}
            <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Mark Attendance</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Employee</label>
                        <select
                            className="form-control"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            required
                        >
                            <option value="">Select Employee...</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name} ({emp.employeeId})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Present"
                                    checked={status === 'Present'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <span className="badge badge-success">Present</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Absent"
                                    checked={status === 'Absent'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <span className="badge badge-danger">Absent</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Marking...' : 'Save Attendance'}
                    </button>
                </form>
            </div>

            {/* Recent Attendance List */}
            <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Recent Records</h3>
                <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                    {attendanceHistory.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No records yet.</p>
                    ) : (
                        <table style={{ fontSize: '0.875rem' }}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Employee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceHistory.map((record) => (
                                    <tr key={record.id}>
                                        <td style={{ whiteSpace: 'nowrap' }}>{record.date}</td>
                                        <td>{record.name}</td>
                                        <td>
                                            <span className={record.status === 'Present' ? 'badge badge-success' : 'badge badge-danger'}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceWidget;
