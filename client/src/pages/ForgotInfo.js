import React from 'react';
import ForgotInfoCard from '../components/ForgotInfoCard.js';

class ForgotInfo extends React.Component
{
    render()
    {
        return(
            <ForgotInfoCard handleSubmit={this.props.handleSubmit}/>
        );
    }
}

export default ForgotInfo;