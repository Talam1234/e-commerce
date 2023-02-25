import React from 'react'
import {ReactNavbar} from 'overlay-navbar';
import {MdAccountCircle, MdSearch, MdAddShoppingCart} from "react-icons/md";
import logo from "../../../images/logo.png"


const Header = () => {
  return <ReactNavbar
  burgerColor = "blue"
  burgerColorHover = "black"
  navColor1 = "grey"
  navColor2 = "yellow"
  logo = {logo}
  link1Text = "home"
  link2Text = "product"
  link3Text = "contact"
  link4Text = "about"
  link1Url = "/"
  link2Url = "/product"
  link3Url = "/contact"
  link4Url = "/about"
  nav2justifyContent = "flex-end"
  nav3justifyContent = "flex-start"
  link1Margin = "30px"
  link2Margin = "30px"
  link3Margin = "30px"
  link4Margin = "30px"
  profileIcon="true"
  profileIconColor= "rgba(35, 35, 35,0.8)"
  ProfileIconElement= {MdAccountCircle}
  searchIcon="true"
  searchIconColor= "rgba(35, 35, 35,0.8)"
  SearchIconElement={MdSearch }
  cartIcon="true"
  cartIconColor= "rgba(35, 35, 35,0.8)"
  CartIconElement={MdAddShoppingCart }
  searchIconMargin = "10px"
  cartIconMargin = "10px"
  profileIconMargin = "10px"
  link1Size = "23px"
  link2Size = "23px"
  link3Size = "23px"
  link4Size = "23px"
  />;
}

export default Header
