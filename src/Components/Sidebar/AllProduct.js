import React, { useState, useEffect } from 'react'
import '../Styling/Allproduct.css'
import axios from 'axios'
import { API_URL } from '../apiPath'
const AllProduct = () => {
    const firmid = localStorage.getItem('firmid')
    const token = localStorage.getItem('ownertoken')
    const [products, setProducts] = useState(null)
    const [firmname,setFirmname]=useState(null);

    useEffect(() => {
        axios
            .get(`${API_URL}/firm/indvproducts/${firmid}`, {
                headers: {
                    'x-token': token
                }
            })
            .then((res) => {setProducts(res.data.products);setFirmname(res.data.firmname)})
            .catch((err) => console.log(err.response.data.message))
    }, [token,firmid])
    const deleteHandle=(productid)=>{
        axios.delete(`${API_URL}/product/delete/${productid}`)
        .then(()=>{console.log('Product Deleted');
            setProducts((prevProducts) => prevProducts.filter((item) => item._id !== productid));
        })
        .catch((err)=>console.log(err));
        console.log(productid);
    }

    return (
        <div className='all-product'>
            {token ?
            <>
            <h4 className='all-product-title'>All Products</h4>
            {!products ? (
                <p className='no-products'>No products added</p>
            ) : (<>
                <h4>{firmname}</h4>
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/firm/uploads/${item.image}`}
                                            alt={item.productName}
                                            className='product-image'
                                        />
                                    )}
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={()=>deleteHandle(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            )}
            </>
            :<p>No token found, Please Log In...</p>
        }
        </div>
    )
}

export default AllProduct