import Home from '../components/public/Home'

import Login from '../auth/Login'
import Register from '../auth/Register'
import Alltrip from '../components/public/Alltrip'
import Productdetail from '../components/public/testimonials/Productdetail'
import Order from '../components/public/Order'
import Payment from '../components/public/Payment'
import Categorytrip from '../components/public/Categorytrip'
import Addtesti from '../components/public/testimonials/Addtesti'


const Publicroutes = [
    
    {path: '/', exact: true, name: 'Home',  component: Home},  
    {path: '/login', exact: true, name: 'Login',  component: Login},
    {path: '/register', exact: true, name: 'Register',  component: Register},
    {path: '/alltrip', exact: true, name: 'Alltrip',  component: Alltrip},
    {path: '/alltrip/:category', exact: true, name: 'Categorytrip',  component: Categorytrip},
    {path: '/alltrip/:category/:destinasi', exact: true, name: 'Productdetail',  component: Productdetail},
    {path: '/order', exact: true, name: 'Order',  component: Order},
    {path: '/payment', exact: true, name: 'Payment',  component: Payment},
    {path:'/addtestimonials',  exact: true, name:"addtesti", component: Addtesti},
]
export default Publicroutes