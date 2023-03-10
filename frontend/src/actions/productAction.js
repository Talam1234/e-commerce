import axios from 'axios';
import { ALL_PRODUCT_FAIL, 
        ALL_PRODUCT_REQUEST, 
        ALL_PRODUCT_SUCCESS,
        PRODUCT_DETAIL_FAIL,
        PRODUCT_DETAIL_REQUEST,
        PRODUCT_DETAIL_SUCCESS,
        CLEAR_ERROR } from "../constants/productConstant";

export const getProduct = ()=> async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});

        const {data} = await axios.get("/api/v1/product")
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const getProductDetail = (id)=> async (dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`)
        console.log(data);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type : PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        });
    }
};


export const clearerror = ()=> async (dispatch)=>{
    dispatch({type:CLEAR_ERROR})
};