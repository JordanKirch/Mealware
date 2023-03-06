import React from 'react';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import '../../styles/pages/UserSearch.css';
import '../../styles/components/Table.css'

export default class UserSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: null,
            searchResults: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name, value) {
        this.setState({searchInput: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/users/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchInput: this.state.searchInput,
            }),
        })
        .then(response => {            
            if (response.status !== 200) {
                throw new Error("Unexpected error while searching for a user");
            }

            return response.json();
        })
        .then(users => {
            this.setState({searchResults: users});
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleTableRowClick(id) {
        window.location.href = "/admin/users/" + id;
    }

    render() {
        return (
            <React.Fragment>
                <h2>User Search</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label="Enter user identifier:" name="searchInput" type="text" onChange={this.handleChange} required={true}/>
                    <Button label="Search" type="submit" style="primary" width="100px" loading={this.state.requestIsPending}/>
                </form>

                {this.state.searchResults !== null && 
                <div id="search-results">
                    <h3>Results</h3>
                    {this.state.searchResults.length !== 0 ? 
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.searchResults.map(user => {
                                    return (
                                        <tr key={user.id} onClick={() => this.handleTableRowClick(user.id)}>
                                            <td>{user.id}</td>
                                            <td>{user.first_name + " " + user.last_name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        :

                        <p>No users found</p>
                    
                    }
                </div>}
            </React.Fragment>
        );
    }
}