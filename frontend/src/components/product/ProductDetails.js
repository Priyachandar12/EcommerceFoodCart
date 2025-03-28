import React, { Fragment, useEffect, useState } from 'react'
import { createReview, getProduct } from '../../actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader';
import { useParams } from 'react-router-dom';
import {Carousel} from 'react-bootstrap'
import MetaData from '../layouts/MetaData';
import { addCartItem } from '../../actions/cartAction';
import {Modal} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { clearError, clearProduct, clearReviewSubmitted } from '../../slices/ProductSlice';
import ProductReviews from './ProductReviews';

export default function ProductDetails() {
    const {loading,product={},isReviewSubmitted,error} = useSelector((state) => state.productState);
    const {user} = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const {id} = useParams();
    const [qty,setQty] = useState(1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating,setRating] = useState(1);
    const [comment,setComment] = useState('');
    const reviewHandler = () =>{
        const formData = new FormData();
        formData.append('rating',rating);
        formData.append('comment',comment);
        formData.append('productId',id);
        dispatch(createReview(formData))
    }
    const increaseQty = () =>{
        const count = document.querySelector('.count')
        if(product.stock===0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQty(qty);
    }

    const decreaseQty = () =>{
        const count = document.querySelector('.count')
        if(count.valueAsNumber === 1) return;
        const qty = count.valueAsNumber - 1;
        setQty(qty);
    }

useEffect(() => {
    if(isReviewSubmitted){
        handleClose();
         toast('Review Submitted Successfully',{
                        type:'success',
                        onOpen: () =>{dispatch(clearReviewSubmitted())}
                    })
                   

    }
    if(error){
                toast(error,{
                    type:'error',
                    onOpen: () =>{dispatch(clearError())}
                })
                return;
            }
    if(!product._id || isReviewSubmitted){
        dispatch(getProduct(id))        
    } 

    return () =>{
        dispatch(clearProduct())
    }
},[dispatch,id,isReviewSubmitted,error])

  return (
       <Fragment>
            {loading?<Loader/>:
             <Fragment>
                <MetaData title={product.name}/>
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel pause="hover">
                        {product.images && product.images.map(image =>
                        <Carousel.Item>
                         <img className='d-block w-100' src={image.image} alt={product.name} height="500" width="500"/>
                        </Carousel.Item>
                    )}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr/>

                    <div className="rating-outer">
                        <div className="rating-inner" style={{width: `${product.ratings/5*100}%`}}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                    <hr/>

                    <p id="product_price">${product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                        <input type="number" className="form-control count d-inline" value={qty} readOnly />

                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                    </div>
                    <button type="button" id="cart_btn" 
                    disabled={product.stock === 0 ?true:false} 
                    className="btn btn-primary d-inline ml-4"
                    onClick={() => {dispatch(addCartItem(product._id,qty))
                        toast('Cart Successfully Added!',{
                            type:'success'
                        })
                    }}>Add to Cart</button>

                    <hr/>

                    <p>Status: <span className={product.stock>0?"greenColor":"redColor"} id="stock_status">{product.stock>0?"In Stock":"Out Of Stock"}</span></p>

                <hr/>

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                <hr/>
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                    
                    {user ?
                    <button id="review_btn" type="button" onClick={handleShow} className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                    </button>:
                    <div className='alert alert-danger mt-5'>Login to Post Review</div>}
                    
                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">

                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                            <ul className="stars" >
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                            </ul>

                                            <textarea name="review" id="review" className="form-control mt-3">

                                            </textarea>

                                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <ul className="stars" >
                                    {
                                        [1,2,3,4,5].map(star => (
                                            <li className={`star ${star<=rating?'orange':''}`}
                                            onMouseOver={(e)=>e.target.classList.add('yellow')}
                                            onMouseOut={(e) => e.target.classList.remove('yellow')} value={star} onClick={()=>setRating(star)}><i className="fa fa-star"></i></li>
                                        ))
                                    }
                                                
                                                
                                            </ul>

                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                            </textarea>
                                            <button className='btn my-3 float-right px-4 review-btn text-white' aria-label='Close'
                                            onClick={reviewHandler} disabled={loading}>Submit</button>

                                </Modal.Body>
                               
                            </Modal>

                        </div>
                    </div>      
                </div>

                </div>
                {product.reviews && product.reviews.length >0 ? <ProductReviews reviews={product.reviews}/>:null}
        </Fragment>
        }
       </Fragment>


  )
}
