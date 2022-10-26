import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSVDownload, CSVLink } from 'react-csv'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import {parseFormDataToJson} from './Tools'

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

    const [select, setselect] = useState("")
    const [uselect, setuselect] = useState("")

    const [description, setdescription] = useState("")
    const [udescription, setudescription] = useState("")

    const [pricelist, setpricelist] = useState("")
    const [upricelist, setupricelist] = useState("")

    const [price, setprice] = useState("")
    const [uprice, setuprice] = useState("")

    const [category, setcategory] = useState("")
    const [ucategory, setucategory] = useState("")

    const [brand, setbrand] = useState("")
    const [ubrand, setubrand] = useState("")

    const [discount, setdiscount] = useState("")
    const [udiscount, setudiscount] = useState("")




    function save() {
        var doc = new jsPDF()
        doc.autoTable({ html: '.table' })
        doc.save('table.pdf')
    }
    useEffect(() => {
        MainFun()
    }, []);
    function MainFun() {
        axios.get("https://profitmodel-server.herokuapp.com/api/product", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tokin")
            }
        })
            .then(res => {
                console.log("then keldi =>", res.data.data[1]);
                // console.log("then keldi =>", res.data.data[1].codeList[0]);
                setArr(res.data.data)
            })
            .catch(err => {
                console.log(" error keldi =>", err);
            })
    }
    function deleteFun(id) {

        


        setLoad(true)
        axios.delete(`https://profitmodel-server.herokuapp.com/api/product/${id}`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("tokin")
            }
        })
            .then((res) => {
                console.log("Delete ishladi =>",res);
                setLoad(false)
                MainFun()
            })
            .catch((err)=>{
                console.log("EROR =>",err);
            })
    }
    function edit(item) {
        console.log("Edit keldi =>", item);
        seteName(item.name)

        setdescription(item.description)
        setpricelist(item.priceList[0].type)
        setprice(item.priceList[0].price)
        setcategory(item.category.id)
        setbrand(item.brand.id)
        setdiscount("niasdfa")
        setId(item.id)




    }
    function update() {

        let data = {
            name: uName,
            description: description,
            priceList: [
                {
                    type: uselect,
                    price: uprice,
                }
            ],
            categoryId: ucategory,
            brandId: brand,
            measurementId: ubrand,
            discount: udiscount,
        }
        let form_data = parseFormDataToJson(data)
        let photos = document.getElementById("file").files
        for (let i = 0; i < Array.from(photos).length; i++) {
            let photo = photos.item(i)
            form_data.append(`photos[${i}]`, photo, photo.name)
        }




        setLoadd(true)
        axios.put(`https://633600ed65d1e8ef2666e3bf.mockapi.io/myapp//product/${Id}`, form_data,{
            headers: {
               Authorization: "Bearer "+localStorage.getItem("tokin")
            }
        })
           
            .then((res) => {
               console.log("ress update =>", res);

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
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">PriceList</th>
                        <th scope="col">Price</th>
                        <th scope="col">CategoryId</th>
                        <th scope="col">BrandID</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Action</th>
                        {/* <th scope="col">Img</th> */}
                    </tr>
                </thead>
                <tbody>
                    {

                        (arr.length > 0) ? arr.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.priceList[0].type}</td>
                                    <td>{item.priceList[0].price}</td>
                                    <td>{item.category.id}</td>
                                    <td>{item.brand.id}</td>
                                    <td>niasdfa</td>

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
                            <h5>Description</h5>
                            <input className='form-control emaile' defaultValue={description} onInput={(e) => setudescription(e.target.value)} type="text" />
                            <h5>Pricelist</h5>
                            <select className='mt-3' defaultValue={select} onInput={(e) => setuselect(e.target.value)} name="priceList" id="">
                                <option value="SALE">SALE</option>
                                <option value="WHOSALE">WHOSALE</option>
                                <option value="BANK">BANK</option>
                            </select>
                            <h5>Price</h5>
                            <input className='form-control emaile' defaultValue={price} onInput={(e) => setuprice(e.target.value)} type="number" />
                            <h5>CategoryId</h5>
                            <input className='form-control emaile' defaultValue={category} onInput={(e) => setucategory(e.target.value)} type="number" />
                            <h5>BrandId</h5>
                            <input className='form-control emaile' defaultValue={brand} onInput={(e) => setubrand(e.target.value)} type="number" />
                            <h5>Discount</h5>
                            <input className='form-control emaile' defaultValue={discount} onInput={(e) => setudiscount(e.target.value)} type="number" />

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
