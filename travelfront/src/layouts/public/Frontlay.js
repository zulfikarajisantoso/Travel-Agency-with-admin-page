
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Publicroutes from '../../routes/Publicroutes'
import Footer from './Footer'
import Navbar from './Navbar'

const Frontlay = () => {
    return (
        <div>
            <Navbar />
                <div>
                    <Switch>
                        {Publicroutes.map(( rot, idx) => {
                            return (
                                rot.component && (
                                    <Route 
                                    key={idx}
                                    path={rot.path}
                                    exact={rot.exact}
                                    name={rot.name}
                                    render={(props) => ( <rot.component {...props} />)}
                                        
                                    
                                    />
                                )
                            )
                        })}
                    </Switch>
                    
                </div>

            <Footer />
        </div>
    )
}
export default Frontlay