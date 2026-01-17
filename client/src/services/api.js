const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchEmployees = async () => {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
};

export const createEmployee = async (employee) => {
    const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create employee');
    return data;
};

export const deleteEmployee = async (id) => {
    const response = await fetch(`${API_URL}/employees/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete employee');
    return response.json();
};

export const fetchAttendance = async () => {
    const response = await fetch(`${API_URL}/attendance`);
    if (!response.ok) throw new Error('Failed to fetch attendance');
    return response.json();
};

export const markAttendance = async (data) => {
    const response = await fetch(`${API_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) throw new Error(res.error || 'Failed to mark attendance');
    return res;
};
