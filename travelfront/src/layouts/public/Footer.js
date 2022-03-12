import React from 'react'
import { Link } from 'react-router-dom'
import {FaUmbrella} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import {ImFacebook} from 'react-icons/im'
import {AiOutlineTwitter, AiOutlineCopyright} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='footer' style={{ marginTop:'100px'}}  >
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4 col-12'>
                    <Link classNamme=" np2" to='/' style={{ textDecoration:'none', fontSize:'30px' }} ><span className='np1  '  ><FaUmbrella style={{ transform:'rotateZ(50deg)' }} /> Jalan  </span> </Link>
                    <h6 className='fo1'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</h6>
                </div>
                <div className='col-lg-2 col-12 d-flex flex-column '>
                    <h6 className='mt-4 mt-lg-0' style={{ fontWeight:'900' }}>MENU</h6>
                    <Link className='fot2' to='/'   style={{ marginTop:'13px', color:'#838383', fontSize:'15px'}}>Categories</Link>
                    <Link className='fot2' to='/'  style={{  marginTop:'10px', color:'#838383' , fontSize:'15px' }}>All Trip</Link>
                </div>
                <div className='col-lg-2 col-12  d-flex flex-column'>
                    <h6 className='mt-4 mt-lg-0' style={{ fontWeight:'900' }}>COMPANY</h6>
                    <Link className='fot2' to='/'  style={{ marginTop:'13px', color:'#838383', fontSize:'15px' }}>Why Jalan</Link>
                    <Link className='fot2' to='/'   style={{  marginTop:'10px', color:'#838383',  fontSize:'15px'  }}>Blog</Link>
                </div>
                <div className='col-lg-2 col-12  d-flex flex-column '>
                    <h6 className='mt-4 mt-lg-0' style={{ fontWeight:'900' }}>SUPPORT</h6>
                    <Link className='fot2' to='/'   style={{ marginTop:'13px', color:'#838383' ,  fontSize:'15px' }}>FAQs</Link>
                    <Link className='fot2' to='/'   style={{  marginTop:'10px', color:'#838383' ,  fontSize:'15px' }}>Support Center</Link>
                    <Link className='fot2' to='/'   style={{  marginTop:'10px', color:'#838383',  fontSize:'15px'  }}>Contact Us</Link>
                </div>
                <div className='col-lg-2 col-12  d-flex flex-column '>
                    <h6 className='mt-4 mt-lg-0' style={{ fontWeight:'900' }}>SOCIAL MEDIA</h6>
                    <Link className='fot2' to='/'   style={{ marginTop:'13px', color:'#838383',  fontSize:'15px'  }}><ImFacebook /> Facebook</Link>
                    <Link className='fot2' to='/'   style={{  marginTop:'10px', color:'#838383',  fontSize:'15px'  }}><FiInstagram /> Instagram</Link>
                    <Link className='fot2' to='/'   style={{  marginTop:'10px', color:'#838383' ,  fontSize:'15px'  }}><AiOutlineTwitter /> Twitter</Link>
                </div>
            </div>
            <h6 className='text-center mt-5 mb-2' style={{ color:'#838383', fontSize:'10px' }}>Copyright <AiOutlineCopyright/> 2022 Jalan. All Rights Reserved.  </h6>
        </div>
    </footer>
  )
}

export default Footer