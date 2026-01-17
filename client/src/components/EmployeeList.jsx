import React from 'react';
import { deleteEmployee } from '../services/api';

const EmployeeList = ({ employees, refreshData }) => {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                refreshData();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (employees.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No employees found. Add one above.
            </div>
        );
    }

    return (
        <div className="card animate-fade-in">
            <h3 style={{ marginBottom: '1rem' }}>Employee Directory</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{emp.employeeId}</td>
                                <td>
                                    <div style={{ fontWeight: 500 }}>{emp.name}</div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{emp.email}</td>
                                <td>
                                    <span style={{
                                        padding: '0.125rem 0.5rem',
                                        background: '#F1F5F9',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        color: '#475569',
                                        fontWeight: 500
                                    }}>
                                        {emp.department}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
