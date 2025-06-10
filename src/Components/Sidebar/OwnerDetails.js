import React, { useState, useEffect } from 'react'
import '../Styling/OwnerDetails.css'
import axios from 'axios'
import { API_URL } from '../apiPath'
const OwnerDetails = () => {
    const ownerid = localStorage.getItem('ownerid')
    const [name, setName] = useState(null)
    
    useEffect(() => {
        if(ownerid){
            // console.log(ownerid)
           axios
            .get(`${API_URL}/owner/indvowner/${ownerid}`)
            .then((res) =>{ setName(res.data.ownername);})
            .catch((err) => console.log(err))
        }
    }, [ownerid])
    // console.log(name)
    return (
        <div className='owner-details'>
           {name!==null? <p className='owner-details-welcome'>Welcome, <span>{name}</span></p>
           :<p className='owner-details-welcome'>Welcome, <span>User!!!</span></p>}
        </div>
    )
}

export default OwnerDetails