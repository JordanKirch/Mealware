import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="footer-content">
                    <span className="footer-center">
                        <p>&copy; Mealware 2021</p>
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;