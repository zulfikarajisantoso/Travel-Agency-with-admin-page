import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FiSearch} from 'react-icons/fi';
import {FaFly} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Alltrip = () => {

    const [data, setdata] = useState([])

    useEffect(() => {
        
        axios.get(`/api/destinasi`).then(res => {
            if(res.data.status === 200)
            {
                setdata(res.data.tripp)
            }
        })
    }, [])
    
    const [search, setsearch] = useState('')

  return (
   <div >
       <div className='bacg'></div>
    <div className='alltrip ' style={{ height:''}}>
      <div className='container mt-5 d-flex flex-column '>
            <h1 className='text-center' style={{ fontWeight:'900' }}>All Destination <FaFly />  </h1>
            <div className='d-flex justify-content-center '>
                <input className='allsea' onChange={(e) => {setsearch(e.target.value)}} placeholder='Search...' />
                <button className='tombol'> <FiSearch /> Search</button>
            </div>
            <div className='row mt-3'>
                {
                
                    data.filter((val) => {
                        if(search == ''){
                         return val
                        }
                        else if (val.name.toLowerCase().includes(search.toLowerCase()))
                        {
                            return val
                        }
                    }).map((item) => {
                        return (
                        <div className='col-12 mt-4 col-lg-4 d-flex flex-column align-items-center' key={item.id}>
                            
                                <Link className='text-decoration-none ' to={`/alltrip/${item.category.category}/${item.id}`}>
                                    <img className='gambarr' src={`https://backendjalan.herokuapp.com/${item.image}`}  />
                                    
                                </Link>
                        
                            <Link  to={`/alltrip/${item.category.category}/${item.id}`} type='button' className='text-decoration-none justify-content-center d-flex align-items-center bgbottom' style={{ width:'60%', height:'40px', or:'#fff', marginTop:'-25px', fontWeight:'700'}} > Book Now
                            </Link>
                                <h4 className='nameall text-decoration-none mt-2' >{item.name}</h4>
                                <h6 className='text-decoration-none'> <span  style={{ fontWeight:'900', fontSize:'19px'}} >${item.harga}</span>  <span style={{ fontSize:'16px'}}> /persons </span></h6>
                            
                        </div>
                        )
                    })
                }
              
            </div>
      </div>

 
    </div>
   </div>
  )
}

export default Alltrip