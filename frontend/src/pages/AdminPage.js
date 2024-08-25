import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetail from '../components/EmployeeDetail';
import AddressForm from '../components/AddressForm';

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/employees">Manage Employees</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/:id" element={<EmployeeDetail />} />
                <Route path="/employees/:id/addresses" element={<AddressForm />} />
            </Routes>
        </div>
    );
};

export default AdminPage;
