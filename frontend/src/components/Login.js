import React from 'react'
import {useFormik} from 'formik'
import *  as Yup from 'yup'

export default function LoginForm() {

    const LoginValidation = Yup.object().shape({
        email: Yup
        .string()
        .email()
        .required('Required'),
      password: Yup
        .string()
        .required('Required'),
    })

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidation,
        onSubmit: ({email, password}) => {
            alert(`Email: ${email}, password: ${password}`)
        }
    })
    return (
        <div>
            <h2 className="formH2">Log in</h2>
            <div className="lineLogin loginCenter">
                <form onSubmit={handleSubmit} className="formLogin loginCenter">
                    <div className="inputs">
                        <div className="form-group">
                            <label htmlFor="email" className="labels">Email:</label>
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.email} id="email" name="email" type="text"/>
                            {touched.email && errors.email ? (
                                <div className="error">{errors.email}</div>
                            ): null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="labels">Password:</label>
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.password} id="password" name="password" type="password"/>
                            {touched.password && errors.password ? (
                                <div className="error">{errors.password}</div>
                            ): null}
                        </div>
                        
                        <button type="submit" style={{backgroundColor: '#f5d903'}} className="btn">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
};