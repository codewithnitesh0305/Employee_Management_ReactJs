import { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../Service/EmployeeService";
import {useNavigate, useParams} from 'react-router-dom';

function AddEmployee() {
    const [name, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const navigator =  useNavigate( );
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        phoneNo:'',
        address:''
    })
    //It take the user Id from the url
    const {id} = useParams();

    //This method is responsiable for show employee data by id in update employee
    useEffect(()=>{
        if(id){
            getEmployee(id).then((response) => {
                setEmpName(response.data.name);
                setEmail(response.data.email);
                setPhoneNo(response.data.phoneNo);
                setAddress(response.data.address);
            }).catch(error => {
                console.log(error)
            })
        }
    },[id])

    function handleEmpName(e) {
        setEmpName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePhoneNo(e) {
        setPhoneNo(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
    }

    //This method save or update the employee
    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if(validateForm()){
            const employee = { name, email, phoneNo, address };
            if(id){
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data);
                    navigator("/")
                }).catch(error => {
                    console.log(error)
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/')
                }).catch(error =>{
                    console.log(error)
                })
            }
            
        }
        
    }

    function validateForm(){
        let valid = true;
        const errorsCopy ={... errors}
        if(name.trim()){
            errorsCopy.name = '';
        }else{
            errorsCopy.name = 'Field name is required';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'Field email is required';
            valid = false;
        }
        if(phoneNo.trim()){
            errorsCopy.phoneNo = '';
        }else{
            errorsCopy.phoneNo = 'Field phoneNo is required';
            valid = false;
        }
        if(address.trim()){
            errorsCopy.address = '';
        }else{
            errorsCopy.address = 'Field address is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h1 className="text-center">Update Employee</h1>
        }else{
            return <h1 className="text-center">Add Employee</h1>
        }
    }
    return (
        <div className="container">
            <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
                <div className="col-md-6">
                    <div className="card">
                        {
                            pageTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="empName" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid': ''}`}
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={handleEmpName}
                                    />
                                    {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid': ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNo" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.phoneNo ? 'is-invalid': ''}`}
                                        id="phoneNo"
                                        name="phoneNo"
                                        value={phoneNo}
                                        onChange={handlePhoneNo}
                                    />
                                    {errors.phoneNo && <div className='invalid-feedback'>{errors.phoneNo}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.address ? 'is-invalid': ''}`}
                                        id="address"
                                        name="address"
                                        value={address}
                                        onChange={handleAddress}
                                    />
                                    {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={saveOrUpdateEmployee}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
