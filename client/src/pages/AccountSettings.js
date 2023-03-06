import React from 'react';
import '../styles/components/Form.css';
import '../styles/AccountInformation.css';
import FormInput from '../components/FormInput';
import Button from '../components/Button.js';

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            confirmPassword: null,
            currentPassword: null,
            emailRequestIsPending: false,
            usernameRequestIsPending: false,
            passwordRequestIsPending: false,
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

        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
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

    handleSubmitEmail(event) {
        event.preventDefault();
        this.setState({emailRequestIsPending: true});

        fetch('/api/users/changeEmail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
            }),
        })
        .then(response => {
            this.setState({emailRequestIsPending: false});
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleSubmitUser(event) {
        event.preventDefault();
        this.setState({usernameRequestIsPending: true});

        fetch('/api/users/changeUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
            }),
        })
        .then(response => {
            this.setState({usernameRequestIsPending: false});
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleSubmitPassword(event) {
        event.preventDefault();
        this.setState({passwordRequestIsPending: true});

        fetch('/api/users/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: this.state.password,
                currentPassword: this.state.currentPassword,
            }),
        })
        .then(response => {
            this.setState({passwordRequestIsPending: false});
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

    componentDidMount() {
        fetch('/api/users/accountsettings')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    username: data.username,
                })

                this.usernameValidator(data.username);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div id="edit-account-settings">
                <h2>Account Settings</h2>
                <form onSubmit={this.handleSubmitEmail}>
                    <FormInput label="Email" name="email" type="email" defaultValue={this.state.email} onChange={this.handleChange} required={true} />
                    <Button label="Save" type="submit" style="primary" width="272px" loading={this.state.emailRequestIsPending} />
                </form>

                <form onSubmit={this.handleSubmitUser}>
                    <FormInput label="Username" name="username" type="text" defaultValue={this.state.username} onChange={this.handleChange} validator={this.usernameValidator} validations={this.state.usernameValidations} required={true} />
                    <Button label="Save" type="submit" style="primary" width="272px" loading={this.state.usernameRequestIsPending} />
                </form>

                <form onSubmit={this.handleSubmitPassword}>
                    <FormInput label="Current Password" name="currentPassword" type="password" onChange={this.handleChange} required={true} />
                    <FormInput label="New Password" name="password" type="password" onChange={this.handleChange} validator={this.passwordValidator} validations={this.state.passwordValidations} required={true} />
                    <FormInput label="Retype Password" name="confirmPassword" type="password" onChange={this.handleChange} validator={this.confirmPasswordValidator} validations={this.state.confirmPasswordValidations} required={true} />
                    <Button label="Save" type="submit" style="primary" width="272px" loading={this.state.passwordRequestIsPending}/>
                </form>
            </div>
        );
    }
}

export default AccountSettings;