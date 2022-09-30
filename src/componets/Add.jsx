import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Add = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [box, setBox] = useState(true);

    const go = useNavigate()
    const run = () => {
        setBox(false)
        axios.post("https://633600ed65d1e8ef2666e3bf.mockapi.io/myapp", {
            data: {
                UserName: name,
                Email: email
            }
        })
            .then(ress => ress)
            .then(data => {
                setBox(true)
                if (box === true) {
                    go("/table")
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='container'>
            <h1>Crud</h1>
            <h5 className='mt-2'>Name</h5>
            <input type="text" className='form-control w-50' onInput={(e) => setName(e.target.value)} placeholder='UserName' />
            <h5 className='mt-2'>Email</h5>
            <input type="email" className='form-control w-50' placeholder='Enter Email' onInput={(e) => setEmail(e.target.value)} />
            <Link className='btn btn-primary mt-2' onClick={run}><div className={`spinner-grow spinner-grow-sm text-light ${(box === true) ? "d-none" : ""}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div> Add </Link>

        </div>
    );
}

export default Add;
