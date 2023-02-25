import { ALL_PRODUCT_FAIL, 
        ALL_PRODUCT_REQUEST, 
        ALL_PRODUCT_SUCCESS,
        PRODUCT_DETAIL_FAIL,
        PRODUCT_DETAIL_REQUEST,
        PRODUCT_DETAIL_SUCCESS,
        CLEAR_ERROR } from "../constants/productConstant";


export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products: action.payload.product,
                productsCount : action.payload.productcount
            };
        case ALL_PRODUCT_REQUEST:
            return{
                loading:true,
                products:[]
            };
        case ALL_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            };
        
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
        default:
            return state;
    }
};

export const productsDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload
            };
        case PRODUCT_DETAIL_REQUEST:
            return{
                loading:true,
                ...state
            };
        case PRODUCT_DETAIL_SUCCESS:
            return{
                loading:false,
                product:action.payload
            };
        
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
        default:
            return state;
    }
};