import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

export default function ProcurementCard({procurement, handleModal2, changeItemListState, canComplete, completeProcurement}) {
    const statusStyle = {
        marginTop: 8
    }

    if(procurement.status === "ORDERED") {
        statusStyle.color = "orange";
    } else {
        statusStyle.color = "green";
    }

    const handleComplete = (id) => {
        Swal.fire({
            title: 'Procurement confirmation',
            text: 'Do you wish to confirm procurement No.' + id + ' as completed?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if(result.isConfirmed){
                completeProcurement(id);
            }
         })
    }

    return (
        <div>
            {canComplete && <div className="rightContentCard">
                {procurement.status === "ORDERED" && <button className="btn btn-success large-btn" onClick={() => {handleComplete(procurement.id)}}><FontAwesomeIcon icon={faCheck}/>Complete</button>}
            </div>}
            <div className="row">
                <div className="col-md-5">
                    <p><b>Time created:</b><br/>{procurement.timeCreated}</p>
                    <p><b>Seller:</b><br/>{procurement.seller}</p>
                    <button className="btn btn-link" onClick={() => {changeItemListState(procurement.procurementItems);handleModal2()}}>View Items</button>
                </div>
                <div className="col-md-5 move-col-right20">
                    <p><b>Time delivered:</b><br/>{procurement.timeFinished}</p>
                    <p><b>Procurer:</b><br/>{procurement.procurer}</p>
                    <p><b>Status: <span style={statusStyle}>{procurement.status}</span></b></p>
                </div>
            </div>
        </div>
    )

};