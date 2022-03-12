import React from 'react'
import Navba from '../admin/Navba'
import Sidebar from '../admin/Sidebar'
import Footer from '../admin/Footer'
import Routes from '../../routes/Routes'


import { Switch, Route, Redirect} from 'react-router-dom'

const Masterlay = () => {
  return (
    <div id="page-top">
        <Navba />

        <Sidebar />
        <div className="content-wrapper">
          <main>
            <Switch>
              {Routes.map((ro, idx) => {
                return(
                  ro.component && (
                    <Route 
                     key={idx}
                     path={ro.path}
                     exact={ro.exact}
                     name={ro.name}
                     render={(props) => (
                       <ro.component  {...props} /> 
                     )}

                    />
                  )
                )
              })}
               <Redirect from="admin" to="/admin/dashboard" /> 
            </Switch>
          </main>

      </div>
        <Footer />
        

        

    </div>
  )
}

export default Masterlay