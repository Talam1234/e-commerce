import React, { Fragment,useEffect } from 'react'
// tutr used all instead of cg
import {CgMouse} from 'react-icons/cg'
import './home.css'
import Product from './Product.js'
import MetaData from '../layout/metaData'
import { getProduct } from '../../actions/productAction'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'

// const product = {
//     name:"blue shirt",
//     images:[{url:"https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/18184578/2022/6/1/40a8af3a-cd17-4e35-a7fb-e580af067f631654078565014-Hancock-Men-Navy-Blue-Self-Design-Pure-Cotton-Slim-Fit-Forma-1.jpg"}],
//     price:"3000",
//     _id:"timsalchangeproduct"
// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {
        loading,error,
        products,
        // productcount
    } = useSelector(
        (state) => state.products
    ); 
    useEffect(()=>{
        if(error)
        {
            return alert.error(error);
        }
        dispatch(getProduct())
    },[alert,dispatch,error]);
//tutor not put alert in dependencies but i have to put it to solve error
  return( 
    <Fragment>
        {loading ? <Loader/> :
        <Fragment>
        <MetaData title="Home PAGE"/>
        <div className='banner'>
            <p>welcome to e-commerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href='#container'>
                <button>scroll <CgMouse/></button>
            </a>
        </div>
        <h2 className='homeHeading'>featured product</h2>
        <div className='container' id='container'>
            {products && products.map((product,i) => 
                <Product key={i} product={product}/>
            )}
            {/* <Product product={product}/> */}
            {/* <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/> */}
        </div>
        </Fragment>}
    </Fragment>);
};

export default Home

