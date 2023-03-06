import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AppContext from '../../AppContext';

export default class UnauthenticatedRoute extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <Route exact={this.props.exact} path={this.props.path}>
                {this.context.loggedIn ? <Redirect to="/home"/> : this.props.children}
            </Route>
        );
    }
}