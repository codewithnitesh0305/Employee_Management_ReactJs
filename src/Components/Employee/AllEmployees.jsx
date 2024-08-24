import React, {useEffect, useState} from 'react';
import { deleteEmloyee, listEmployees } from '../Service/EmployeeService';
import {useNavigate} from 'react-router-dom';

function AllEmployees() {
    const[employees,setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    },[])

    //This method is responsiable for get all the data from the server and show in allEmployees page
    function getAllEmployees(){
        listEmployees().then((responce) => {
            setEmployees(responce.data);
        }).catch(error =>{
            console.log(error)
        }) 
    }
    //This method is responsiable for to navigate employee list page to editEmployee page
    const navigator =  useNavigate( );
    function updateEmployee(id){
       navigator(`/editEmployee/${id}`)
    }

    //This method is responsiable for deleteEmployee from list page
    function removeEmployee(id){
        console.log(id);
        deleteEmloyee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="container" style={{marginTop: "10px"}}>
            <div className="row">
                <h1 className="text-center">All Employees Details</h1>
                <div className="col-md-12">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">SNo.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone No.</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(employee =>
                                <tr key={employee.id}>
                                    <th scope="row">{employee.id}</th>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phoneNo}</td>
                                    <td>{employee.address}</td>
                                    <td>
                                        <button class="btn btn-success"
                                            role="button" style={{marginRight: "5px"}}
                                            onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button class="btn btn-danger"
                                             role="button"
                                             onClick={() => removeEmployee(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AllEmployees;