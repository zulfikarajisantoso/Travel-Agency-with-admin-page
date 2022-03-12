import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Addcategory = () => {

  const [cate, setcate] = useState({
    category:'',
    desc:'',
    error: []

  })
  
  // const [first, setfirst] = useState(second)

  const inpt = (e) => {
    e.persist();
    setcate({...cate, [e.target.name]: e.target.value})
  } 
 

  const submit = (e) => {
    e.preventDefault();
   
    const formdata = new FormData();
    formdata.append('category',cate.category );
    formdata.append('description',cate.desc );     

    axios.post(`/api/addcategory`, formdata).then(res => {
      if(res.data.status === 200)
      {
        Swal.fire('Success', res.data.message, "success");
      
        setcate({...cate,
          category: '',
          desc: '',
         
        })

      }
      else if(res.data.status === 400 )
      {
          setcate({...cate, error: res.data.error})
      }
    })
    
  }


  return (
    <div className='container-fluid px-5'  >

    <div className='row mt-2 mt-md-0'>
          <div className='col-12 col-md-6 d-flex justify-content-center  align-items-center justify-content-md-start '> 
            <h4 style={{ fontWeight:'900' }}>Add Category</h4>
          </div>
          <div className='col-12 col-md-6 my-3 mb-md-1  d-flex align-items-center justify-content-center justify-content-md-end '>
              <Link to='/admin/viewcategory' className='btn btn-primary btn-sm float-end'> View Category</Link>
          </div>
        </div>

       <form onSubmit={submit} id="CATEGORY_FORM">

        <div className='row'>
            <div className=" col-12  form-group mb-3"> 
                <label className="form-control-label">Category <span className="text-danger"> *</span></label> 
                <input type="text" className='form-control' onChange={inpt} value={cate.category} name="category" /> 
                <span className='text-danger' style={{ fontSize:'10px' }}>{cate.error.category}</span>
              </div>
              <div className="col-12  form-group mb-3 "> 
                <label className="form-control-label ">Description<span className="text-danger"> *</span></label> 
                <textarea type="textarea" name="desc" onChange={inpt}  value={cate.desc} className='form-control'  /> 
                <span className='text-danger' style={{ fontSize:'10px' }} >{cate.error.description}</span>
              </div>
             
          </div>
            
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Addcategory