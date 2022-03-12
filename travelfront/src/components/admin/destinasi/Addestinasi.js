import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Addestinasi = () => {

  const history = useHistory()
  const [error, SetError] = useState([])
  const [category, setcategory] = useState([])
  const [trip, settrip] = useState({
    category_id:'',
    name: '',
    harga: '',
    lokasi: '',
    description: '',
    popular:'',

  })

  const inp = (e) => {
    e.persist();
    settrip({...trip, [e.target.name]: e.target.value})
  }

  useEffect(() => {
   
    axios.get(`/api/allcategory`) .then(res => {
      if(res.data.status === 200)
      {
        setcategory(res.data.category)
      }
      
    }); 

  }, [])



  
  
  const [img, setimg] = useState([])
  const imgg = (e) => {
    e.persist()
    setimg({image: e.target.files[0]})
  }

  const [allcek, setcek] = useState([])
  const inputcek = (e) => {
      e.persist();
      setcek({...allcek, [e.target.name]: e.target.checked})
  }
  
const submit = (e) => {
  e.preventDefault();

  const formdata = new FormData();
  formdata.append('image', img.image);
  formdata.append('category_id', trip.category_id);
  formdata.append('harga', trip.harga);
  formdata.append('name', trip.name);
  formdata.append('lokasi', trip.lokasi);
  formdata.append('description', trip.description);
  formdata.append('popular', allcek.popular  ? '1' : '0');


  axios.post(`/api/addtrip `, formdata) .then(res => {
    
    if(res.data.status === 200)
    {
      console.log(formdata)
      Swal.fire('Success', res.data.message, 'success')
      settrip({...trip,
        category_id:'',
        name: '',
        harga: '',
        lokasi: '',
        description: '',
      })
      SetError([]);
    }  
  else if(res.data.status === 422)
  {
      SetError(res.data.errors);
      
  }

  })
  
}



  return (
    <div className='container-fluid px-5'  >
       <div className='row mt-2 mt-md-0'>
          <div className='col-12 col-md-6 d-flex justify-content-center  align-items-center justify-content-md-start '> 
            <h4 style={{ fontWeight:'900' }}>Add Trip</h4>
          </div>
          <div className='col-12 col-md-6 my-3 mb-md-1  d-flex align-items-center justify-content-center justify-content-md-end '>
              <Link to='/admin/viewdestinasi' className='btn btn-primary btn-sm float-end'> View Trip</Link>

          </div>
        </div>
      
   <form  onSubmit={submit} id="CATEGORY_FORM">

    <div className='row'>
        <div className=" col-12 col-md-6  form-group mb-3"> 
            <label className="form-control-label">Select Category <span className="text-danger"> *</span></label> 
           
              <select name="category_id" className="form-select"  onChange={inp} value={trip.category_id}>
                <option selected>Select Category Trip</option>
                
                                    {
                                        category.map ((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.category}</option>
                                            )
                                        })
                                    }

                               
              </select>
              <span className='text-danger' style={{ fontSize:'10px' }}>{error.category_id}</span>
          </div>
        <div className=" col-12 col-md-6 form-group mb-3"> 
            <label className="form-control-label">Name <span className="text-danger"> *</span></label> 
            <input type="text" className='form-control' onChange={inp} value={trip.name} name="name" /> 
            <span className='text-danger' style={{ fontSize:'10px' }}>{error.name}</span>
          </div>
          <div className="col-12 col-md-6  form-group mb-3 "> 
            <label className="form-control-label "> Harga <span className="text-danger"> *</span></label> 
            <input type="text" className='form-control' onChange={inp} value={trip.harga}  name="harga" /> 
            <span className='text-danger' style={{ fontSize:'10px' }}>{error.harga}</span>
         
          </div>
          <div className="col-12 col-md-6  form-group mb-3 "> 
            <label className="form-control-label ">Lokasi<span className="text-danger"> *</span></label> 
            <input type="text" className='form-control' onChange={inp} value={trip.lokasi} name="lokasi" /> 
           
            <span className='text-danger' style={{ fontSize:'10px' }} >{error.lokasi}</span>
          </div>
          <div className="col-12 form-group mb-3 "> 
            <label className="form-control-label ">Description<span className="text-danger"> *</span></label> 
            <textarea type="textarea" name="description" onChange={inp} value={trip.description} className='form-control'  /> 
           
            <span className='text-danger' style={{ fontSize:'10px' }}>{error.description}</span>
          </div>
          <div className="col-12 form-group mb-3 "> 
          <label>Popular</label>
          <input type="checkbox" name="popular"  onChange={inputcek} value={allcek.popular} className='h-50 w-50'/>
      
          </div>
          <div className='col-12 form-group mb-3'>
                <label>Image</label>
                <input type="file" name="image" onChange={imgg}  className='form-control'/>
              
                <span className='text-danger' style={{ fontSize:'10px' }}>{error.image}</span>
                  
          </div>
      </div>
        
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

</div>
  )
}

export default Addestinasi