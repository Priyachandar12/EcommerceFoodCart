import axios from "axios"
import { adminProductsFailure, adminProductsRequest, adminProductsSuccess, productsFailure, productsRequest, productsSuccess } from "../slices/ProductsSlice";

import { createReviewFailure, createReviewRequest, createReviewSuccess, deleteProductFailure, deleteProductRequest, deleteProductSuccess, deleteReviewFailure, deleteReviewRequest, deleteReviewSuccess, newProductFailure, newProductRequest, newProductSuccess, productFailure, productRequest, productSuccess, reviewsFailure, reviewsRequest, reviewsSuccess, updateProductFailure, updateProductRequest, updateProductSuccess } from "../slices/ProductSlice";


export const getProducts =(keyword,price,ratings,currentPage) => async(dispatch) =>{
    try{
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;
        if(keyword){
            link += `&keyword=${keyword}`;
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }
        if(ratings){
            link += `&ratings=${ratings}`;
        }
        const {data} = await axios.get(link);
        dispatch(productsSuccess(data));

    }catch(error){
        dispatch(productsFailure(error.response.data.message));
    }

}

export const getProduct = id => async(dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data));

    }catch(error){
        dispatch(productFailure(error.response.data.message));
    }

}

export const createReview = reviewData => async(dispatch) =>{
    try{
        dispatch(createReviewRequest())
        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/review`,reviewData,config);
        dispatch(createReviewSuccess(data));

    }catch(error){
        dispatch(createReviewFailure(error.response.data.message));
    }

}

export const getAdminProducts  = async(dispatch) =>{
    try{
        dispatch(adminProductsRequest())
        
        const {data} = await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data));

    }catch(error){
        dispatch(adminProductsFailure(error.response.data.message));
    }

}

export const CreateNewProduct  = productData => async(dispatch) =>{
    try{
        dispatch(newProductRequest())
        
        const {data} = await axios.post(`/api/v1/admin/product/new`,productData);
        dispatch(newProductSuccess(data));

    }catch(error){
        dispatch(newProductFailure(error.response.data.message));
    }

}

export const DeleteProduct  = id => async(dispatch) =>{
    try{
        dispatch(deleteProductRequest())
        
        await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch(deleteProductSuccess());

    }catch(error){
        dispatch(deleteProductFailure("Product Deleted Successfully"));
    }

}

export const updateProduct  = (id,productData) => async(dispatch) =>{
    try{
        dispatch(updateProductRequest())
        
        const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData)
        dispatch(updateProductSuccess(data));

    }catch(error){
        dispatch(updateProductFailure(error.response.data.message));
    }

}

export const getReviews = id => async(dispatch) =>{
    try{
        dispatch(reviewsRequest())
        
        const {data} = await axios.get(`/api/v1/admin/reviews`,{params:{id}});
        dispatch(reviewsSuccess(data));

    }catch(error){
        dispatch(reviewsFailure(error.response.data.message));
    }

}

export const DeleteReview = (productId,id) => async(dispatch) =>{
    try{
        dispatch(deleteReviewRequest())
        
        await axios.delete(`/api/v1/admin/review`,{params:{productId,id}});
        dispatch(deleteReviewSuccess());

    }catch(error){
        dispatch(deleteReviewFailure(error.response.data.message));
    }

}