import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { parseFormDataToJson } from './Tools';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from './Table';
const Add = () => {
    function showMessage() {
        toast.error("ERROR !", {

        })
    }

    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [select, setselect] = useState("")
    const [Price, setPrice] = useState("")
    const [categoryId, setcategoryId] = useState("")
    const [brandId, setbrandId] = useState("")
    const [discount, setdiscount] = useState("")

    console.log(name,description,select,Price,categoryId,brandId,discount);

    const [box, setBox] = useState(true);

    const go = useNavigate()
    const run = () => {
        setBox(false)
        let data = {
            name: name,
            description: description,
            priceList: [
                {
                    type: select,
                    price: Price,
                }
            ],
            categoryId: categoryId,
            brandId: brandId,
            measurementId: brandId,
            discount: discount,
        }
        let form_data = parseFormDataToJson(data)
        let photos = document.getElementById("file").files
        for (let i = 0; i < Array.from(photos).length; i++) {
            let photo = photos.item(i)
            form_data.append(`photos[${i}]`, photo, photo.name)
        }

        axios.post(" https://profitmodel-server.herokuapp.com/api/product", form_data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tokin")
            }
        })
            .then(res => {
                console.log(res);
              
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
            <h5 className='mt-2'>description</h5>
            <input type="text" className='form-control w-50' onInput={(e) => setdescription(e.target.value)} placeholder='description' />
            <select className='mt-3' onInput={(e) => setselect(e.target.value)} name="priceList" id="">
                <option value="SALE">SALE</option>
                <option value="WHOSALE">WHOSALE</option>
                <option value="BANK">BANK</option>
            </select>

            <h5 className='mt-2'>Price</h5>
            <input type="number" className='form-control w-50' onInput={(e) => setPrice(e.target.value)} placeholder='Price' />
            <h5 className='mt-2'>categoryId</h5>
            <input type="number" className='form-control w-50' onInput={(e) => setcategoryId(e.target.value)} placeholder='categoryId' />
            <h5 className='mt-2'>brandId</h5>
            <input type="number" className='form-control w-50' placeholder='brandId' onInput={(e) => setbrandId(e.target.value)} />
            <h5 className='mt-2'>discount</h5>
            <input type="number" className='form-control w-50' placeholder='discount' onInput={(e) => setdiscount(e.target.value)} />

            <input id='file' type="file" multiple accept='.jpg,.png' />
            {/* <button  className={`btn btn-primary ${(box === true) ? "d-none" : ""}`} role="status"  onClick={run}>ADD</button> */}


            <Link className='btn btn-primary mt-2' onClick={run}><div  >
                <span className="visually-hidden">Loading...</span>
            </div > Add </Link>

            {/* <button onClick={showMessage}>Message</button> */}

        </div>
    );
}

export default Add;
