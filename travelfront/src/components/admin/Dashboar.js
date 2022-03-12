import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaUsers, FaLuggageCart} from 'react-icons/fa'
import {BiCategoryAlt} from 'react-icons/bi'
import {SiYourtraveldottv} from 'react-icons/si'


const Dashboar = () => {

  const [user, setuser] = useState([]) 
  const [destinasi, setdestinasi] = useState([])
  const [category, setcategory] = useState([])
  const [order, setorder] = useState([])

  
  useEffect(() => {    
    axios.get(`/api/totalorder`).then(res => {
      if(res.data.status === 200)
      {
        setorder(res.data.order)
      }
    })
    axios.get(`/api/totalcategory`).then(res => {
      if(res.data.status === 200)
      {
        setcategory(res.data.category)
      }
    })

    axios.get(`/api/totaldestinasi`).then(res => {
      if(res.data.status === 200)
      {
        setdestinasi(res.data.destinasi)
      }
    })
    axios.get(`/api/totaluser`).then(res => {
      if(res.data.status === 200)
      {
        setuser(res.data.user)
      }
    })




  }, [])

  var orderleng = '';
  if(order > 0 )
 {
  orderleng = <div>{order}</div>


}
else{ 
  orderleng = <div>0</div>
}

  
var userleng = '';
if(user > 0 )
{
  userleng = <div>{user}</div>


}
else{ 
  userleng = <div>0</div>
}
var destileng = '';
if(destinasi > 0 )
{
  destileng = <div>{destinasi}</div>


}
else{ 
  destileng = <div>0</div>
}
var cateleng = '';
if(category > 0 )
{
  cateleng = <div>{category}</div>


}
else{ 
  cateleng = <div>0</div>
}



  return (
    <div className=' container'>
       <div className='row d-flex justify-content-center'>
            <div className='col-12 col-md-3  p-4' >              
                <div className='dash row d-flex align-items-center justify-content-center'> 
                    <div className='col-6 d-flex align-items-center justify-content-center' style={{ backgroundColor:'#630a07', height:'100%', color:'#ffff'}}>
                        <FaUsers className='iconuser' />
                    </div>
                    <div className='col-6 d-flex flex-column align-items-center'>
                          <h4 className='' style={{fontSize:'40px', fontWeight:'900'}}>{userleng}</h4>
                          <h5>User</h5>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-3 p-4' >              
                <div className='dash row d-flex align-items-center justify-content-center'> 
                    <div className='col-6 d-flex align-items-center justify-content-center' style={{ backgroundColor:'#b4a905', height:'100%', color:'#ffff'}}>
                        <BiCategoryAlt className='iconuser' />
                    </div>
                    <div className='col-6 d-flex flex-column align-items-center'>
                          <h4 className='' style={{fontSize:'40px', fontWeight:'900'}}>{cateleng}</h4>
                          <h5>Category</h5>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-3 p-4' >              
                <div className='dash row d-flex align-items-center justify-content-center'> 
                    <div className='col-6 d-flex align-items-center justify-content-center' style={{ backgroundColor:'#04848d', height:'100%', color:'#ffff'}}>
                        <SiYourtraveldottv className='iconuser' />
                    </div>
                    <div className='col-6 d-flex flex-column align-items-center'>
                          <h4 className='' style={{fontSize:'40px', fontWeight:'900'}}>{destileng}</h4>
                          <h5>Destination</h5>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-3 p-4' >              
                <div className='dash row d-flex align-items-center justify-content-center'> 
                    <div className='col-6 d-flex align-items-center justify-content-center' style={{ backgroundColor:'#0d9409', height:'100%', color:'#ffff'}}>
                        <FaLuggageCart className='iconuser' />
                    </div>
                    <div className='col-6 d-flex flex-column align-items-center'>
                          <h4 className='' style={{fontSize:'40px', fontWeight:'900'}}>{orderleng}</h4>
                          <h5>Order</h5>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Dashboar