import React, { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { validateShipping } from './Shipping'
import CheckoutStep from './CheckoutStep'

export default function ConfirmOrder() {
    const {shippingInfo,items:cartItems} = useSelector(state =>state.cartState)
    const navigate = useNavigate();
    const {user}  = useSelector(state => state.authState);
    const itemPrice = cartItems.reduce((acc,item) =>(acc + item.price * item.quantity),0);
    const shippingPrice = itemPrice > 200? 0:25;
    const taxPrice = Number(0.05*itemPrice).toFixed(2);
    const totalPrice = Number(itemPrice + shippingPrice + (0.05*itemPrice)).toFixed(2);

    const processPayment = () =>{
        const data = {
            itemPrice,shippingPrice,taxPrice,totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/payment')
    }



    useEffect(() =>{
        validateShipping(shippingInfo,navigate);
    },[])
  return (
    <Fragment>
        <CheckoutStep shipping confirmOrder/>
        <MetaData title={'Confirm Order'}/>
        <div className="container container-fluid">
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city} {shippingInfo.postal}, {shippingInfo.state}, {shippingInfo.country} </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                {cartItems.map(item => (
                    <Fragment>
                        <div className="cart-item my-1">
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65"/>
                                </div>

                                <div className="col-5 col-lg-6">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                </div>

                            </div>
                        </div>
                <hr />
                    </Fragment>
                ))}

                <hr />
                

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
    </div>
    </Fragment>
  )
}
