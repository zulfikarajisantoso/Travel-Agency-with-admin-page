import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const Viewdestinasi = () => {
  

    const [loading, setloading] = useState(true)
    const [ca, setca] = useState([])

    useEffect(() => {
      
        axios.get(`/api/viewdestinasi`).then(res => {
            
            if(res.data.status === 200)
            {
                setca(res.data.tripp)
              
            }
            setloading(false)
  
            
        })
    
    
    }, [])


    const deletee = (e, id) => {
        
        e.preventDefault();

        const klik = e.currentTarget;
        klik.innerText = 'Deleting';

        axios.delete(`/api/deletetrip/${id}`).then(res => {
            
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
        ca.map((item) => {
            return(
                <tr key={item.id}>                  
                    <td>{item.category.category}</td>
                    <td>{item.name}</td>
                    <td>{item.lokasi}</td>
                    <td>${item.harga}</td>
                    <td><img src={`https://backendjalan.herokuapp.com/${item.image}`} alt={item.name} width="50px" /></td>
                    <td>{item.popular}</td>
                    <td>
                        <Link to={`editdestinasi/${item.id}`} className=' btn btn-sm btn-success'>Edit</Link>
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
            <h4 style={{ fontWeight:'900' }}>View Destination
                <Link to='/admin/addestinasi' className='btn btn-primary btn-sm float-end'> Add Trip</Link>
            </h4>
        </div> 
        <div className='card-body'>
        <div className='table-responsive'>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Lokasi</th>
                        <th>Harga Trip</th>
                        <th>Image</th>
                        <th>Popular, 1 = yes</th>
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

export default Viewdestinasi