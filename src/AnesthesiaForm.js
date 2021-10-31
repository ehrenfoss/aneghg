import './App.css';
import React from 'react';
import DefaultButtons from './DefaultButtons.js'
import NumberInput from './NumberInput.js'

class AnesthesiaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;

    this.handleSubmit = this.phaseSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  phaseSubmit(event) {
    event.preventDefault();
    this.props.onPhaseSubmit(this.state)
  }

  handleInput(myInput, myValue) {
    myValue = myValue.replace(/^\D*\.?\D*$/, '');
    // dirty but not sure how to pass state upward without rerender
    this.state[myInput] = myValue;
    this.props.onPhaseSubmit(this.state);
  }

  render() {
    const title = this.props.type;
    let durationOpts = []
    if (title === "Induction") {
      durationOpts = [3, 5, 10, 15];
    } else {
      durationOpts = [5, 10, 15, 30, 60, 90, 120];
    }
    return (
      <div className="anesthesiaForm">
        <form onSubmit={this.handleSubmit}>
          <h3>{title}</h3>
          <table>
            <tr>
              <td>
                <label>Duration</label>
              </td>
              <td>
                <NumberInput myInput="duration" label="Min" onChange={this.handleInput} value={this.state.duration} />
              </td>
              <td><DefaultButtons myInput="duration" onClick={this.handleInput} values={durationOpts} /></td>
            </tr>
            <tr>
              <td>
                <label>N20</label>
                </td><td>
                <NumberInput myInput="n2o_l_min" label="L/min" onChange={this.handleInput} value={this.state.n2o_l_min} />
              </td>
              <td><DefaultButtons myInput="n2o_l_min" onClick={this.handleInput} values={[2, 4, 6]} /></td>
            </tr>
            <tr>
              <td>
                <label>
                  O2</label>
                  </td><td>
                  <NumberInput myInput="o2_l_min" label="L/min" onChange={this.handleInput} value={this.state.o2_l_min} />                
              </td>
              <td><DefaultButtons myInput="o2_l_min" onClick={this.handleInput} values={[4, 6, 8]} /></td>
            </tr>
            <tr>
              <td>
                <label> Air</label>
                  </td><td>
                  <NumberInput myInput="air_l_min" label="L/min" onChange={this.handleInput} value={this.state.air_l_min} />                                
              </td>
              <td><DefaultButtons myInput="air_l_min" onClick={this.handleInput} values={[1, 2]} /></td>
            </tr>
            <tr>
              <td>
                <label>Sevo</label>
                </td><td>
                <NumberInput myInput="sevo" label="%" onChange={this.handleInput} value={this.state.sevo} />                                                
              </td>
              <td><DefaultButtons myInput="sevo" onClick={this.handleInput} values={[1, 2, 3, 4, 5, 6, 7, 8]} /></td>
            </tr>
            {title === "Maintenance" &&
              <tr>
              <td>
                <label>Iso</label>
                </td><td>
                <NumberInput myInput="iso" label="%" onChange={this.handleInput} value={this.state.iso} />                                                                
              </td>
              <td><DefaultButtons myInput="iso" onClick={this.handleInput} values={[1, 2, 3, 4, 5, 6]} /></td>
            </tr>
            }
            {title === "Maintenance" && 
            <tr>
              <td>
              <label>Des</label>
              </td><td>
              <NumberInput myInput="des" label="%" onChange={this.handleInput} value={this.state.des} />                                                
              </td>
              <td><DefaultButtons myInput="des" onClick={this.handleInput} values={[2,4,6,8,10,12,14,16]} /></td>
            </tr>
            }
          </table>
        </form>
      </div>
    );
  }
}

export default AnesthesiaForm;