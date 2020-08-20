import React from 'react'
import {useFormik} from 'formik'
import *  as Yup from 'yup'

export default function RegisterForm() {

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
        .min(8)
        .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$", 'Password must be minimum 8 characters long and contain at least one lowercase letter, one uppercase letter and a number')
        .required('Required'),
    })

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        },
        validationSchema: RegistrationValidation,
        onSubmit: ({firstName, lastName, email, username, password}) => {
            alert(`FN: ${firstName}, LN: ${lastName}, email: ${email}, username: ${username}, password: ${password}`)
        }
    })
    return (
        <div>
            <h2 className="formH2">Register</h2>
            <div className="lineRegister centerRegister">
                <form onSubmit={handleSubmit} className="formRegister centerRegister">
                    <div className="inputs">
                        <div className="form-group">
                            <label htmlFor="firstName" className="labels">First name:</label>
                            <span className="flexdisplay">
                                <input onChange={handleChange} onBlur={handleBlur} className="form-control width33em" value={values.firstName} id="firstName" name="firstName" type="text"/>
                                {touched.firstName && errors.firstName ? (
                                    <div className="error">{errors.firstName}</div>
                                ): null}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="labels">Last name:</label>
                            <span className="flexdisplay">
                                <input onChange={handleChange} onBlur={handleBlur} className="form-control width33em" value={values.lastName} id="lastName" name="lastName" type="text"/>
                                {touched.lastName && errors.lastName ? (
                                    <div className="error">{errors.lastName}</div>
                                ): null}
                            </span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="labels">Email:</label>
                            <span className="flexdisplay">
                                <input onChange={handleChange} onBlur={handleBlur} className="form-control width33em" value={values.email} id="email" name="email" type="text"/>
                                {touched.email && errors.email ? (
                                    <div className="error">{errors.email}</div>
                                ): null}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="labels">Username:</label>
                            <span className="flexdisplay">
                                <input onChange={handleChange} onBlur={handleBlur} className="form-control width33em" value={values.username} id="username" name="username" type="text"/>
                                {touched.username && errors.username ? (
                                    <div className="error">{errors.username}</div>
                                ): null}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="labels">Password:</label>
                            <span className="flexdisplay">
                                <input onChange={handleChange} onBlur={handleBlur} className="form-control width33em" value={values.password} id="password" name="password" type="password"/>
                                {touched.password && errors.password ? (
                                    <div className="error">{errors.password}</div>
                                ): null}
                            </span>
                        </div>
                        
                        <div className="reg-btn">
                            <button type="submit" className="btn custom-yellow-btn">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};