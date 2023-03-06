import React from 'react';
import LoginCard from '../components/LoginCard';

class Login extends React.Component {
    render() {
        return (
            <LoginCard handleLogin={this.props.handleLogin} />
        );
    }
}

export default Login;