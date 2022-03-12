import React, { useEffect, useState } from 'react'
import bg from '../../img/bali5.jpg'
import {GrLocation} from 'react-icons/gr'
import {CgCalendarDates} from 'react-icons/cg'
import {GiHumanPyramid} from 'react-icons/gi'
import {FaRainbow} from 'react-icons/fa'
import {FiSearch} from 'react-icons/fi'
import {MdOutlineTravelExplore} from 'react-icons/md'
import {BsFillStarFill, BsChatDotsFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ab from '../../img/ab.jpg'
import ab2 from '../../img/ab2.jpg'
import testi from '../../img/testi.jpg'
import Slider from "react-slick";



import axios from 'axios'

const Home = () => {
  

  const [data, setdata] = useState([])

  useEffect(() => {

    axios.get(`/api/alltrippopular`).then(res => {
      if(res.data.status === 200)
      {
        setdata(res.data.popular)
      }
    })
  }, [])

  const [data2, setdata2] = useState([])

  useEffect(() => {
    
    axios.get(`/api/viewtesti`) .then(res => {
      if(res.data.status === 200)
      {
        setdata2(res.data.testi)
      }
    }) 
  }, [])

  const settings = {
    dots: true,
    infinite: true,
   
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
      speed: 1000,
      autoplaySpeed:4000,
     
  };
  

  

  return (
    <div>
        <div className='he2'  >
          <div className='he1' >
            <div className='herobg'>
              <img src={bg} className='imgbg' /> 
            </div>
            <div className='container d-flex align-items-center' style={{ height: '100vh'}}>
              <div>
              <h1 className='text-light he3' >Make Your Beautiful <br /> memories  with Us</h1>
                <h6 className='text-light he4'>"Today was tiring? Look at everything in a positive light, <br />  take the trouble first, go on vacation and have fun later."</h6>
  
              </div>
            </div>
          </div>    
        </div>

        <div className='he6 '>
          <div className='container d-flex justify-content-center  ' >
              <div className='he7 shadow' style={{ }} >  
                <div className='row '>
                  <div className='col-lg-2 col-md-3 col-6 justify-content-lg-center  justify-content-md-end justify-content-start  d-flex '  >
                      <div className='d-flex flex-column p-3'>
                          <h3 style={{ fontWeight:'900' }}>40</h3>
                          <h6 style={{ color:'#838383' }}  >Destinations</h6>
                      </div>

                  </div>
                   <div className='col-lg-1 d-none col-md-1 d-md-flex align-items-center  justify-content-md-end  d-lg-flex'>
                      <div className='garis'></div>
                  </div>
                  <div className='col-lg-2 col-md-3 col-6  justify-content-start justify-content-md-end  d-flex'>
                      <div className='d-flex flex-column p-3'>
                          <h3 style={{ fontWeight:'900' }}>409</h3>
                          <h6 style={{ color:'#838383' }}  >Members</h6>
                      </div>

                   
                  </div>
                  <div className='col-lg-1 d-none  col-md-1 d-md-flex align-items-center justify-content-md-end  d-lg-flex'>
                      <div className='garis'></div>
                  </div>
                  <div className='col-lg-2 col-md-3  col-12  justify-content-lg-start justify-content-md-end  justify-content-center  d-flex'>

                      <div className='d-flex flex-column p-3'>
                          <h3 style={{ fontWeight:'900' }}>20</h3>
                          <h6 style={{ color:'#838383' }}  >Partner</h6>
                      </div>

                                           
                      </div>
                  <div className='col-lg-4 col-12 findbutton align-items-center d-flex justify-content-center ' style={{ background: 'hsl(207, 88%, 35%)'}}>
                
                      <Link to='/alltrip' className='d-flex jutify-content-center align-items-center text-decoration-none '>
                        <FiSearch className='text-light fontsearch' />
                        <h4 className='text-light text-decoration-none mt-2 fonttripsearch' style={{ lineHeight:'10px'}} >Find Trip</h4>                 

                      </Link>
                  </div> 
                </div>               

              </div>
          </div>
        </div>

        <div className='he8'>
          <div className='container'>
              <div className='row'>
                <div className='col-6'>
                    <div className=''>
                        <h6>TOP DESTINATION</h6>
                        <div className='d-flex '>
                          <h2>Our Best Destination For You </h2>
                          <FaRainbow style={{ fontSize:'20px', marginLeft:'2px' }} />
                          
                        </div>            
                      

                    </div>
                </div>
                <div className='col-6'>

           

                </div>           
              </div>
              <div className='mt-4'>
                <div className='row'>
                  {
                    data.map((item) => {
                      return (
                        <div className='col-lg-3 col-md-4 col-12 mt-3 cool ' key={item.id}>   
                          <div className='top1 shadow'>
                            <img className='imagetop p-2' src={`https://backendjalan.herokuapp.com/${item.image}`} />
                            <h5 className='mt-2 fontlok' style={{ marginLeft: '14px', fontWeight:'bold' }}>{item.name}</h5>
                            <h6 className="fontlokasi" style={{ marginLeft: '14px', color:'#8b8b8b' }} >{item.lokasi}</h6>
           
                            <div className="d-flex justify-content-around align-items-end mt-0 mt-lg-3 ">
                              <h5 className='fontharg d-flex align-items-end' style={{  fontWeight:'bold' }}>  <span style={{ color:'#ff9100'}}>$</span>{item.harga} <span style={{  fontWeight:'100', color:'#8b8b8b' }}>/Person</span> </h5>
                              <Link className="top3btn shadow-sm text-center"  to={`/alltrip/${item.category.category}/${item.id}`}>
                                Book

                              </Link>
                            </div>  
                                                 
                          </div>  
                             
                         
                        </div>
                      )
                    })
                  }
                    
                  
                </div>              

              </div>

          </div>
        </div>

        <div className=' mt-5  p-2 d-flex align-items-center'>       
         <div className='container'>
          <div className='row' >
                <div className='col-lg-6 col-12 d-flex align-items-center ' style={{ position:'relative'}}>
                    <div >
                        <img className='gamex' style={{borderRadius:'10rem' }} src={ab} />
                    </div>
                    <div style={{ position:'absolute',right:'60px',}}>
                        <img className='gamex2' style={{borderRadius:'10rem',  border:'7px solid #fff' }} src={ab2} />
                    </div>
                </div>
                <div className='col-lg-6 col-12 mt-5 mt-lg-0  d-flex flex-column justify-content-center'>
                    <p className=' mt-lg-0' style={{ color:'hsl(207, 88%, 35%)' }}>OUR EXPERIENCE</p>
                    <h1 style={{ fontWeight:'Bold' }}  >With Our Experience <br /> We Will Serve You <MdOutlineTravelExplore style={{fontSize:'30px'}} /> </h1>
                    <h6 style={{ lineHeight:'30px', color:' #838383  ' }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </h6>
                    <div className='d-flex mt-3 justify-content-center justify-content-md-start  '>
                       <div>
                        <h3 style={{ fontWeight:'Bold', color:'hsl(207, 88%, 35%)'}} >100+</h3>
                        <p>Holiday  <br /> Package</p>
                       </div>
                       <div style={{ marginLeft: '50px'}}>
                        <h3 style={{ fontWeight:'Bold',  color:'hsl(207, 88%, 35%)' }} >460+</h3>
                        <p>Destination <br />  Collaboration</p>
                       </div>
                        
                    </div>
                    <div className='d-flex mt-3 justify-content-center justify-content-md-start'>
                       <div>
                        <h3 style={{ fontWeight:'Bold',  color:'hsl(207, 88%, 35%)' }} >50+</h3>
                        <p>Happy <br /> Costumer</p>
                       </div>
                       <div  style={{ marginLeft: '50px'}}>
                        <h3 style={{ fontWeight:'Bold',  color:'hsl(207, 88%, 35%)' }} >3</h3>
                        <p>Years <br />  Experience</p>
                       </div>
                        
                    </div>
                </div>
            </div>     
          </div>          

        </div>

        <div className='he10 d-flex justify-content-center align-items-center ' >
           <div className='container'>
            <div className='row'>
                    <div className='col-lg-6 col-12'>
                      <img className='imgtesti'src={testi} /> 
                    </div>
                    <div className='col-lg-6 col-12 d-flex justify-conten-center'> 
                      <div className='d-flex flex-column container'>
                          <div className='container p-1 mt-3 mt-lg-0' >
                            <h2 className='mb-5 fonttesti ' style={{ fontWeight:'900' }} > What  Adventures <BsChatDotsFill style={{fontSize:'30px'}} /> <br/> Say <span style={{ color:'hsl(207, 88%, 35%)'  }}>  About Us </span> </h2>
                              <Slider {...settings} >
                              {
                                  data2.map((item) => {
                                    return (
                                      
                                    <div key={item.id} className=''>
                                          <h5 className='' style={{ fontStyle:'italic', color: '#838383', lineHeight:'25px' }}>"{item.ulasan}"</h5>
                                            <div className='d-flex justify-content-between p-4'>
                                              <div>
                                                <h5 style={{ fontWeight:'900' }}>{item.name}</h5>
                                                <h6 style={{fontSize:'10px'}}>{item.asal}</h6>
                                              </div> 
                                              <h6 style={{ fontSize:'30px', fontWeight:'900' }}> <BsFillStarFill style={{ color:'#ff9100', fontSize:'26px' }}  /> {item.bintang}</h6>

                                            </div>
                                         
                                     </div>
                                    ) 
                                  })
                                }

                              </Slider>                        
                          </div>
                      </div>
                    </div>
              </div>
           </div>

        </div>


        <div className='he11 p-3 mt-3 mt-lg-0'>
            <div className='container he12 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-center fontsubs'  style={{ fontWeight:'900' }}>Prepare Your Self & Let's Explore <br /> The Beautiful Of The World   </h1>
                <h6 className='fontsubs2' style={{ color:'#1a3a69' }}> Subscribe and find best destinasi in the world</h6>
                <Link to='/' className='heget' style={{ color:'white'}}>Get Started</Link>
            </div>              
        </div>

       
    </div>
  )
}

export default Home