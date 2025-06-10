import React from 'react'
import '../Styling/Register.css'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../apiPath'
const Register = ({ setActiveView }) => {
    const [value, setValue] = useState({
        name: '',
        email: '',
        number: '',
        password: '',
        confirmpassword: ''
    })
    const [status, setStatus] = useState(null)
    const [statusType, setStatusType] = useState('') 
    const changeHandle = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const submitHandle = (e) => {
        e.preventDefault()
        axios
            .post(`${API_URL}/owner/register`, value)
            .then((res) => {
                setStatus(res.data.message)
                setStatusType('success') 
                setTimeout(() => {
                    setStatus(null);
                    setValue({name: '',email: '',number: '',password: '',confirmpassword: ''})
                }, 1000);
            })
            .catch((err) => {
                setStatus(err.response.data.message)
                setStatusType('error') // Set status type to error
            })
        console.log(value)
    }

    return (
        <div className='register'>
            <h4 className='register-title'>Registration</h4>
            <form className='register-form' onSubmit={submitHandle}>
                <input
                    type='text'
                    name='name'
                    value={value.name}
                    placeholder='Enter Name'
                    className='register-input'
                    onChange={changeHandle}
                    autoComplete='new-name'
                    required
                />
                <input
                    type='email'
                    name='email'
                    value={value.email}
                    placeholder='Enter Email'
                    className='register-input'
                    onChange={changeHandle}
                    autoComplete='new-email'
                    required
                />
                <input
                    type='text'
                    name='number'
                    value={value.number}
                    maxLength='10'
                    placeholder='Enter Mobile Number'
                    className='register-input'
                    onChange={changeHandle}
                    required
                />
                <input
                    type='password'
                    name='password'
                    value={value.password}
                    placeholder='Enter Password'
                    className='register-input'
                    onChange={changeHandle}
                    autoComplete='new-password'
                    required
                />
                <input
                    type='password'
                    name='confirmpassword'
                    value={value.confirmpassword}
                    placeholder='Confirm Password'
                    className='register-input'
                    onChange={changeHandle}
                    required
                />
                <button type='submit' className='register-button'>Register</button>
                {status !== null ? (
                    <p className={`status-message ${statusType}`}>{status}</p>
                ) : null}
                <p>
                    Already have an account? <span onClick={()=>setActiveView('login')}>Login</span>
                </p>
            </form>
        </div>
    )
}

export default Register