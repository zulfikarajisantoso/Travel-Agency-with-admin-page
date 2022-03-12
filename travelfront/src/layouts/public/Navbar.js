import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {AiOutlineLogout, AiOutlineBars} from 'react-icons/ai'
import {HiOutlineLogin} from 'react-icons/hi'
import Swal from 'sweetalert2';

const Navbar = () => {

  const history = useHistory()
  const logout = (e) => {
 

    axios.post('/api/logout').then(res => {
        if(res.data.status === 200)
        {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_name')
                Swal.fire("Success", res.data.message, "success");
                history.push('/')
            
        }
    });
  }


  var autbut = '';
  if(!localStorage.getItem('auth_token'))
  {
    autbut = (
      <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link text-light" to='/login'> <HiOutlineLogin/> Login</Link>
          </li>
                   
      </ul>
    )
  }
  else
  {
    autbut = (
      <ul className="navbar-nav">
         
         <li className="nav-item list-unstyled">
          <Link to='/order' type='button' style={{ color:''}} className=' text-light nav-link btn btn-sm '>Orders </Link>
        </li>
        <li className="nav-item list-unstyled">
          <button onClick={logout} type='button' style={{ color:'rgb(190, 95, 95)'}} className=' text-light nav-link btn btn-sm btn-danger rounded p-1 p-md-none'>Logout <AiOutlineLogout /> </button>
        </li>
      </ul>
    )
  }


  const [click, setclick] = useState(false)
  const handleclick = () => setclick(!click)


  const [data, setdata] = useState([])

  useEffect(() => {

    axios.get(`/api/categoyview`).then(res => {
      if(res.data.status === 200)
      {
        setdata(res.data.category)
      }
    })
  }, [])
  


  return (

  <nav className="navbar navbar-expand-lg">
  <div className="container">
    <Link className="navbar-brand text-light np2" to='/' >Ja.<span className='np1 fw-1 ' style={{ lineHeight:'10px' }} >lan</span> </Link>
    <button className="navborder d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <AiOutlineBars className='iconav' />
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <NavLink  to='/' className="nav-link text-light  " onClick={handleclick} exact activeClassName="active" >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/alltrip' className="nav-link text-light " onClick={handleclick} exact activeClassName="active"  >All Trip</NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink to='/addtestimonials' className="nav-link  text-light " onClick={handleclick} exact activeClassName="active"  >Testimonials</NavLink>
        </li>
       
        <li className="nav-item">
       
            <button class="btn dropdown-toggle nav-link text-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </button>
         
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
              data.map((item) => {
                return (
                  <Link class="dropdown-item" to={`/alltrip/${item.category}`} >{item.category}</Link>

                )
              })
            }
           
          </div>
 
        </li>     
          
   
      </ul>
    </div>
    <div className='d-flex justify-content-center  mt-2 mt-none'>
        {autbut}

    </div>
  </div>
</nav>


  )
}

export default Navbar