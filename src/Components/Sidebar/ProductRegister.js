import React, { useState } from 'react'
import '../Styling/ProductRegister.css'
import axios from 'axios'
import { API_URL } from '../apiPath'
const ProductRegister = () => {
    const [value, setValue] = useState({
        name: '',
        price: '',
        category: [],
        image: '',
        bestseller: '',
        description: ''
    })
    const [status, setStatus] = useState(null)
    const [statusType, setStatusType] = useState('') // Track success or error
    const token = localStorage.getItem('ownertoken')
    const changeHandle = (e) => {
        const { name, value, checked, files, type } = e.target
        setValue((prev) => {
            if (type === 'file') {
                return { ...prev, [name]: files[0] }
            } else if (type === 'radio') {
                return {
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter((item) => item !== value)
                }
            } else {
                return { ...prev, [name]: value }
            }
        })
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', value.name)
        formData.append('price', value.price)
        formData.append('category', JSON.stringify(value.category))
        formData.append('image', value.image)
        formData.append('bestseller', value.bestseller)
        formData.append('description', value.description)
        try {
            const id = localStorage.getItem('firmid')
            await axios
                .post(`${API_URL}/product/register/${id}`, formData)
                .then((res) => {
                    setStatus(res.data.message)
                    setStatusType('success') // Set status type to success
                })
                .catch((err) => {
                    setStatus(err.response.data.message)
                    setStatusType('error') // Set status type to error
                })
        } catch (error) {
            console.log(error)
        }
        console.log(value)
    }

    return (
        token?(
        <div className='product-register'>
            <h4 className='product-register-title'>Product Registration</h4>
            <form className='product-register-form' onSubmit={submitHandle}>
                <input
                    type='text'
                    name='name'
                    placeholder='Enter Product Name'
                    className='product-register-input'
                    required
                    onChange={changeHandle}
                />
                <input
                    type='text'
                    name='price'
                    placeholder='Enter Price'
                    className='product-register-input'
                    required
                    onChange={changeHandle}
                />
                <div className='product-register-radio-group' onChange={changeHandle}>
                    <label>
                        <input
                            type='radio'
                            name='category'
                            value='veg'
                            className='product-register-radio'
                        />{' '}
                        Veg
                    </label>
                    <label>
                        <input
                            type='radio'
                            name='category'
                            value='non-veg'
                            className='product-register-radio'
                        />{' '}
                        Non-Veg
                    </label>
                </div>
                <input
                    type='file'
                    name='image'
                    className='product-register-file'
                    required
                    onChange={changeHandle}
                />
                <input
                    type='text'
                    name='bestseller'
                    placeholder='Is it a Bestseller? (yes/no)'
                    className='product-register-input'
                    required
                    onChange={changeHandle}
                />
                <textarea
                    name='description'
                    placeholder='About Product'
                    className='product-register-textarea'
                    required
                    onChange={changeHandle}
                ></textarea>
                {status !== null ? (
                    <p className={`status-message ${statusType}`}>{status}</p>
                ) : null}
                <button type='submit' className='product-register-button'>
                    Add Product
                </button>
            </form>
        </div>
        ):(<p className="no-token-message">Please Log In...</p>)
    )
}

export default ProductRegister