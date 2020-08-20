import React from 'react'
import {useFormik} from 'formik'
import *  as Yup from 'yup'
import AuthService from '../services/AuthService'
import history from '../util/history';

export default function LoginForm() {

    const LoginValidation = Yup.object().shape({
        username: Yup
        .string()
        .required('Required'),
      password: Yup
        .string()
        .required('Required'),
    })

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: LoginValidation,
        onSubmit: ({username, password}) => {
            AuthService.login(username, password).then(response => {
                localStorage.setItem('currentUser', response.data.accessToken);
                history.push('/app');
            })
            .catch(err => { alert(err) })
        }
    })
    return (
        <div>
            <h2 className="formH2">Log in</h2>
            <div className="lineLogin loginCenter">
                <form onSubmit={handleSubmit} className="formLogin loginCenter">
                    <div className="inputs">
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
                            <button type="submit" className="btn custom-yellow-btn">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};