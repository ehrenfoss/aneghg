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
    this.setState({ [myInput]: myValue });
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
              <label><input type="number" value={this.state.duration}
                    onChange={event => this.setState({ duration: event.target.value.replace(/^\D*\.?\D*$/, '') })} /> Min</label>
              </td>
              <td><DefaultButtons myInput="duration" onClick={this.handleDefaultButton} values={durationOpts} /></td>
            </tr>
            <tr>
              <td>
                <label>N20</label>
                </td><td>
                <label><input type="number" value={this.state.n2o_l_min}
                    onChange={event => this.setState({ n2o_l_min: event.target.value.replace(/^\D*\.?\D*$/, '') })} /> L/min</label>
              </td>
              <td><DefaultButtons myInput="n2o_l_min" onClick={this.handleDefaultButton} values={[2, 4, 6]} /></td>
            </tr>
            <tr>
              <td>
                <label>
                  O2</label>
                  </td><td>
                  <label><input type="number" value={this.state.o2_l_min}
                    onChange={event => this.setState({ o2_l_min: event.target.value.replace(/^\D*\.?\D*$/, '') })} /> L/min</label>
                
              </td>
              <td><DefaultButtons myInput="o2_l_min" onClick={this.handleDefaultButton} values={[4, 6, 8]} /></td>
            </tr>
            <tr>
              <td>
                <label> Air</label>
                  </td><td>
                  <label><input type="number" value={this.state.air_l_min}
                    onChange={event => this.setState({ air_l_min: event.target.value.replace(/^\D*\.?\D*$/, '') })} /> L/min</label>
                
              </td>
              <td><DefaultButtons myInput="air_l_min" onClick={this.handleDefaultButton} values={[1, 2]} /></td>
            </tr>
            <tr>
              <td>
                <label>Sevo</label>
                </td><td>
                <label><input type="number" value={this.state.sevo}
                    onChange={event => this.setState({ sevo: event.target.value.replace(/^\D*\.?\D*$/, '') })} /> %</label>
                
              </td>
              <td><DefaultButtons myInput="sevo" onClick={this.handleDefaultButton} values={[1, 2, 3, 4, 5, 6, 7, 8]} /></td>
            </tr>
            {title === "Maintenance" &&
              <tr>
              <td>
                <label>Iso</label>
                </td><td>
                <label><input type="number" value={this.state.iso}
                    onChange={event => this.setState({ iso: event.target.value.replace(/^\D*\.?\D*$/, '') })} /> %</label>
                
              </td>
              <td><DefaultButtons myInput="iso" onClick={this.handleDefaultButton} values={[1, 2, 3, 4, 5, 6]} /></td>
            </tr>
            }
            {title === "Maintenance" && 
            <tr>
              <td>
              <label>Des</label>
              </td><td>
              <label><input type ="number" value={this.state.des}
              onChange={event => this.setState({des: event.target.value.replace(/^\D*\.?\D*$/,'')})}/> %</label>
              </td>
              <td><DefaultButtons myInput="des" onClick={this.handleDefaultButton} values={[2,4,6,8,10,12,14,16]} /></td>
            </tr>
            }
          </table>
          <input className="lg_button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AnesthesiaForm;