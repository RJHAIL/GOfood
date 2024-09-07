import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/api/myorderdata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (response.ok) {
                const data = await response.json();
                setOrderData(data.orderData || []); // Ensure orderData is set correctly
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
             <h1 className='text-center mt-5 text-success'>My Orders 🛍️</h1>
             <hr/>

            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice().reverse().map((order, index) => (
                            <div key={index} className="order-section">
                                <h3 style={{marginTop:"100px"}}> Order Date: {new Date(order.order_date).toLocaleDateString()}</h3>
                                <hr />
                                {order.items.map((item, idx) => (
                                    <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                       <h1 className='text-center mt-5 text-danger mb-5'>No orders found</h1>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
