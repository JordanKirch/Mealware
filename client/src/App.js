import React from 'react';
import { Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar.js';
import Pages from './Pages.js';
import Footer from './components/Footer.js';

import AppContext from './AppContext';

class App extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            loggedIn: null,
            actor: null,
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    getUser = async () => {
        fetch('/api/users/getCurrentUser')
        .then(response => response.json())
        .then(data => {
            this.setState({
                loggedIn: data.user !== null,
                actor: data.user,
            });
        })
        .catch(error => console.log(error));
    }

    componentDidMount = async () => {
        await this.getUser();
    }
  
    handleLogin(user) {
        this.setState({
            loggedIn: true,
            actor: user
        });
    }

    handleLogout() {
        this.setState({
            loggedIn: false,
            actor: null,
        });
        document.cookie = "uuids=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  
    render() {
        return (
            <AppContext.Provider value={{loggedIn: this.state.loggedIn, actor: this.state.actor}}>
                <div className="App">
                    <NavBar loggedIn={this.state.loggedIn} actor={this.state.actor} />
                    <Pages handleLogin={this.handleLogin} handleLogout={this.handleLogout} />
                    <Footer />
                </div>
            </AppContext.Provider>
        );
    }
}

export default App;
