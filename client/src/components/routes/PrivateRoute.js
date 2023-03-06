import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AppContext from '../../AppContext';

export default class PrivateRoute extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <Route exact={this.props.exact} path={this.props.path}>
                {this.context.loggedIn ? this.props.children : <Redirect to={`/login?redirect=${this.props.path}`} />}
            </Route>
        );
    }
}