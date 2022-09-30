import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CSVDownload, CSVLink} from 'react-csv'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const Table = () => {
    const doc = new jsPDF()
    const [arr, setArr] = useState([]);
    const [load, setLoad] = useState(false);
    const [loadd, setLoadd] = useState(false);
    const [eName, seteName] = useState("");
    const [eEmail, seteEmail] = useState("");
    const [uName, setuName] = useState("");
    const [uEmail, setuEmail] = useState("");
    const [Id, setId] = useState("");
    
    function save() {
        var doc = new jsPDF()
        doc.autoTable({ html: '.table' })
        doc.save('table.pdf') 
    }
    useEffect(() => {
        MainFun()
    }, []);
    function MainFun() {
        axios.get("https://633600ed65d1e8ef2666e3bf.mockapi.io/myapp")
            .then(res => {
                console.log(res.data);
                setArr(res.data)
            })  
    }
    function deleteFun(id) {
        setLoad(true)
        axios.delete(`https://633600ed65d1e8ef2666e3bf.mockapi.io/myapp/${id}`)
            .then(() => {
                setLoad(false)
                MainFun()
            })
    }
    function edit(item) {
        console.log(item);
        seteName(item.data.UserName)
        seteEmail(item.data.Email)
        setId(item.id)




    }
    function update() {
        setLoadd(true)
        axios.put(`https://633600ed65d1e8ef2666e3bf.mockapi.io/myapp/${Id}`, {
            data: {
                UserName: uName,
                Email: uEmail
            }
        })
            .then(ress => ress)
            .then(() => {
                setLoadd(false)
                MainFun()
            })
            .catch(err => console.log(err))
    }

    
    
    
    return (
        <div className='container p-3'>
            <div className='d-flex justify-content-end'>
                <Link to={'/'} className='btn btn-primary'>Add New User</Link>
            </div>
            <table className="table" id='#my-table'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        (arr.length > 0) ? arr.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.data.UserName}</td>
                                    <td>{item.data.Email}</td>
                                    <td>{
                                           (loadd === true) ? <button className='btn btn-warning mx-2' ><div className="spinner-grow spinner-grow-sm text-white" role="status">
                                           </div></button>
                                               : <button className='btn btn-warning mx-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => edit(item)}>Edit</button>
                                        }
                                        
                                        {
                                            (load === true) ? <button className='btn btn-danger mx-2' ><div className="spinner-grow spinner-grow-sm text-white" role="status">
                                            </div></button>
                                                : <button className='btn btn-danger' onClick={() => deleteFun(item.id)}>delete</button>
                                        }
                                    </td>
                                </tr>
                            )
                        }) :
                            <div >
                                <h1 className='text-center p-5'>Enter Name and Email</h1>
                            </div>
                    }
                </tbody>
            </table>
            <button className='btn btn-success' onClick={save}>Download PDF</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Name</h5>
                            <input className='form-control namee' defaultValue={eName} onInput={(e) => setuName(e.target.value)} type="text" />
                            <h5>Email</h5>
                            <input className='form-control emaile' defaultValue={eEmail} onInput={(e) => setuEmail(e.target.value)} type="email" />
                        </div>
                        <div className="modal-footer">
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={update}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
