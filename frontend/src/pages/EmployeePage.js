import React, { useEffect, useState } from 'react';
import { getEmployee } from '../services/api';
import { useParams } from 'react-router-dom';

const EmployeePage = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployee(id);
                setEmployee(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch employee', err);
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (!employee) return <p>Employee not found.</p>;

    return (
        <div>
            <h1>Your Profile</h1>
            <p>Name: {employee.firstName} {employee.lastName}</p>
            <p>Job Title: {employee.jobTitle}</p>
            <p>Start Date: {employee.startDate}</p>
            <p>Birthdate: {employee.birthdate}</p>
            <img src={employee.photoUrl} alt={`${employee.firstName}'s photo`} />
            <h2>Addresses</h2>
            <ul>
                {employee.addresses.map(address => (
                    <li key={address.id}>
                        {address.street}, {address.city}, {address.state}, {address.country} - {address.addressType}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeePage;
