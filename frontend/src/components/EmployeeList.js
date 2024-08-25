import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchEmployees = async () => {
            const { data } = await axios.get(`/api/employees?page=${page}`);
            setEmployees(data);
        };

        fetchEmployees();
    }, [page]);

    const handleSort = async (column) => {
        const { data } = await axios.get(`/api/employees?sort=${column}&page=${page}`);
        setEmployees(data);
    };

    return (
        <div>
            <h1>Employee List</h1>
            <button onClick={() => handleSort('startDate')}>Sort by Start Date</button>
            <button onClick={() => handleSort('lastName')}>Sort by Last Name</button>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.firstName} {employee.lastName} - {employee.jobTitle}
                    </li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default EmployeeList;
