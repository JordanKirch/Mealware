import React from 'react';
import LoadingSpinner from './LoadingSpinner.js';
import '../styles/components/Button.css';

/*
 * Renders a clickable button that performs a specified action.
 * label (required) - The text displayed on the button
 * style (required) - primary, secondary, or tertiary
 * onClick (required) - A click handler function
 * destructive (optional) - Specifies whether the resulting action is destructive
 * disabled (optional) - Specifies whether or not the button is disabled
 * type (optional) - Specifies the button type, such as 'submit' for forms
 */
class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: this.props.disabled ? true : false,
        };
    }

    render() {
        let classes = '';
        if (this.props.style === 'primary') {
            classes += 'btn-primary';
        }
        else if (this.props.style === 'secondary') {
            classes += 'btn-secondary';
        }
        else if (this.props.style === 'tertiary') {
            classes += 'btn-tertiary';
        }

        if (this.props.destructive) {
            classes += ' destructive';
        }

        let styles = this.props.width ? {width: this.props.width} : {};


        return (
            <button
            type={this.props.type ? this.props.type : 'button'} 
            className={classes} 
            disabled={this.props.disabled ? true : false}
            onClick={this.props.onClick}
            style={styles}
            disabled={this.props.disabled}
            >
                
                {this.props.loading ? <LoadingSpinner size="small"/> : this.props.label}

            </button>
        );
    }
}

export default Button;