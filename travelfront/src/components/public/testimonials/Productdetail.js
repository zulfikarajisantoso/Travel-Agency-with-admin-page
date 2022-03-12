import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {SiGooglemaps} from 'react-icons/si'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Productdetail = (props) => {

  const [loading, setloading] = useState(true)
  const [data, setdata] = useState([])
  const [idd, setidd] = useState([])

  // const [quanti, setquanti] = useState(1);
  const history = useHistory()

  var totalprice = 0;

  if(!localStorage.getItem('auth_token')) {
    history.push('/');
    Swal.fire("Warning", "Login to goto Cart Page", "error")
}

  const [orderr, setorderr] = useState({

    name:'',
    contact:'',
    date:'',
    qty:1,

  })
  
  const inputorder = (e) => {
    e.persist();
    setorderr({...orderr, [e.target.name]: e.target.value})
  }
  // const quas = (e) => {
  //   e.persist(),
  //   setquanti({...orderr, [e.target.name]: e.target.value})
  // }





  useEffect(() => {
    let isMounted = true 
    const category = props.match.params.category
    const destinasi = props.match.params.destinasi
    axios.get(`/api/detaildesti/${category}/${destinasi}`).then(res => {
      
      if(isMounted)
      {
        if(res.data.status === 200)
        {
          setdata(res.data.destinasi)
          setidd(res.data.destinasi)
          
          // console.log(res.data.destinasi)
          setloading(false);          
        }
        else if (res.data.status === 404)
        {
          history.push('/alltrip')
          Swal.fire('Warning', res.data.message, "error")
        }
      }     

    })
       return () => {
            isMounted = false
        }

  }, [props.match.params.category, props.match.params.destinasi, history])
  

  const submitt = (e) => {
    e.preventDefault();
    const dataa = {
      trip_id: idd.id,
      name: orderr.name,
      contact: orderr.contact,
      date: orderr.date,
      qty: orderr.qty,

    }
    console.log(dataa)
    axios.post(`/api/checkout`, dataa).then(res => {
      if(res.data.status === 200)
      {
        Swal.fire('Success', res.data.message, 'success')
        setorderr({...orderr, 
          name:'',
          contact:'',
          date:'',
          qty:1,
        })

      }
      else if(res.data.status === 401)
      {
        Swal.fire('Failed', res.data.message, 'error')
        history.push('/alltrip')
      }
    })
  }


  return (
    <div>
        <div className='bacg'></div>
          <div className='py-3 bg-light'>
                  <div className='container'>
                    {/* <h6>Alltrip / {data.category.category} </h6> */}
                </div>
          </div>
        <div className='container'>
          <div className='row p-3'>
              <div className='col-12 col-md-6'>
                <img className='imagedetail' src={`https://backendjalan.herokuapp.com/${data.image}`} />
              </div>
              <div className='col-12 col-md-6 '>
                  <h1 className='' style={{fontWeight:'900'}}>{data.name}</h1>
                  <h6 className='mt-2'> <SiGooglemaps /> {data.lokasi}</h6>                 
                  <h5 className='mt-3'> <span style={{ color:'#ff9100' }}>$</span><span style={{ fontWeight:'900', fontSize:'30px'}} >{data.harga}</span><span style={{ fontSize:'15px' }}>/persons</span></h5>    
                  <div className='mt-4 border-service p-3'>
                      <h5 className='service'>SERVICE</h5>
                      <h6 className='descdeatil'>{data.description}</h6>
                  </div>           
              </div>
          </div>
            <h1 className='text-center mt-5' style={{ fontWeight:'900' }}>BOOK HERE</h1>
          <form className='row mt-4' onSubmit={submitt}>
              
              <div className='col-md-6 col-12'> 
                <label>Name</label>
                <input type='text' value={orderr.name} onChange={inputorder} name="name"  placeholder='Enter Name...' className='p-2' style={{ width:'100%', borderRadius:'10px' }} />       
              </div>
              <div className='col-md-6 col-12 mt-4 mt-md-0'>  
                <label>Contact</label>
                <input type='text' value={orderr.contact}   onChange={inputorder}   name="contact"   placeholder='Enter Contact...' className='p-2' style={{ width:'100%', borderRadius:'10px' }} />       
              </div>  
              <div className='col-md-6 col-12 mt-4'>  
                <label>Date</label>
                <input type='date' value={orderr.date}  onChange={inputorder}  name="date"  className='p-2' style={{ width:'100%', borderRadius:'10px' }} />       
              </div>  

              <div className='col-md-6 col-12 mt-4'>  
              <label>Number of Tourists</label>
              <input type='number' value={orderr.qty} min="0"  onChange={inputorder}   name="qty"  className='p-2' style={{ width:'100%', borderRadius:'10px' }} />       
              </div>  
            <button type="submit"   className='mt-4 p-2' style={{ backgroundColor:'rgb(34, 66, 92)', color:'#fff', fontWeight:'900' }} > CHECKOUT</button>


           
          </form>
        
        </div>
       
      
          



    </div>
  )
}

export default Productdetail