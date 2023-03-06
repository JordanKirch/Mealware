import React from 'react';
import validSvg from '../icons/valid.svg';
import invalidSvg from '../icons/invalid.svg';

class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(event) {
        this.setState({value: event.target.value});
        if (this.props.validator) {
            this.props.validator(event.target.value);
        }
        this.props.onChange(event.target.name, event.target.value);
    }

    render() {
        return (
            <div className="form-input">
                <label>{this.props.label}</label>
                {this.props.validations && 
                    <ul className="form-input-validations">
                        {this.props.validations.map((validation, index) => (
                            <li key={index} className={validation.isValid ? 'validation-valid' : 'validation-invalid'}>
                                <img src={validation.isValid ? validSvg : invalidSvg} width="16px" /> <span>{validation.name}</span>
                            </li>
                        ))}
                    </ul>
                }
                <input type={this.props.type} name={this.props.name} value={this.props.defaultValue} onChange={this.handleUpdate} required={this.props.required} />
                {this.props.description ? <p className='field-description'>{this.props.description}</p> : ''}
            </div>
        );
    }
}

export default FormInput;