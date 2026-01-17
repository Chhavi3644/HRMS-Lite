import React, { useState } from 'react';

const EmployeeForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        email: '',
        department: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Dynamic import to avoid circular dependency in build if any (though here it is fine)
            const { createEmployee } = await import('../services/api');
            await createEmployee(formData);
            setFormData({ employeeId: '', name: '', email: '', department: '' });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="card animate-fade-in" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Add New Employee</h3>
            {error && (
                <div style={{
                    backgroundColor: '#FEF2F2',
                    color: '#991B1B',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Employee ID</label>
                    <input
                        className="form-control"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="e.g. EMP001"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Department</label>
                    <select
                        className="form-control"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
