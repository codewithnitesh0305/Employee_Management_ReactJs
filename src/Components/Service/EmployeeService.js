import axios from "axios";
const REST_API_BASIC_URL = 'http://localhost:8081/api/User';
export const listEmployees = () => axios.get(REST_API_BASIC_URL);
export const createEmployee = (employee) => axios.post(REST_API_BASIC_URL,employee);
export const getEmployee = (employeeId) => axios.get(REST_API_BASIC_URL + '/' + employeeId);
export const updateEmployee = (employeeId,employee) => axios.put(REST_API_BASIC_URL + '/' + employeeId,employee);
export const deleteEmloyee = (employeeId) => axios.delete(REST_API_BASIC_URL + '/' + employeeId);