import React,{useEffect, useState} from 'react'
import axios from 'axios'

const Proofpayment = () => {

  const [data, setdata] = useState([])
  
  
  useEffect(() => {
    
    axios.get(`/api/viewpay`).then(res => {
      if(res.data.status === 200)
      {
        setdata(res.data.payment)
      }
      
      
    })

  }, [])
  

  return (
    <div>
          <div className='container px-4'> 
    <div className='card mt-4'>
        <div className='card-header '>
            <h4 className='text-center' style={{ fontWeight:'900' }}>View Pay                
            </h4>
        </div> 
        <div className='table-responsive'>
        <div className='card-body'>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>User_id</th>
                        <th>Fullname</th>
                        <th>Account Number</th>
                        <th>Image</th>
                        <th>Post Date</th>                  
                                          
                        
                       
                    </tr>
                </thead>
                <tbody>
                  {
                    data.map((item) => {
                      return (
                        <tr key={item.id}>                  
                          <td>{item.user_id}</td>
                          <td>{item.fullname}</td>
                          <td>{item.accountnumber}</td>
                          <td>
                              <img className='w-100' src={`https://backendjalan.herokuapp.com/${item.image}`} />
                          </td>
                          <td>{item.created_at}</td>

                        
                    </tr>
                      )
                    })
                  }

                
                </tbody>
            </table>
        </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Proofpayment