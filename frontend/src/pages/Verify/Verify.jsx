import React, { useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();
    console.log(success, orderId);
    const verifyPayment = async () => {
        const response = await axios.post("https://foodexplorer-b7zr.onrender.com/api/order/verify", { success, orderId })
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }
    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify
