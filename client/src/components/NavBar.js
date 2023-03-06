import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="nav-main">
                <div className="nav-content">
                    <span className="nav-left">
                        <Link to="/home">Home</Link>
                        <Link to="/browse">Browse</Link>
                        <Link to="/my-recipes">My Recipes</Link>
                    </span>
                    <span className="nav-logo">
                        <h1 className="nav-logo">Mealware</h1>
                    </span>
                    {this.props.loggedIn ?
                        <span className="nav-right">
                            <Link to="/logout">Log out</Link>
                            <Link to="/viewaccount">My Account</Link>
                            {this.props.actor.role === 'admin' && <Link to="/admin/users">Admin</Link>}
                        </span>
                        : 
                        <span className="nav-right">
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </span>
                    }
                </div>
            </nav>
        );
    }
}

export default NavBar;