import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/AdminSidebar.css';

export default class AdminSidebar extends React.Component {
    render() {
        return (
            <nav id="admin-sidebar">
                <ul>
                    <Link to="/admin/users"><li className={this.props.activeTab === 'Users' ? 'selected' : ''}>Users</li></Link>
                    <Link to="/admin/admins"><li className={this.props.activeTab === 'Admins' ? 'selected' : ''}>Admins</li></Link>
                </ul>
            </nav>
        );
    }
}