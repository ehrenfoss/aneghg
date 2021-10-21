import './App.css';
import React from 'react';

class DefaultButtons extends React.Component { 
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.myInput, e.target.value);
        }
    }

    render() {
        const values = this.props.values
        return (
            <div className="defaultButtons">
            {values.map((d) =>
                <button onClick={this.changeHandler} value={d}>{d}</button>
            )}
            </div>
            
        )
    }
}

export default DefaultButtons;