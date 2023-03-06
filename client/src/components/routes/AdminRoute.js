import React from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../AppContext';
import PrivateRoute from './PrivateRoute';

export default class AdminRoute extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <PrivateRoute exact={this.props.exact} path={this.props.path}>
                {(this.context.actor && this.context.actor.role === 'admin') ? this.props.children : <Redirect to="home" />}
            </PrivateRoute>
        );
    }
}