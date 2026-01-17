import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import AttendanceWidget from './components/AttendanceWidget';
import { fetchEmployees, fetchAttendance } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadData = async () => {
    try {
      const [empData, attData] = await Promise.all([
        fetchEmployees(),
        fetchAttendance()
      ]);
      setEmployees(empData.data || []);
      setAttendance(attData.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary-color)' }}>
              Employee Management
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
            <EmployeeForm onSuccess={loadData} />
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading...</div>
              ) : (
                <EmployeeList employees={employees} refreshData={loadData} />
              )}
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '1rem' }}>
            Daily Attendance
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Mark and view daily attendance records.</p>
          <AttendanceWidget
            employees={employees}
            attendanceHistory={attendance}
            refreshData={loadData}
          />
        </section>

      </div>
    </Layout>
  );
}

export default App;
