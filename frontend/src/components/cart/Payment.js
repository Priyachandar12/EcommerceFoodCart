import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { validateShipping } from './Shipping';
import axios from 'axios';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';
import { createOrder } from '../../actions/orderAction';
import { clearError as clearOrderError } from '../../slices/orderSlice';

export default function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const {user} = useSelector(state => state.authState)
    const {items:cartItems,shippingInfo} = useSelector(state => state.cartState)
    const {error:orderError} = useSelector(state => state.orderState)
    const paymentData = {
        amount:Math.round(orderInfo.totalPrice * 100),
        shipping:{
            name:user.name,
            address: {
                city:shippingInfo.city,
                postalCode:shippingInfo.postalCode,
                country:shippingInfo.country,
                state:shippingInfo.state,
                line1:shippingInfo.address
            },
            phone:shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo){
        order.itemsPrice = orderInfo.itemPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    useEffect(() => {
        validateShipping(shippingInfo,navigate)
        if(orderError){
          toast(orderError,{
                          type:'error',
                          onOpen: () =>{dispatch(clearOrderError)}
                      })
                      return
        }
    },[])

    const submitHandler = async(e) =>{
        e.preventDefault();
        document.querySelector('#pay_btn').disabled=true;
        try{
          // const {data} = await axios.post(`/api/v1/payment/process`,paymentData);
          toast('Payment Success',{
          type:'success'
      })
      order.paymentInfo = {
        id:"result",
        status:"success"
      }
      dispatch(orderCompleted())
      dispatch(createOrder(order));
      navigate('/order/success')

        }catch(error){

        }
    }

  return (
    <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <input
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    // value=""
                    placeholder='0000 0000 0000 0000'
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <input
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    // value=""
                    placeholder='MM/YY'
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <input
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    // value=""
                    placeholder='CVC'
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay - {`$${orderInfo && orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
  )
}
