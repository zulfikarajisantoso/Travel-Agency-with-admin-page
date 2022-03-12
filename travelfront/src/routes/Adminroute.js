
import {useState, useEffect} from 'react'
import { Route, Redirect, useHistory} from 'react-router-dom'
import Masterlay from '../layouts/admin/Masterlay'
import axios from 'axios'
import Swal from 'sweetalert2';

function Adminroute({...rest}){


    
    const history = useHistory();
    const [ auth, setauth ] = useState(false);
    const [ loading, setloading ] = useState(true);

    useEffect(() => {
       
        axios.get('/api/checkingauth').then(res => {
        
        if(res.status === 200)
            {
                setauth(true)
            }   
            setloading(false)

        })
        return () => {
            setauth(false)
        }
    }, [])

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if(err.response.status === 401)
        {
            Swal.fire( "Unauthorized ", err.response.data.message, "warning");
            history.push('/');
        }
        return Promise.reject(err);
    })

    axios.interceptors.response.use(function (response) {
        return response;
        }, function (error) {
            if(error.response.status === 403) //access denied
            {
                Swal.fire('forbidden', error.response.data.message, "warning" );
                history.push('/');
                
            }
            else if (error.response.status === 403) //page not found
            {
                Swal.fire('403 Error', "Url/page not found", "warning");
                history.push('/');
            }
            return Promise.reject(error)
          
        }
    );

    if(loading)
    {
        return <h1>loading.....</h1>
    }

    return (
        <Route {...rest} 
        render={ ({props, location}) => 
             auth ? <Masterlay {...props} /> : <Redirect to={{ pathname:"/login", state : {from:location}}} />
                
            }  
        />
    )
    
}

export default Adminroute