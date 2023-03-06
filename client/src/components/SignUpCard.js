import React from 'react';
import '../styles/components/Card.css';
import '../styles/components/Form.css';
import FormInput from './FormInput';
import Button from './Button.js';
import {Link} from 'react-router-dom';

class SignUpCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            confirmPassword: null,
            requestIsPending: false,
            formIsValid: false,
            usernameValidations: [
                {
                    name: 'Must be unique',
                    isValid: false,
                },
                {
                    name: 'Must contain no special characters',
                    isValid: false,
                },
            ],
            passwordValidations: [
                {
                    name: 'Must contain at least 8 characters',
                    isValid: false,
                },
                {
                    name: 'Must contain a lowercase letter',
                    isValid: false,
                },
                {
                    name: 'Must contain an uppercase letter',
                    isValid: false,
                },
                {
                    name: 'Must contain a number',
                    isValid: false,
                },
            ],
            confirmPasswordValidations: [
                {
                    name: 'Passwords must match',
                    isValid: false,
                },
            ],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.usernameValidator = this.usernameValidator.bind(this);
        this.passwordValidator = this.passwordValidator.bind(this);
        this.confirmPasswordValidator = this.confirmPasswordValidator.bind(this);
    }

    handleChange(name, value) {
        this.setState({[name]: value});

        const isInvalid = (validation) => {
            if (!validation.isValid) {
                return true;
            }
            return false;
        }

        if (this.state.usernameValidations.some(isInvalid) || this.state.passwordValidations.some(isInvalid) || this.state.confirmPasswordValidations.some(isInvalid)) {
            this.setState({formIsValid: false});
        }
        else {
            this.setState({formIsValid: true});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({requestIsPending: true});

        fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            }),
        })
        .then(response => response.json())
        .then(user => {
            this.setState({requestIsPending: false});
            this.props.handleLogin(user);
        })
        .catch(error => {
            console.log(error);
        });
    }

    usernameValidator(newUsername) {
        let validations = this.state.usernameValidations;

        if (newUsername.match(/^[a-zA-Z0-9]+$/)) {
            validations[1].isValid = true;
        }
        else {
            validations[1].isValid = false;
        }

        if (newUsername.length !== 0) {
            fetch('/api/users/checkUsernameAvailable?username='+newUsername, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                validations[0].isValid = data.isAvailable;
                this.setState({usernameValidations: validations});
            })
            .catch(error => {
                alert(error);
                this.setState({usernameValidations: validations});
            });
        }
        else {
            validations[0].isValid = false;
            this.setState({usernameValidations: validations});
        }
    }

    passwordValidator(newPassword) {
        let validations = this.state.passwordValidations;
        
        // Check length
        if (newPassword.length >= 8) {
            validations[0].isValid = true;
        }
        else {
            validations[0].isValid = false;
        }

        // Check lowercase letter
        if (newPassword.match(/(?=.*[a-z])/)) {
            validations[1].isValid = true;
        }
        else {
            validations[1].isValid = false;
        }

        // Check uppercase letter
        if (newPassword.match(/(?=.*[A-Z])/)) {
            validations[2].isValid = true;
        }
        else {
            validations[2].isValid = false;
        }

        // Check number
        if (newPassword.match(/(?=.*\d)/)) {
            validations[3].isValid = true;
        }
        else {
            validations[3].isValid = false;
        }
    }

    confirmPasswordValidator(newPassword) {
        let validations = this.state.confirmPasswordValidations;
        
        if (newPassword === this.state.password) {
            validations[0].isValid = true;
        }
        else {
            validations[0].isValid = false;
        }
    }

    render() {
        return (
            <div id="signup-card" className="card">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label="First Name" name="firstName" type="text" onChange={this.handleChange} required={true}/>
                    <FormInput label="Last Name" name="lastName" type="text" onChange={this.handleChange} required={true} />
                    <FormInput label="Email" name="email" type="email" onChange={this.handleChange} required={true} />
                    <FormInput label="Username" name="username" type="text" onChange={this.handleChange} validator={this.usernameValidator} validations={this.state.usernameValidations} required={true} />
                    <FormInput label="Password" name="password" type="password" onChange={this.handleChange} validator={this.passwordValidator} validations={this.state.passwordValidations} required={true} />
                    <FormInput label="Confirm Password" name="confirmPassword" type="password" onChange={this.handleChange} validator={this.confirmPasswordValidator} validations={this.state.confirmPasswordValidations} required={true} />
                    <Button label="Sign Up" type="submit" style="primary" width="272px" loading={this.state.requestIsPending} disabled={!this.state.formIsValid}/>
                </form>
            </div>
        );
    }
}

export default SignUpCard;