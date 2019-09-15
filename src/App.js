/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import store from './store'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/privateroute/PrivateRoute'
import ClientDashboard from './components/layout/ClientDashboard'
import OfficerDashboard from './components/layout/OfficerDashboard'
import UserProfile from './components/layout/UserProfile'

import './App.css'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken
    setAuthToken(token)
    // Decode token and get user info and exp
    const decoded = jwtDecode(token)
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))
    // Check for expired token
    const currentTime = Date.now() / 1000 // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser())
        // Redirect to login
        window.location.href = './'
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={props => <Register {...props} />} />
                    <Route exact path="/login" component={Login} />
                    <Switch>
                        <PrivateRoute exact path="/officerdashboard" component={OfficerDashboard} />
                        <PrivateRoute exact path="/clientdashboard" component={ClientDashboard} />
                        <PrivateRoute exact path="/profile" component={UserProfile} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}

export default App
