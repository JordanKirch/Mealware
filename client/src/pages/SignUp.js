import React from 'react';
import SignUpCard from '../components/SignUpCard.js';

class SignUp extends React.Component {
    render() {
        return (
            <SignUpCard handleLogin={this.props.handleLogin} />
        );
    }
}

export default SignUp;