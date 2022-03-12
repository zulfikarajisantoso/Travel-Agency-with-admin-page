import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Viewcategory = () => {

    const [loading, setloading] = useState(true)
    const [car, setcar] = useState([])

    useEffect(() => {
      
        axios.get(`/api/viewcategory`).then(res => {
            
            if(res.data.status === 200)
            {
                setcar(res.data.category)
            }
            setloading(false)
            
        })
    
    
    }, [])

    const deletee = (e, id) => {
        e.preventDefault();

        const klik = e.currentTarget;
        klik.innerText = 'Deleting';

        axios.delete(`/api/deletecategory/${id}`).then(res => {

            if(res.data.status === 200)
            {
                Swal.fire("Succes", res.data.message, "succes");
                klik.closest("tr").remove();
            }
            else if (res.data.status === 401){
                Swal.fire("Error", res.data.message, "error");
                klik.innerText = 'Delete'
            }
        })
    }
    

    var category_pub = '';
    if(loading)
    {
        return <h1>Loading.....</h1>
    }
    else
    {
        category_pub = 
        car.map((item) => {
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                   
                    <td>
                        <Link to={`editcategory/${item.id}`} className=' btn btn-sm btn-success'>Edit</Link>
                    </td>
                    <td>
                        <button type='button' onClick={(e) => deletee(e, item.id)}  className=' btn btn-sm btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    

  return (
    <div className='container px-4'> 
        
    <div className='card mt-4'>
        <div className='card-header '>
            <h4 style={{ fontWeight:'900' }}>View Category
                <Link to='/admin/addcategory' className='btn btn-primary btn-sm float-end'> Add Category</Link>

   
            </h4>
        </div>

   
        
        <div className='card-body'>
            <div className='table-responsive'>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Description</th>
                           
                            <th>Edit</th>
                            <th>Delete</th>
                        
                            </tr>
                    </thead>
                    <tbody>
                        {category_pub}
                    </tbody>
                </table>
            </div>
     
    </div>
    </div>
</div>
  )
}

export default Viewcategory