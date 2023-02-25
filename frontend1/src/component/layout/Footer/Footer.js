import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/appstore.png'
import './Footer.css'


function Footer() {
  return (
    <footer id='footer'>
      <div className='leftfooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>download app for andoroid and ios mobile phone</p>
        <img src={playstore} alt='playstore'></img>
        <img src={appstore} alt='appstore'></img>
      </div>
      <div className='middlefooter'>
        <h1>e-commerce</h1>
        <p>good service is our pariority</p>
        <p>copyrights 2022 &copy;Talam1234</p>
      </div>
      <div className='rightfooter'>
        <h1>follow us</h1>
        <a href='www.google.com'>instagram</a>
        <a href='www.google.com'>facebook</a>
        <a href='www.google.com'>youtube</a>
      </div>
    </footer>
  )
}

export default Footer


