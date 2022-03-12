import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';

const Viewtesti = () => {

    const [data, setdata] = useState([])
   

    useEffect(() => {

        axios.get(`/api/viewtesti`).then(res => {
            if(res.data.status === 200)
            {
                setdata(res.data.testi)

            }
        })
        
    
   
    }, [])

    const deletee = (e, id) => {
        e.preventDefault();
       
        const klik = e.currentTarget;
        klik.innerText = 'Deleting';

        axios.delete(`/api/deletetesi/${id}`).then(res => {
            if(res.data.status === 200)
            {
                Swal.fire("Success", res.data.message, 'success')
                klik.closest("tr").remove();
            }
            else if (res.data.status === 401) 
            {
                Swal.fire("Error", res.data.message, 'error') 
            }

        })
    } 




  return (
   <div className='container'>
       <div className='row' >
       {
           data.map((item) => {
               return (
                   
                         <div className='col-md-4 col-12 d-flex justify-content-center'  key={item.id}> 
                            <div className="card-body d-flex flex-column align-items-center">
                                <h3 className="card-title d-flex justify-content-center" style={{ fontWeight:'900'}}>{item.name}</h3>
                                <p className="card-text text-center">{item.ulasan}</p>
                                <ReactStars count={5}
                                    value={item.bintang}
                                    size={40}
                                    isHalf={true}
                                    className="text-center"
                                    
                                    activeColor="#ffd700"
                                    ></ReactStars>
              
            
                                <button type='button' onClick={(e) => deletee(e, item.id)}  className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    
                )
           })
       }
            
       

     
   </div>
   </div>
  )
}

export default Viewtesti