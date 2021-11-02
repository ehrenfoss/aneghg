import './App.css';
import React from 'react';

class NumberInput extends React.Component { 
    constructor(props) {
        super(props);
        //this.state = this.props.state;
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        console.log('inputChg');
        console.log(e.target.value);
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.props.myInput, e.target.value);
        }
    }

    render() {
        var id = this.props.myInput + this.props.phase;
        return (
            <label><input type="number" value={this.props.value}
            onChange={this.changeHandler} /> {this.props.label}</label>
        )
    }
}

export default NumberInput;