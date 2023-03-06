import React from 'react';
import '../styles/components/Card.css';
import '../styles/components/Form.css';
import FormInput from './FormInput';
import Button from './Button.js';
import {Link} from 'react-router-dom';

class LoginCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            requestIsPending: false,
            invalidLogin: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({requestIsPending: true});

        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
        .then(response => {
            this.setState({requestIsPending: false});
            
            if (response.status !== 200) {
                this.setState({invalidLogin: true});
                throw new Error("Invalid login credentials");
            }

            return response.json();
        })
        .then(user => {
            this.props.handleLogin(user);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div id="login-card" className="card">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label="Username" name="username" type="text" onChange={this.handleChange} required={true}/>
                    <FormInput label="Password" name="password" type="password" onChange={this.handleChange} required={true} />
                    <Button label="Login" type="submit" style="primary" width="272px" loading={this.state.requestIsPending} />
                    {this.state.invalidLogin && <p className="warning-red" style={{textAlign: "center"}}>Invalid username or password.</p>}
                </form>
                <div id="additional-links">
                    <Link to="/forgotinfo">Forgot username or password?</Link>
                    <Link to="/signup">New user? Sign up now!</Link>
                </div>
            </div>
        );
    }
}

export default LoginCard;