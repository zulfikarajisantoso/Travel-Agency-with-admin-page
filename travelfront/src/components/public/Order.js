import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Order = () => {

    const [data, setdata] = useState([])
    const history = useHistory()
  

    if(!localStorage.getItem('auth_token')) {
        history.push('/');
        Swal.fire("Warning", "Login to goto Cart Page", "error")
    }
    


    useEffect(() => {
        let isMounted = true 
    
        axios.get(`/api/ordeview`).then(res => {
            if(isMounted)
            {
                
                if(res.data.status === 200)
                {
                    setdata(res.data.orderr)
                    console.log(res.data.orderr)
                    
                }
                else if (res.data.status === 401)
                {
                    history.push('/')
                    Swal.fire('Warning', res.data.message, "error")
                } 
            }
                
        })
        return () => {
            isMounted = false
        }
    }, [history])


    const remove = (e, order_id) => {
        e.preventDefault();

      

        axios.post(`/api/removeorder/${order_id}`).then(res => {
            if(res.data.status === 200)
            {
                Swal.fire('Success', res.data.message, 'success')
              
            }
            else 
            {
                Swal.fire("Error", res.data.message, "Error")
            
            }
        })
    }
    

  return (
    <div className=''>
        <div className='bacg'></div>
        <div className='container contai mt-2 p-3' style={{ border:'2px solid #000'}}>
            <h2 className='text-center' style={{ fontWeight:'900' }} >Orders Detail</h2>
            {
                data.map((item) => {
                    return (
                        <div className='mt-5'>
                            <img className='gam' src={`https://backendjalan.herokuapp.com/${item.trip.image}`}  />
                             <h1 className='text-center mx-5' style={{ fontSize:'70px', fontWeight:'900' }}>{item.name}</h1>

                            
                             <table class="table">
                                <thead>
                                    <tr>
                                 
                                    <th scope="col">Your Contact</th>
                                    <th scope="col">Reserved Date</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Number of Tourists</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    
                                    <td>{item.contact}</td>
                                    <td>{item.date}</td>  
                                    <td>${item.trip.harga}</td>   
                                    <td>{item.qty}</td>   
                                    <td>${item.trip.harga * item.qty}</td>   
                                    <td>{item.status}</td>    
                                  
                                    </tr>
                                   

                                </tbody>
                                </table>
                            <div className='d-flex justify-content-between'>
                                <button onClick={(e) => remove(e, item.id)} type='button' className='btn btn-md btn-danger ' >Cancel</button>
                                <Link to='/payment' className='btn btn-md btn-warning' >Proof of Payment</Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>  
    </div>
  )
}

export default Order