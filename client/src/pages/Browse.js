import React from 'react';
import { Link } from 'react-router-dom';

class Browse extends React.Component {
    componentDidMount() {
        fetch('/api/users/profileInfo')
        .then(response => response.json())
        .then(data => console.log(data));
    }
    render() {
        return (<><p>Test</p><Link to="/viewrecipe">ViewRecipe</Link></>);
    }
}

export default Browse;