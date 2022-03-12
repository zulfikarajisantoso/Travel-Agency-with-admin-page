
import React from 'react';

import {Route } from 'react-router-dom'
import Frontlay from './Frontlay'

function Publicrout({...rest})
{
    return (
        <Route {...rest} render={(props) => <Frontlay {...props} />} />
    )
} 
export default Publicrout