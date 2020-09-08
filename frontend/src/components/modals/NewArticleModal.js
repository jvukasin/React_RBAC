import React from 'react'
import {useFormik} from 'formik'
import *  as Yup from 'yup'
import Services from '../../services/Services'
import Swal from 'sweetalert2'

export default function ModalArticle({handleModal, addArticle}) {

    const newArticalValidation = Yup.object().shape({
        articalName: Yup
        .string()
        .required('Required'),
        code: Yup
        .string()
        .required('Required'),
        brand: Yup
        .string()
        .required('Required'),
        price: Yup
        .number()
        .positive()
        .required('Required')
    })

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            articalName: '',
            code: '',
            brand: '',
            price: 1
        },
        validationSchema: newArticalValidation,
        onSubmit: ({articalName, code, brand, price}) => {
            Services.createNewArticle(articalName, code, brand, price).then(response => {
                if(response.status !== 200) {
                    alert('Bad request!');
                }
                addArticle(response.data)
                handleModal()
                Swal.fire({
                    title: 'Success!',
                    text: 'New article added.',
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
        }
    })

    return (
        <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="articalName">Artical name:</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.articalName} id="articalName" name="articalName" type="text"/>
                            {touched.name && errors.name ? (
                                <div className="errorRed">{errors.name}</div>
                            ): null}
                        </span>
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="lastName">Code:</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.code} id="code" name="code" type="text"/>
                            {touched.code && errors.code ? (
                                <div className="errorRed">{errors.code}</div>
                            ): null}
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="brand">Brand:</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.brand} id="brand" name="brand" type="text"/>
                            {touched.brand && errors.brand ? (
                                <div className="errorRed">{errors.brand}</div>
                            ): null}
                        </span>
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="price">Price (eur):</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.price} id="price" name="price" type="number"/>
                            {touched.price && errors.price ? (
                                <div className="errorRed">{errors.price}</div>
                            ): null}
                        </span>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-warning float-right-btn">Add</button>
                </div>
        </form>
    )
};