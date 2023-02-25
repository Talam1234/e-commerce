import React, { Fragment, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
//Carousel is not download as tutor downloaded bcuz it is updated version have a lot of
//change 
import './ProductDetail.css'
import {useDispatch, useSelector} from 'react-redux'
import { getProductDetail } from '../../actions/productAction'

const ProductDetail = () => {
    // console.log(match);
    const params = useParams();
    const dispatch = useDispatch();
    const { product} = useSelector(
        (state) => state.productDetail
    )
    // console.log(product.image);
    useEffect(()=>{
        dispatch(getProductDetail(params.id));
    },[dispatch, params.id])
  return (
    <Fragment>
        <div className='ProductDetails'>
            <div>
                <Carousel>
                    {product.image && product.image.map((item, i)=>
                        <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} slide`}/>
                    )}
                </Carousel>
            </div>
            <div>
                
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetail
