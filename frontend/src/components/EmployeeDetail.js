import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetail = ({ match }) => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            const { data } = await axios.get(`/api/employees/${match.params.id}`);
            setEmployee(data);
        };

        fetchEmployee();
    }, [match.params.id]);

    if (!employee) return <div>Loading...</div>;

    return (
        <div>
            <h1>{employee.firstName} {employee.lastName}</h1>
            <p>Job Title: {employee.jobTitle}</p>
            <p>Start Date: {employee.startDate}</p>
            <p>Birthdate: {employee.birthdate}</p>
            <h2>Addresses</h2>
            <ul>
                {employee.addresses.map(address => (
                    <li key={address.id}>{address.street}, {address.city}</li>
                ))}
            </ul>
            <img src={employee.photo} alt="Employee" />
        </div>
    );
};

export default EmployeeDetail;
