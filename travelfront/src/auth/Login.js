import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import {BiUser} from 'react-icons/bi'


const Login = () => {


    const history = useHistory()
    const [log, setlog] = useState({
  
        email:'',
        password:'',
        error: []
    
    })
    
    const logh = (e) => {
        e.persist();
        setlog({...log, [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        e.preventDefault();

        const data = {
            email: log.email,
            password: log.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`api/login`, data).then(res=> {

            if(res.data.status === 200)
            {
                localStorage.setItem('auth_token', res.data.token)
                localStorage.setItem('auth_name', res.data.username)
                Swal.fire(
                    'Success',
                    res.data.message,
                    'success'
                  )
                  if(res.data.role === 'admin')
                  {
                    history.push('/admin/dashboard');
                  }     
                  else{
                      history.push('/');

                  }
            }
            else if(res.data.status === 401)
            {
                Swal.fire(
                    'Warning',
                    res.data.message,
                    'warning'
                  )
            }
            else{
                setlog({...log, error: res.data.validator_errors})
            }


        })
        })
    }


  return (
    <div>
        <div className='bacg'></div>
        <div className='container mt-5 d-flex justify-content-center'>
            <div className='login d-flex justify-content-center p-2 pb-2'>
                <form onSubmit={submit} className=' d-flex flex-column w-75' >       
                    <div className='text-center mb-4' style={{ marginTop:'-33px' }} >
                        <BiUser className='iconlogin' />
                    </div>
                    <input className='p-2 rounded' style={{ height: '20%', outline:'none', border:'none' }} type='email'  placeholder='Email' name='email' onChange={logh} value={log.email} />
                    <span className='text-danger ' style={{ fontSize:'10px' }}>{log.error.email}</span>
                    <input className='p-2 mt-3 rounded' style={{  height: '20%', outline:'none', border:'none' }}  type='password' placeholder='Password' name='password' onChange={logh} value={log.password} />
                    <span className='text-danger ' style={{ fontSize:'10px' }}>{log.error.password}</span>
                    <Link style={{ textDecoration:'none', color:'#000', fontSize:'10px' }} className='text-end my-2'>Forgot password?</Link>
            
                    <button className='' style={{ height:'50px', backgroundColor:'rgb(34, 66, 92)', fontWeight:'900', color:'#fff'}} type='submit' >LOG IN</button>

                    <h6 className='text-center  mt-3 ' style={{ fontSize:'13px' }}>No Account? <Link className='text-decoration-none' to='/register'>Sign Up</Link> </h6>
                </form> 
            </div>
        </div>

    </div>
  )
}

export default Login