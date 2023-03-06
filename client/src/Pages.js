import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AppContext from './AppContext.js';

// Route components
import PrivateRoute from './components/routes/PrivateRoute.js';
import UnauthenticatedRoute from './components/routes/UnauthenticatedRoute.js';
import AdminRoute from './components/routes/AdminRoute.js';

// Components
import LoadingSpinner from './components/LoadingSpinner.js';

// Login pagees
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Logout from './pages/Logout.js';
import ForgotInfo from './pages/ForgotInfo.js';
import ViewRecipe from './pages/ViewRecipe.js';

// Account settings pages
import AccountSettings from './pages/AccountSettings.js';
import ViewAccount from './pages/ViewAccount.js';

// Admin pages
import AdminSidebar from './components/AdminSidebar.js';
import AdminDashboard from './pages/admin/AdminDashboard.js';
import UserSearch from './pages/admin/UserSearch.js';

// Home pages
import Browse from './pages/Browse.js';

class Pages extends React.Component {
    static contextType = AppContext;

    render() {
        if (this.context.loggedIn === null) {
            return (<LoadingSpinner size="large"/>);
        }

        return (
            <div id={(window.location.href.split('/'))[3] === 'admin' ? 'page-body-with-sidebar' : 'page-body'}>
            <Route exact path="/browse">
                <Browse actor={this.props.actor} />
            </Route>

            <UnauthenticatedRoute exact path="/login">
                <Login handleLogin={this.props.handleLogin} />
            </UnauthenticatedRoute>

            <UnauthenticatedRoute exact path="/signup">
                <SignUp handleLogin={this.props.handleLogin} />
            </UnauthenticatedRoute>

            <PrivateRoute exact path="/logout">
                <Logout handleLogout={this.props.handleLogout} />
            </PrivateRoute>

            <UnauthenticatedRoute exact path="/forgotinfo">
                <ForgotInfo actor={this.props.actor} />

            </UnauthenticatedRoute>

            <Route exact path="/viewrecipe">
                <ViewRecipe actor={this.props.actor} />
            </Route>

            <PrivateRoute exact path="/accountsettings" >
                <AccountSettings />
            </PrivateRoute>

            <PrivateRoute exact path="/viewaccount" >
                <ViewAccount />
            </PrivateRoute>

            <AdminRoute exact path="/admin" >
                <AdminSidebar />
                <AdminDashboard />
            </AdminRoute>

            <AdminRoute exact path={"/admin/users"}>
                <AdminSidebar activeTab="Users" />
                <UserSearch />
            </AdminRoute>

            <AdminRoute exact path={"/admin/admins"}>
                <AdminSidebar activeTab="Admins" />
                
            </AdminRoute>
            
            </div>
        );
    }
}

export default Pages;