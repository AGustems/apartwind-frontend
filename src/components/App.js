import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home'

const App = (props) => {
    return (
        <Switch>
            <Route exact path='/' render={(props) => <Home/>}/>
        </Switch>
    );
}

export default App;
