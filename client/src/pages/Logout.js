import React from "react";
import { Redirect } from "react-router";

class Logout extends React.Component {
    componentDidMount() {
        document.cookie = "uuid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        this.props.handleLogout();
    }

    render() {
        return (
            <Redirect to='/login' />
        );
    }
}

export default Logout;