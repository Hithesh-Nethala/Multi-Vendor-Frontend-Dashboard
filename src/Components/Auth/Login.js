import React from 'react'
import '../Styling/Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { API_URL } from '../apiPath'
const Login = ({setActiveView}) => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    const [status, setStatus] = useState(null)
    const [statusType, setStatusType] = useState('') // New state to track success or error
    const [disable,setDisable]=useState(false);
    
    const changeHandle = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const submitHandle = async(e) => {
        e.preventDefault()
       await axios
            .post(`${API_URL}/owner/login`, value)
            .then((res) => {
                setStatus(res.data.message)
                localStorage.setItem('ownertoken',res.data.token)
                localStorage.setItem('ownerid',res.data.ownerid)
                setDisable(true);
                setStatusType('success') // Set status type to success
            })
            .catch((err) => {
                setStatus(err.response.data.message)
                setStatusType('error') // Set status type to error
            })
            setValue({email:'',password:''})
            setTimeout(()=>{setStatus(null)},1000)
        console.log(value)
            const ownerid=localStorage.getItem('ownerid')
            if(ownerid){
                await axios.get(`${API_URL}/firm/indv/${ownerid}`)
                .then((res)=>{
                    const firmid=res.data.firmid;
                    localStorage.setItem('firmname',res.data.firmname);
                    localStorage.setItem('firmid',firmid);
                    window.location.reload()
                })
                .catch((err)=>console.log(err.response.data.message))
            }
            
    }
    useEffect(() => {
        if (statusType === 'success') {
            setActiveView('ownerdetails') 
        }
    }, [statusType]);
    return (
        <div className='login'>
            <h4 className='login-title'>Sign In</h4>
            <form className='login-form' onSubmit={submitHandle}>
                <input
                    type='email'
                    name='email'
                    value={value.email}
                    placeholder='Enter Email'
                    className='login-input'
                    onChange={changeHandle}
                    required
                />
                <input
                    type='password'
                    name='password'
                    value={value.password}
                    placeholder='Enter Password'
                    className='login-input'
                    onChange={changeHandle}
                    required
                />
                <button type='submit' className='login-button' disabled={disable}>Login</button>
                {status !== null ? (
                    <p className={`status-message ${statusType}`}>{status}</p>
                ) : null}
                <p>
                    Doesn't have an account? <span onClick={()=>setActiveView('register')}>Register</span>
                </p>
            </form>
        </div>
    )
}

export default Login