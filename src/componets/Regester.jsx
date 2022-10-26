import Axios from 'axios';
import React, { useState,useEffect } from 'react';

const Regester = () => {


    const [tokin, settokin] = useState()

    useEffect(() => {

        Axios.post("https://profitmodel-server.herokuapp.com/api/auth/login", {
            phone: "+99897",
            password: "123"
        })
            .then(res => {
                console.log("response keldi =>", res.data.data);
                settokin(res.data.data)
                localStorage.setItem('tokin', (res.data.data));
            })
            .catch(err => {
                console.log("error keldi =>", err);
            })

       
    }, []);

    
   

    console.log("tokin =>", tokin);
    return (
        <div>
          
        </div>
    );
}

export default Regester;
