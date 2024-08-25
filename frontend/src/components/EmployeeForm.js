import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EmployeeForm = ({ employee, onSave }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState(employee || {});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (employee) {
            await axios.put(`/api/employees/${employee.id}`, formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
        } else {
            await axios.post('/api/employees', formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="date"
                name="birthdate"
                value={formData.birthdate || ''}
                onChange={handleChange}
                placeholder="Birthdate"
                required
            />
            <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle || ''}
                onChange={handleChange}
                placeholder="Job Title"
                required
            />
            <input
                type="date"
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleChange}
                placeholder="Start Date"
                required
            />
            <input
                type="file"
                name="photo"
                onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default EmployeeForm;
