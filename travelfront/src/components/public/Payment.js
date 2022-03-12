import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Payment = () => {

  const [error, seterror] = useState([])

  if(!localStorage.getItem('auth_token')) {
    history.push('/');
    Swal.fire("Warning", "Login to goto Cart Page", "error")
}

const history = useHistory()
  const [data, setdata] = useState({

     fullname:'',
     accountnumber:'',
  })
  const [img, setimg] = useState([])

  const inputimg = (e) => {
    e.persist()
    setimg({image: e.target.files[0]})

  }

  const inputpay = (e) => {
    e.persist() 
    setdata({...data, [e.target.name]: e.target.value})
  }

  const submitt = (e) => {
    e.preventDefault()
      
    const formdata = new FormData();
    formdata.append('image', img.image);
    formdata.append('fullname', data.fullname);
    formdata.append('accountnumber', data.accountnumber);
    
    axios.post(`/api/pay`, formdata).then(res => {
      if(res.data.status === 200)
      {
        Swal.fire('Success', res.data.message, 'success' )
        history.push('/order')
      }
      else if (res.data.status === 422)
      {
        seterror(res.data.errors)
      }
      else
      {
        Swal.fire('Error', res.data.message, 'error' )
      }
    })
  }
  
  


  
  return (
    <div className='back '>
        <div className='bacg'></div>
          <div className='container  p-3'>
              <form onSubmit={submitt} className='mt-4 d-flex flex-column align-items-center' >
                 <div className='d-flex col-4 flex-column'>
                    <label className='text-light'>Full Name </label>
                    <input type='text' className='p-2' style={{ outline:'none' }} placeholder='Please Enter...'  onChange={inputpay} name='fullname' value={data.fullname} />
                 </div>
                 <div className='d-flex col-4 flex-column mt-2'>
                    <label className='text-light'>Account Number </label>
                    <input type='number' className='p-2' placeholder='Please Enter...'  onChange={inputpay} name='accountnumber' value={data.accountnumber} />
                 </div>
                  <div className='d-flex col-4 flex-column mx-2'>
                    <label className='text-light'>Image</label>
                    <input className='p-2 text-light' name='image' onChange={inputimg}  type="file" />
                    <span className="text-danger">{error.image}</span>
                  </div>

                  <button className='btn btn-warning mt-4' >Send</button>
              </form>
          </div>  
    </div>
  )
}

export default Payment