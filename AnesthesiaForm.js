import './App.css';
import React from 'react';
import DefaultButtons from './DefaultButtons.js'

class AnesthesiaForm extends React.Component { 
    constructor(props) {
      super(props);
      this.state = this.props.state;
  
      this.handleSubmit = this.phaseSubmit.bind(this);
      this.handleDefaultButton = this.handleDefaultButton.bind(this);
    }
  
    phaseSubmit(event) {
      event.preventDefault();
      this.props.onPhaseSubmit(this.state)
    }

    handleDefaultButton(myInput, myValue) {


      this.setState({[myInput]: myValue});
    }
  
    render() {
      const title = this.props.type;
      return (
        <div class="form">
          <form onSubmit={this.handleSubmit}>
          <h3>{title}</h3>
            <label>
              Duration
              <input type="number" value={this.state.duration} 
                    onChange={event => this.setState({duration: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> Min
            <DefaultButtons myInput="duration" onClick={this.handleDefaultButton} values={[5,10,15]} />
            </label>
          <label>
            N20
            <input type="number" value={this.state.n2o_l_min} 
                   onChange={event => this.setState({n2o_l_min: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> L/min
            <DefaultButtons myInput="n2o_l_min" onClick={this.handleDefaultButton} values={[5,10,15]} />
          </label>
          <label>
            O2
            <input type="number" value={this.state.o2_l_min} 
                   onChange={event => this.setState({o2_l_min: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> L/min
            <DefaultButtons myInput="o2_l_min" onClick={this.handleDefaultButton} values={[5,10,15]} />
          </label>
          <label>
            Air
            <input type="number" value={this.state.air_l_min} 
                   onChange={event => this.setState({air_l_min: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> L/min
            <DefaultButtons myInput="air_l_min" onClick={this.handleDefaultButton} values={[5,10,15]} />
          </label>
          <label>
            Sevo
            <input type="number" value={this.state.sevo} 
                   onChange={event => this.setState({sevo: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> %
            <DefaultButtons myInput="sevo" onClick={this.handleDefaultButton} values={[5,10,15]} />
          </label>
          <label>
            Iso
            <input type="number" value={this.state.iso} 
                   onChange={event => this.setState({iso: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> %
            <DefaultButtons myInput="iso" onClick={this.handleDefaultButton} values={[5,10,15]} />
          </label>
          <label>
            Des
            <input type="number" value={this.state.des} 
                   onChange={event => this.setState({des: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> %
            <DefaultButtons myInput="des" onClick={this.handleDefaultButton} values={[5,10,15]} />
          </label>
          <input className="lg_button" type="submit" value="Submit" />
        </form>
        </div>
      );
    }  
  }

  export default AnesthesiaForm;