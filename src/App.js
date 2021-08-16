
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantsContext.js';
import Homepage from './routes/Homepage.js';
import RestaurantDetailPage from './routes/RestaurantDetailPage.js';
import UpdatePage from './routes/UpdatePage.js';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
    return (
        <RestaurantsContextProvider>
            <div className=" container p-3">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/restaurants/:name/system/loginsuccess' component={Homepage} />
                        <Route exact path='/restaurants/:id/:name/details' component={RestaurantDetailPage}/>
                        <Route exact path='/restaurants/:id/:name/update' component={UpdatePage} />
                    </Switch>     
                </Router>
            
            </div>
        </RestaurantsContextProvider>
        
    )
}

export default App
