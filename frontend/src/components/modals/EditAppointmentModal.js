import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import *  as Yup from 'yup'
import Select from "react-select"
import Services from '../../services/Services'

export default function EditAppointmentModal({handleAppointment, appointment, actions, handleModal}) {

    const [selectedTime, setSelectedTime] = useState({ label: appointment.time, value:  appointment.time})

    const appointmentValidation = Yup.object().shape({
        person: Yup
        .string(),
        date: Yup
        .date()
        .required('Required'),
        note: Yup
        .string()
        .required('Required')
    })

    const timeOptions = [
        { value: '8:00', label: '8:00' },
        { value: '8:30', label: '8:30' },
        { value: '9:00', label: '9:00' },
        { value: '10:30', label: '10:30' },
        { value: '11:00', label: '11:00' },
        { value: '11:30', label: '11:30' },
        { value: '15:00', label: '15:00' },
        { value: '15:30', label: '15:30' }
      ]
    
    const handleTimeChange = selectedTime => {
        setSelectedTime(selectedTime);
    };

    const isActionAllowed = (actionName = "") => {
        let numbb = actions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            person: appointment.person,
            date: appointment.date,
            note: appointment.note
        },
        validationSchema: appointmentValidation,
        onSubmit: ({person, date, note}) => {
            if(selectedTime != null) {
                Services.changeAppointment(appointment.id, person, date, note, selectedTime.value).then(response => {
                    handleAppointment(response.data)
                    handleModal()
                    Swal.fire({
                        title: 'Success!',
                        text: 'Appointment changed',
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
        }
    })

    const dateEditable = isActionAllowed('change-hr-date') ?
        (<div className="form-group">
            <label htmlFor="date">Date:</label>
            <span className="flexdisplay">
                <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.date} id="date" name="date" type="date"/>
                {touched.date && errors.date ? (
                    <div className="errorRed">{errors.date}</div>
                ): null}
            </span>
        </div>) :
        (<div className="form-group">
            <label htmlFor="date">Date:</label>
            <span className="flexdisplay">
                <input onChange={handleChange} onBlur={handleBlur} className="form-control" disabled value={values.date} id="date" name="date" type="date"/>
            </span>
        </div>);

    const timeEditable = isActionAllowed('change-hr-time') ?
        (<div className="form-group">
            <label htmlFor="time">Time:</label>
            <Select options={timeOptions} placeholder="Select time" value={selectedTime} onChange={selectedOption => {
            handleTimeChange(selectedOption);
            handleChange("time");
        }}/>
        </div>) :
        (<div className="form-group">
            <label htmlFor="time">Time:</label>
            <Select options={timeOptions} isDisabled={timeOptions} placeholder="Select time" value={selectedTime} onChange={selectedOption => {
            handleTimeChange(selectedOption);
            handleChange("time");
        }}/>
        </div>)


    return (
        <form onSubmit={handleSubmit}>
            <div className="inputs">

                {isActionAllowed('hr-person') &&
                <div className="form-group">
                    <label htmlFor="person">Person:</label>
                    <span className="flexdisplay">
                        <input onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.person} id="person" name="person" type="text"/>
                        {touched.person && errors.person ? (
                            <div className="errorRed">{errors.person}</div>
                        ): null}
                    </span>
                </div>
                }
                
                {dateEditable}

                {timeEditable}

                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <span className="flexdisplay">
                        <textarea onChange={handleChange} onBlur={handleBlur} className="form-control" value={values.note} id="note" name="note"/>
                        {touched.note && errors.note ? (
                            <div className="errorRed">{errors.note}</div>
                        ): null}
                    </span>
                </div>
                
                <div>
                    <button type="submit" className="btn btn-warning float-right-btn">change</button>
                </div>
            </div>
        </form>
    )
};