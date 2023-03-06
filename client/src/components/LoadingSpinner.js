import React from "react";

class LoadingSpinner extends React.Component {
    render() {
        return (
            <div className={"loader " + this.props.size}></div>
        );
    }
}

export default LoadingSpinner;