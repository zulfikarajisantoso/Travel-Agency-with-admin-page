import React from 'react'
import { Link } from 'react-router-dom'
import logotrav from '../../img/logotrav.jpg'

const Sidebar = () => {
  return (
 <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
 
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={logotrav} className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <Link to='/' className="d-block text-decoration-none">Ja.lan</Link>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item ">
          <Link to='/admin/dashboard' className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
            
              </p>
          </Link>
         
        </li>
        <li className="nav-item">
          <Link to='/admin/profile' href="pages/widgets.html" className="nav-link">
            <i className="nav-icon fas fa-user-md" />
            <p>
              Profile
              
            </p>
          </Link>
        </li>
       
        <li className="nav-header">CATEGORY</li>
        <li className="nav-item">
          <Link to='/admin/addcategory' className="nav-link">
            <i className="nav-icon fas fa-globe" />
            <p>
              Add Category
            
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/admin/viewcategory' className="nav-link">
            <i className="nav-icon fas fa-braille" />
            <p>
              View Category
          
            </p>
          </Link>
        </li>
       
        <li className="nav-header">DESTINASI</li>
        <li className="nav-item">
          <Link to='/admin/addestinasi' className="nav-link">
            <i className="nav-icon fas fa-location-arrow" />
            <p>Add Destinasi</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/admin/viewdestinasi' className="nav-link">
            <i className="nav-icon fas fa-map-marker" />
            <p>View Destinasi</p>
          </Link>
        </li>
     
        <li className="nav-header">ORDERS</li>
        <li className="nav-item">
          <Link to='/admin/viewcheckout' className="nav-link">
            <i className="fas fa-suitcase nav-icon" />
            <p>Checkout Information</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/admin/proofpayment' className="nav-link">
            <i className="fas fa-suitcase nav-icon" />
            <p>Proof of Payment</p>
          </Link>
        </li>
     
        <li className="nav-header">TESTIMONIALS</li>
        <li className="nav-item">
          <Link to='/admin/addtestimonials' className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>Add Testimonials</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/admin/viewtesti' className="nav-link">
            <i className="fas fa-comments nav-icon" />
            <p>View Testimonials</p>
          </Link>
        </li>
        
       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>



  )
}

export default Sidebar