import Dashbor from '../components/admin/Dashboar'
import Profile from '../components/admin/Profile'
import Addcategory from '../components/admin/category/Addcategory'
import Viewcategory from '../components/admin/category/Viewcategory'
import Editcategory from '../components/admin/category/Editcategory'
import Addestinasi from '../components/admin/destinasi/Addestinasi'
import Viewdestinasi from '../components/admin/destinasi/Viewdestinasi'
import Editdestinasi from '../components/admin/destinasi/Editdestinasi'

import Addtesti from '../components/public/testimonials/Addtesti'
import Viewtesti from '../components/public/testimonials/Viewtesti'
import Checkoutadmin from '../components/admin/checkout/Checkoutadmin'
import Proofpayment from '../components/admin/checkout/Proofpayment.js'
import Editcheck from '../components/admin/checkout/Editcheck'

const Routes = [
    {path:'/admin', exact: true, name:"Admin" },
    {path:'/admin/dashboard',  exact: true, name:"dashboard", component: Dashbor},
    {path:'/admin/profile',  exact: true, name:"profile", component: Profile},
    {path:'/admin/addcategory',  exact: true, name:"addcategory", component: Addcategory},
    {path:'/admin/viewcategory',  exact: true, name:"viewcategory", component: Viewcategory},
    {path:'/admin/editcategory/:id',  exact: true, name:"editcategory", component: Editcategory},
    {path:'/admin/addestinasi',  exact: true, name:"addestinasi", component: Addestinasi},
    {path:'/admin/viewdestinasi',  exact: true, name:"viewdestinasi", component: Viewdestinasi},
    {path:'/admin/editdestinasi/:id',  exact: true, name:"editdestinasi", component: Editdestinasi},
  
    {path:'/admin/viewtesti',  exact: true, name:"viewtesti", component: Viewtesti},
    {path:'/admin/viewcheckout',  exact: true, name:"checkoutadmin", component: Checkoutadmin},
    {path:'/admin/editcheckout/:id',  exact: true, name:"editcheck", component: Editcheck},
    {path:'/admin/proofpayment',  exact: true, name:"proofpayment", component: Proofpayment},

]
export default Routes