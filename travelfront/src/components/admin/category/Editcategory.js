import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Editcategory = (props) => {

    const [loading, setloading] = useState(true)
    const history = useHistory()
  
  const [error , seterror] = useState([]);
  const [cate, setcate] = useState({

      category: '',
      description: '',

  })
  const inpt = (e) => {
    e.persist();
    setcate({...cate, [e.target.name]: e.target.value})
  } 
    useEffect(() => {
      const catid = props.match.params.id;
      axios.get(`/api/editcategory/${catid}`).then(res => {
        if(res.data.status === 200)
        {
            setcate(res.data.category)
        }
        else if(res.data.status === 404)
        {
            Swal.fire("Error", res.data.message, "error");
            history.push('/admin/viewcategory')
        }
        setloading(false)
      })
    
    
    }, [props.match.params.id, history])
    




  const submit = (e) => {
    e.preventDefault();
   
    const category_id = props.match.params.id;
    const formdata = new FormData();
      formdata.append('category',cate.category );
      formdata.append('description',cate.description );
   
      
      

    axios.post(`/api/updatecategory/${category_id}`, formdata).then(res => {
      if(res.data.status === 200)
      {
        Swal.fire('Success', res.data.message, "success");   
        history.push('/admin/viewcategory')   
        seterror([]);
        

      }
      else if(res.data.status === 400 )
      {
        seterror(res.data.errors)
      }
      else if(res.data.status === 404)
      {
        Swal.fire("error", res.data.message, "error")
        history.push('/admin/viewcategory')

      }
    })
    
  }
  if(loading)
  {
      return <h4>Loading...</h4>
      
  }

  return (
    <div className='container-fluid px-5'  >
        <h3 className='d-flex justify-content-center my-3 my-md-0 py-3 ' style={{ fontWeight:'900' }}>Edit Category</h3>
   <form onSubmit={submit} >

    <div className='row'>
        <div className=" col-12  form-group mb-3"> 
            <label className="form-control-label">Category <span className="text-danger"> *</span></label> 
            <input type="text" className='form-control' onChange={inpt} value={cate.category} name="category" /> 
            <span className='text-danger' style={{ fontSize:'10px' }}>{error.category}</span>
          </div>
          <div className="col-12  form-group mb-3 "> 
            <label className="form-control-label ">Description<span className="text-danger"> *</span></label> 
            <textarea type="textarea" name="description" onChange={inpt}  value={cate.description} className='form-control'  /> 
            <span className='text-danger' style={{ fontSize:'10px' }}>{error.description}</span>
          </div>
          
      </div>
        
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

</div>
  )
}

export default Editcategory