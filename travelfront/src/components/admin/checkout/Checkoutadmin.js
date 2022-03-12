import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Checkoutadmin = () => {

  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)



  useEffect(() => {

    axios.get(`/api/ordeview`).then(res => {
      if(res.data.status === 200)
      {
        setdata(res.data.orderr)
        setloading(false)
        
      }

    })
    

  }, [])

  var chek = '';

  if(loading)
  {
    return <h1>Loading.....</h1>
  }
  else 
  {
    chek = 
    data.map((item) => {
        return(
            <tr key={item.id}>                  
                <td>{item.user_id}</td>
                <td>{item.trip_id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.contact}</td>
                <td>{item.qty}</td>
                <td>{item.status}</td>
              
                <td>
                    <Link to={`editcheckout/${item.id}`} className=' btn btn-md btn-warning'>Edit</Link>
                </td>
                <td>
                    {/* <button type='button' onClick={(e) => deletee(e, item.id)}  className=' btn btn-sm btn-danger'>Delete</button> */}
                </td>
            </tr>
        )
    })
  }






  return (
    <div className='container px-4'> 
    <div className='card mt-4'>
        <div className='card-header '>
            <h4 className='text-center' style={{ fontWeight:'900' }}>View Checkout
                {/* <Link to='/admin/addestinasi' className='btn btn-primary btn-sm float-end'> Add Trip</Link> */}
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
                        <th>Action</th>
                        
                       
                    </tr>
                </thead>
                <tbody>
                   
                  
                    {chek}
                </tbody>
            </table>
        </div>
        </div>
    </div>
</div>
  )
}

export default Checkoutadmin