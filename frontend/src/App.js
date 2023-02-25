import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import webFont from "webfontloader"
import React from 'react';
import Home from './component/home/Home.js'
import ProductDetail from './component/Product/ProductDetail'
// import Loader from './component/layout/Loader/Loader';

function App() {
  React.useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])
  return (
    <Router>
      <Header/>
      {/* component is getting old now replace with element 
       <Routes><Route exact path="/" component = {home}/></Routes>  */}

      {/* it's upcoming v6 and u should have to define element in uppercase  */}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetail/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App
