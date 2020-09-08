import React, { useState, useEffect } from 'react'
import SuggestionInputSearch from 'suggestion-react-input-search'; 
import DataService from "../../services/Services"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Services from '../../services/Services'
import Swal from 'sweetalert2'

export default function ModalProcurement({handleModal, addProcurement}) {

    const [articles, setArticles] = useState();
    const [ok, setOk] = useState(false);
    const [selected, setSelected] = useState("");
    const placeholder= "Search Articles...";
    const [quantity, setQuantity] = useState();
    const [list, setList] = useState([]);
    const [counter, setCounter] = useState(1);

    const handleOnSubmit = (term) => {
        let what = term;
        setSelected(what);
    }

    const handleChange = (event) => {
        setQuantity(event.target.value);
    }

    const handleAddItem = () => {
        setCounter(prevCouter => prevCouter + 1);
        let oneItem = {
            id: counter,
            name: selected,
            quantity: quantity
        }
        setList(prevList => [...prevList, oneItem])
    }

    const handleOrder = () => {
        Services.createNewProcurement(list).then(response => {
            if(response.status !== 201) {
                alert('Bad request!');
            }
            addProcurement(response.data)
            Swal.fire({
                title: 'Success!',
                text: 'New procurement made.',
                icon: 'success',
                confirmButtonText: 'OK'
            })
          })
    }

    function handleRemove(id) {
        let newList = list.filter((item) => item.id !== id);
        setList(newList);
    }

    useEffect(() => {
        DataService.getAllArticles().then(response => {
            setArticles(response.data)
            setOk(true);
          })
    }, [])

    return (
        <div>
            <div className="row">
                <div className="form-group col-sm-6">
                {ok && <SuggestionInputSearch
                onSubmitFunction={handleOnSubmit}
                recentSearches={articles.map((item) => item.name)}
                placeholder={placeholder}
                inputClass="form-control"/> }
                </div>
                <div className="form-group col-sm-2" style={{marginLeft: '30px'}}>
                <input type="number" className="form-control" onChange={handleChange} min="0"/>
                </div>
                <div className="form-group col-sm-2">
                <button className="btn btn-outline-primary" onClick={handleAddItem}>Add</button>
                </div>
            </div>

            List:
            <table className="table-sm fixed">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th><FontAwesomeIcon icon={faTrash}/></th>
                </tr>
                </thead>
                <tbody>
                {list.map((prop, key) => {
                    return (
                    <tr key={prop.id}>
                        <td className="modalTD">{prop.id}</td>
                        <td className="modalTD">{prop.name}</td>
                        <td className="modalTD">{prop.quantity}</td>
                        <td className="modalTD">
                            <button className="btn btn-link" onClick={() => handleRemove(prop.id)}>Remove</button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            <button className="btn btn-warning float-right-btn" onClick={() => {handleOrder(); handleModal()}}>Order</button>
        </div>
    )
};