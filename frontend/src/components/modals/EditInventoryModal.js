import React from 'react'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import *  as Yup from 'yup'
import Service from '../../services/Services'

export default function EditInventoryModal({handleModal, changeQuantity, item}) {


    const quantityValidation = Yup.object().shape({
        quantity: Yup
        .number()
        .required('Required')
        .min(1)
    })

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            quantity: 1
        },
        validationSchema: quantityValidation,
        onSubmit: ({quantity}) => {
            if(quantity > 1) {
                item.quantity = quantity;
                Service.setQuantity(item).then(response => {
                    changeQuantity(item)
                    handleModal()
                    Swal.fire({
                        title: 'Success!',
                        text: 'Quantity changed.',
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
            })}
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <div className="inputs">
                <div className="row">
                    <div className="col-sm-8" style={{marginTop: '8%'}}>
                        {item !== undefined ? <p>Item: {item.articleDTO.name}</p> : null}
                        {item !== undefined ? <p>Current quantity: {item.quantity}</p> : null}
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="quantity">Quantity:</label>
                        <span className="flexdisplay">
                            <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.quantity} id="quantity" name="quantity" type="number"/>
                            {touched.quantity && errors.quantity ? (
                                <div className="errorRed">{errors.quantity}</div>
                            ): null}
                        </span>
                    </div>
                </div>
                
                <div>
                    <button type="submit" className="btn btn-warning float-right-btn">Change</button>
                </div>
            </div>
        </form>
    )

};