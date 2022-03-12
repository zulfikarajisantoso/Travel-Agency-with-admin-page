
import axios  from "axios";
import { BrowserRouter as Router, Route, Redirect ,Switch } from "react-router-dom"
import './App.css';
import Register from "./auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./auth/Login";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Adminroute from "./routes/Adminroute";
import Publicrout from "./layouts/public/Publicrout";

// axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.baseURL = "https://backendjalan.herokuapp.com/"

axios.defaults.headers.post['Accept']= 'application/json'
axios.defaults.headers.post['Content-Type']= 'application/json'
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}`: ``;
  return config;
})



function App() {
  return (
    <div className="App">
        <Router>
  
          <Switch>
           
              <Adminroute path='/admin' name="admin" />
              <Publicrout path='/' name='Home' />

              <Route  path="/login">
                {localStorage.getItem('auth_token') ? <Redirect to="/"/> : <Login /> }

              </Route>
              <Route  path="/register">
                {localStorage.getItem('auth_token') ? <Redirect to="/"/> : <Register /> }
              </Route>


              {/* <Route path='/admin' name="admin" render={(props)  => <Masterlay {...props} /> }/> */}


            
              <Route path="/404" component={Error} />
              <Route component={Error} />

          </Switch>
        </Router>

    </div>
  );
}

export default App;
