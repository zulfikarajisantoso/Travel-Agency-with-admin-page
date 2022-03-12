import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'


const Editdestinasi = (props) => {


    const history = useHistory()
    const [error, seterror] = useState([])
    const [loading, setloading] = useState(true)
    const [category, setcategory] = useState([])
    const [allcek, setallcek] = useState([])
    const [img, setimg] = useState([])
    const [trip, settri] = useState({

        category_id:'',
        name: '',
        harga: '',
        lokasi: '',
        description: '',
  
        
    })

    const inp = (e) => {
      e.persist();
      settri({...trip, [e.target.name]: e.target.value})
  } 
    const inputcek = (e) => {
        e.persist();
        setallcek({...allcek, [e.target.name]: e.target.checked})
    }

    const imgg = (e) => {
        e.persist()
        setimg({image: e.target.files[0]})

    }
   
  
        
  useEffect(() => {
   
    axios.get(`/api/allcategory`) .then(res => {
      if(res.data.status === 200)
      {
        setcategory(res.data.category)
      }
      
    }); 
    const des_id = props.match.params.id
    axios.get(`/api/edittrip/${des_id}`).then(res => {
        if(res.data.status === 200)
        {
            settri(res.data.tripp)
            setallcek(res.data.tripp)
        
            
        
        } else {
                Swal.fire("Error", res.data.message, "error")
                 history.push('/admin/viewdestinasi')
         }
        setloading(false);
    })


  }, [])




 
    const submit = (e) => {
            e.preventDefault();
            
            const des_id = props.match.params.id
            const formdata = new FormData();
            formdata.append('image', img.image);
            formdata.append('category_id', trip.category_id);
            formdata.append('harga', trip.harga);
            formdata.append('name', trip.name);
            formdata.append('lokasi', trip.lokasi);
            formdata.append('description', trip.description);
            formdata.append('popular', allcek.popular  ? '1' : '0');
          
          
            axios.post(`/api/updatetrip/${des_id} `, formdata) .then(res => {
              
              if(res.data.status === 200)
              {
             
                Swal.fire('Success', res.data.message, 'success')
                history.push('/admin/viewdestinasi')
                
              }  
              else if(res.data.status === 422)
              {  
                seterror(res.data.errors);
              }
              else if(res.data.status === 404)
              {
                Swal.fire("Error", res.data.message,"error")
                  history.push('/admin/viewdestinasi')
                 
              }
  
           
            })
            
    }
          
          





  return (
    <div className='container-fluid px-5 '  >
  
        <h3 className='d-flex justify-content-center my-3 my-md-0 py-3 ' style={{ fontWeight:'900' }}>Edit Trip</h3>
      

 <form  onSubmit={submit} >

  <div className='row '>
      <div className=" col-12 col-md-6  form-group mb-3"> 
          <label className="form-control-label">Select Category <span className="text-danger"> *</span></label> 
         
            <select name="category_id" className="form-select"  onChange={inp} value={trip.category_id}>
                {
                    category.map ((item) => {
                      return (
                         <option value={item.id} key={item.id}>{item.category}</option>
                             )
                           })
                 }

          <span className='text-danger' style={{ fontSize:'10px' }}>{error.category_id}</span>              
            </select>
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
          <span className='text-danger' style={{ fontSize:'10px' }}>{error.lokasi}</span>
        </div>
        <div className="col-12 form-group mb-3 "> 
          <label className="form-control-label ">Description<span className="text-danger"> *</span></label> 
          <textarea type="textarea" name="description" onChange={inp} value={trip.description} className='form-control'  /> 
          <span className='text-danger' style={{ fontSize:'10px' }}>{error.description}</span>
        </div>
        <div className="col-12 form-group mb-3 "> 
        <label>Popular</label>
        <input type="checkbox" name="popular"  onChange={inputcek} defaultChecked={allcek.popular === 1 ? true:false} className='h-50 w-50'/>
         
        </div>
        <div className='col-12 form-group mb-3'>
              <label>Image</label>
              <input type="file" name="image" onChange={imgg}  className='form-control'/>
              <img src={`https://backendjalan.herokuapp.com/${trip.image}`} width="50px" />
              <span className='text-danger' style={{ fontSize:'10px' }}>{error.image}</span>
                
        </div>
    </div>
      
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>

</div>
  )
}

export default Editdestinasi