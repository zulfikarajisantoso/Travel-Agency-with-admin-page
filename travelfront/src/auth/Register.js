import axios from 'axios'
import {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {FiUserPlus} from 'react-icons/fi'



const Register = () => {

  const history = useHistory()
  const [registrasi, setregistrasi] = useState({
    name : '',
    email : '',
    password : '',
    error_list: [],
  })
  const handlein = (e) => {
    e.persist();
    setregistrasi({...registrasi, [e.target.name]: e.target.value})
  }

  const [cek, setcek] = useState([])
  const ceks = (e) => {
      e.persist();
      setcek({...cek, [e.target.name]: e.target.checked})
  }



  const submit = (e) => {
    e.preventDefault();
    const data = {
      name: registrasi.name,
      email: registrasi.email,
      password: registrasi.password,
      role_as: cek.role_as ? '1' : '0',
    }
    // console.log(data)
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`, data )
      .then(res => {
        if(res.data.status === 200)
        {
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_name', res.data.username)
          
          Swal.fire(
            'Success',
            res.data.message,
            'success'
          )
          history.push('/');
        }
        else{
          setregistrasi({...registrasi, error_list: res.data.validator_errors})
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
                        <FiUserPlus className='iconlogin p-3' />
                  </div>
                <input className='p-2 rounded' style={{ height: '20%', outline:'none', border:'none' }}  type='input' placeholder='Name' name='name' onChange={handlein} value={registrasi.name} />
                  <span  className='text-danger ' style={{ fontSize:'10px' }}>{registrasi.error_list.name}</span>
                <input className='p-2 mt-3 rounded' style={{  height: '20%', outline:'none', border:'none' }}   type='email' placeholder='Email' name='email' onChange={handlein} value={registrasi.email} />
                  <span  className='text-danger ' style={{ fontSize:'10px' }}>{registrasi.error_list.email}</span>
                <input className='p-2 mt-3 rounded' style={{  height: '20%', outline:'none', border:'none' }}   type='password' placeholder='Password' name='password' onChange={handlein} value={registrasi.password} />
                  <span  className='text-danger ' style={{ fontSize:'10px' }}>{registrasi.error_list.password}</span>
                <div className='d-flex align-items-center justify-content-end'>
                  <label className='' style={{ fontSize:'10px', lineHeight:'10px', marginRight:'3px' }}>Not required</label>
                  <input className='my-3 rounded-full' type='checkbox' name='role_as' onChange={ceks} defaultChecked={cek.status === 1 ? true:false} />   

                </div>


                <button style={{ height:'50px', backgroundColor:'rgb(34, 66, 92)', fontWeight:'900', color:'#fff'}} type='submit' >Submit</button>

                <h6 className='text-center  mt-3 ' style={{ fontSize:'13px' }}>Have Account? <Link className='text-decoration-none' to='/login'>Sign In</Link> </h6>
            </form> 
  
          </div>
       </div>
    </div>
  )
}

export default Register

