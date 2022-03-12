import axios from 'axios';
import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Addtesti = () => {


    const [testi, settesti] = useState({
        name:'',
        asal: '',
        ulasan: '',
        rating: '',
      
      })
       const [error, seterror] = useState([])
      
      const [rat, setrat] = useState([])
      const ratingg = (rating) => {
        setrat({rating})  
      }
      const inp = (e) => {
        e.persist();
        settesti({...testi, [e.target.name]: e.target.value})
      }

      const submit = (e) => {
        e.preventDefault();

          const formdata = new FormData();
          formdata.append('name', testi.name)
          formdata.append('asal', testi.asal)
          formdata.append('ulasan', testi.ulasan)
          formdata.append('bintang', rat.rating)     
          
          console.log(formdata)
         
        axios.post(`/api/addtesti` , formdata).then(res => {
          if(res.data.status === 200)
          {
            Swal.fire("Success", res.data.message, 'success');
            settesti({...testi, 
              name:'',
              asal: '',
              ulasan: '',
              bintang: '',
            })
            setrat({ rating:''})
            seterror('')
          }
          else{
            seterror(res.data.errorr)
          }
        })
      }
    


  return (
    <div>

 
    <div className='bacg'></div>
    <div className='container p-5'  >
       
        <div className='row mt-2 mt-md-0'>
            <div className='col-12 my-2 d-flex justify-content-center  align-items-center '> 
              <h4  className="" style={{ fontWeight:'900' }}>Add Testimonials</h4>
            </div>       
          </div>
    

  
    <form  onSubmit={submit} id="CATEGORY_FORM">

      <div className='row'>
          
          <div className=" col-12 col-md-6 form-group mb-3"> 
              <label className="form-control-label">Name</label> 
              <input type="text" className='form-control' onChange={inp} value={testi.name} name="name" /> 
              <span className='text-danger' style={{ fontSize:'10px' }}>{error.name}</span>
              
            </div>
            <div className="col-12 col-md-6  form-group mb-3 "> 
              <label className="form-control-label "> Origin</label> 
              <input type="text" className='form-control' onChange={inp} value={testi.asal}  name="asal" /> 
              <span className='text-danger' style={{ fontSize:'10px' }}>{error.asal}</span>
            
            </div>
            <div className="col-12 form-group mb-3 "> 
              <label className="form-control-label ">Review</label> 
              <textarea type="textarea" name="ulasan" onChange={inp} value={testi.ulasan} className='form-control'  /> 
              <span className='text-danger' style={{ fontSize:'10px' }}>{error.ulasan}</span>
            </div>
            <div className="col-12 form-group mb-3 "> 
            <label>Rating Web</label>
              <ReactStars count={5}
                onChange={ratingg}
                size={40}
                isHalf={true}
                
                activeColor="#ffd700"
                  />
            </div>
            <span className='text-danger' style={{ fontSize:'10px' }}>{error.bintang}</span>
            
        </div>
          
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

</div>
</div>
  )
}

export default Addtesti