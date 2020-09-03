import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import *  as Yup from 'yup'
import UserService from '../services/UserService';

export default function ModalUser({handleNewUser, handleModal}) {
    
    const [roles, setRoles] = useState([])
    const [selected, setSelected] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        UserService.getRoles().then(response => {
            setRoles(response.data)
        })
    }, [])

    const RegistrationValidation = Yup.object().shape({
        firstName: Yup
        .string()
        .required('Required'),
        lastName: Yup
        .string()
        .required('Required'),
        email: Yup
        .string()
        .email()
        .required('Required'),
        username: Yup
        .string()
        .required('Required'),
        password: Yup
        .string()
        .required('Required'),
        workerCode: Yup
        .string()
        .min(5)
        .max(5)
        .required('Required')
    })

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            workerCode: ''
        },
        validationSchema: RegistrationValidation,
        onSubmit: ({firstName, lastName, email, username, password, workerCode}) => {
            if(selected.length > 0) {
                UserService.registerNewUser(firstName,lastName,email, username, password, workerCode, selected).then(response => {
                    handleNewUser(response.data)
                    handleModal()
                    Swal.fire({
                        title: 'Success!',
                        text: 'New user added.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }).catch(err => {
                    Swal.fire({
                        title: 'Error occured',
                        text: err,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })
            } else {
                setIsSelected(true)
            }
        }
    })

    const handleInputChange = (event, optionID) => {
        if (event.target.checked) {
            setSelected([...selected, optionID])
        } else {
            var array = [...selected]
            var index = array.indexOf(optionID)
            if(index !== -1) {
                array.splice(index, 1)
                setSelected(array)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="inputs">
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="firstName">First name:</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.firstName} id="firstName" name="firstName" type="text"/>
                            {touched.firstName && errors.firstName ? (
                                <div className="errorRed">{errors.firstName}</div>
                            ): null}
                        </span>
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="lastName">Last name:</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.lastName} id="lastName" name="lastName" type="text"/>
                            {touched.lastName && errors.lastName ? (
                                <div className="errorRed">{errors.lastName}</div>
                            ): null}
                        </span>
                    </div>
                </div>
                

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <span className="flexdisplay">
                        <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.email} id="email" name="email" type="text"/>
                        {touched.email && errors.email ? (
                            <div className="errorRed">{errors.email}</div>
                        ): null}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <span className="flexdisplay">
                        <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.username} id="username" name="username" type="text"/>
                        {touched.username && errors.username ? (
                            <div className="errorRed">{errors.username}</div>
                        ): null}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <span className="flexdisplay">
                        <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.password} id="password" name="password" type="password"/>
                        {touched.password && errors.password ? (
                            <div className="errorRed">{errors.password}</div>
                        ): null}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="workerCode">Worker ID:</label>
                    <span className="flexdisplay">
                        <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.workerCode} id="workerCode" name="workerCode" type="text"/>
                        {touched.workerCode && errors.workerCode ? (
                            <div className="errorRed">{errors.workerCode}</div>
                        ): null}
                    </span>
                </div>

                <div className="form-group">
                        <p>Role(s):{isSelected && <span style={{marginLeft: "10px", color: "red"}}>One role must be selected</span>}</p>
                        {roles.map((item) => {
                            return (
                                <label key={item.id} style={{marginRight: "25px"}}>
                                    <input name={item.name} type="checkbox" value={item.id} onChange={(e) => {handleInputChange(e, item.id)}} />
                                    {item.name}
                                </label>
                            )
                        })}
                </div>
                
                <div>
                    <button type="submit" className="btn btn-warning float-right-btn">Register</button>
                </div>
            </div>
        </form>
    )
};