import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'

const Editcheck = (props) => {

    const history = useHistory()
    const [error, seterror] = useState([])
    const [stat, setstat] = useState({
        status:'',
    })


    const oncha = (e) => {
      
        e.persist()
        setstat({...stat, [e.target.name]: e.target.value})
    }

    useEffect(() => {

        const id = props.match.params.id;
        axios.get(`/api/chekoutconfirm/${id}`).then(res => {
          if(res.data.status === 200)
          {
            // console.log(res.data.order)
            setstat(res.data.order)       
            // setdata(res.data.order)       
            
          }
    
        })
        
    
      }, [props.match.params.id])


    const update = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('status',stat.status);

        const id = props.match.params.id;
        axios.post(`/api/chekoutupdate/${id}`, formdata).then(res => {
            if(res.data.status === 200)
            {
                Swal.fire('Success', res.data.message, 'success')
                history.push('/admin/viewcheckout')
            }
            else if(res.data.status === 404)
            {
                Swal.fire('Error', res.data.message, 'error')
                history.push('/admin/viewcheckout')
            }
            else if(res.data.status === 422)
            {
                seterror(res.data.errors)
        
            }
        })

        
    }

  return (
    <div className='container px-4'> 
    <div className='card mt-4'>
        <div className='card-header '>
            <h4 className='text-center' style={{ fontWeight:'900' }}>Edit Checkout                
            </h4>
        </div> 
        <div className='table-responsive'>
        <div className='card-body'>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>User_id</th>
                        <th>Trip_id</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Date</th>                  
                        <th>Total Travelers</th>                    
                        <th>Status</th>                    
                        
                       
                    </tr>
                </thead>
                <tbody>
                                    <td>{stat.user_id}</td>
                                    <td>{stat.trip_id}</td>
                                    <td>{stat.name}</td>
                                    <td>{stat.date}</td>
                                    <td>{stat.contact}</td>
                                    <td>{stat.qty}</td>
                           
                  
                   <div>
                        <form onSubmit={update} >
                     
                            <input type='text'  name='status' onChange={oncha} value={stat.status} />
                            <span className='text-danger'>{error.status}</span>
                            
                            <button className='btn btn-md btn-success' type='submit'> Submit </button>
                        </form>
                        
                   </div>
                  
                
                </tbody>
            </table>
        </div>
        </div>
    </div>
</div>
  )
}

export default Editcheck