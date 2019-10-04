import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Registration from './Registration';
import LogIn from './LogIn';
import Event from './Event';
import CheckOut from './CheckOut'
// import EventList from './EventList';
import CreateEvent from './CreateEvent';
// import SideBar from './SideBar'
// import EventThumbNail from './EventThumbNail'
import HomeLayout from './HomeLayout'
import Profile from './Profile'
import CreateProfile from './CreateProfile'


function AppRouter(){
    return (
        <Router>
                <Route exact path="/" component={HomeLayout} />
                <Route path="/event/:eventid" component={Event} />
                <Route path="/login" component={LogIn} />
                <Route path="/register" component={Registration} />
                <Route path="/create-event" component={CreateEvent} />
                <Route path="/profile" component={Profile} />
                <Route path="/create-profile" component={CreateProfile} />
                <Route path="/checkout" component={CheckOut} />
        </Router>
    )
}

export default AppRouter