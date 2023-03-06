import React from 'react';
import '../styles/AccountInformation.css';
import {Link} from 'react-router-dom';

class ViewAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            username: null,

        }

    }

    componentDidMount() {
        fetch('/api/users/accountsettings')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    username: data.username,
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div id="view-account-info">
                <h2>Account Information</h2>
                <p><span>Name: </span>{this.state.first_name} {this.state.last_name}</p>
                <p><span>Username: </span>{this.state.username}</p>
                <p><span>Email: </span>{this.state.email}</p>

                <Link to="/accountsettings">Edit account settings</Link>
            </div>
        );
    }
}

export default ViewAccount;