import React from 'react';
import '../styles/components/Card.css';
import '../styles/components/Form.css';
import FormInput from './FormInput';
import Button from './Button.js';
import {Link} from 'react-router-dom';

class ForgotInfoCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: null,
            newpassword: null,
            confirmNewPass: null,
            formIsValid: false,
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
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.passwordValidator = this.passwordValidator.bind(this);
        this.confirmPasswordValidator = this.confirmPasswordValidator.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({requestIsPending: true});

        fetch('/api/users/forgotinfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
        .then(response => response.json())
        .then(user => {
            this.setState({requestIsPending: false});
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleChange(name, value) {
        this.setState({[name]: value});

        const isInvalid = (validation) => {
            if (!validation.isValid) {
                return true;
            }
            return false;
        }

        if (this.state.passwordValidations.some(isInvalid) || this.state.confirmPasswordValidations.some(isInvalid)) {
            this.setState({formIsValid: false});
        }
        else {
            this.setState({formIsValid: true});
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
            <div id="forgotinfo-card" className="card">
                <h2>Forgot Info</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label="Email" name="email" type="email" onChange={this.handleChange} required={true} />
                    <FormInput label="Password" name="password" type="password" onChange={this.handleChange} validator={this.passwordValidator} validations={this.state.passwordValidations} required={true} />
                    <FormInput label="Confirm Password" name="confirmPassword" type="password" onChange={this.handleChange} validator={this.confirmPasswordValidator} validations={this.state.confirmPasswordValidations} required={true} />
                    <Button label="Update Password" type="submit" style="primary" width="272px" loading={this.state.requestIsPending} disabled={!this.state.formIsValid}/>
                </form>
            </div>
        );
    }
}

export default ForgotInfoCard;