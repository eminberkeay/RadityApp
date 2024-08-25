import axios from "axios";

const API_URL = "http://localhost:8000";

export const createEmployee = async (employee) => {
  const formData = new FormData();
  for (let key in employee) {
    formData.append(key, employee[key]);
  }
  const response = await axios.post(`${API_URL}/employees/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees/`);
  return response.data;
};

export const getEmployee = async (employeeId) => {
  const response = await axios.get(`${API_URL}/employees/${employeeId}`);
  return response.data;
};

export const createAddress = async (employeeId, address) => {
  const response = await axios.post(`${API_URL}/employees/${employeeId}/addresses/`, address);
  return response.data;
};
