import React, { useEffect, useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import {BiCategoryAlt} from 'react-icons/bi'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Categorytrip = (props) => {

    const [data, setdata] = useState([])
    const [category, setcategory] = useState([])
    const history  = useHistory()
    

    useEffect(() => {
        
        let isMounted  = true
        const category = props.match.params.category
        axios.get(`/api/categoyview/${category}`).then(res => {
            if(isMounted )
            {
                if(res.data.status === 200)
                {
                    setdata(res.data.trip_data.trip)
                    setcategory(res.data.trip_data.category)
                    // console.log(res.data.trip_data.trip)
                    // console.log(res.data.trip_data.category)
                }
                else if(res.data.status === 400)
                {
                    Swal.fire("Error", res.data.message, 'error')
                }
                else if(res.data.status === 404)
                {
                    history.push('/alltrip')
                    Swal.fire("Error", res.data.status, 'error')
                }
            }
        })
        return () => {
            isMounted  = false
        }

    }, [props.match.params.category,history])

    const [search, setsearch] = useState('')

    
    

  return (
    <div>
      <div className='bacg'></div>
        <div className='d-flex justify-content-between container mt-5'>
          
            <h4 className='text-center fontcate d-flex align-items-center' style={{ fontWeight:'900' }}> Category / {category.category} <BiCategoryAlt />  </h4>
           
            <div className='d-flex justify-content-center   '>
                <input className='allseaa'  onChange={(e) => {setsearch(e.target.value)}} placeholder='Search...' />
                <button className='tomboll d-flex justify-content-center align-items-center'> <FiSearch style={{ marginRight:'2px'}} /> <span className='d-none d-md-flex'>Search</span> </button>
            </div>          
            
        </div>
        <div className='container'>
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
  )
}

export default Categorytrip