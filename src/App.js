import './App.css';
import gasData from './gasses.js'
import React from 'react';
import AnesthesiaForm from './AnesthesiaForm.js'
import ImpactChart from './ImpactChart.js'


class ProcedureImpact extends React.Component {
  constructor(props) {
    super(props);

    const initCo2State = {
      total: 0.0
    }

    const initGasState = {
      duration: 0.0
      ,n2o_l_min: 0.0
      ,air_l_min: 0.0
      ,o2_l_min: 0.0
      ,des: 0.0
      ,iso: 0.0
      ,sevo: 0.0
    }

    this.state = {
      induction: initGasState,
      maintenance: initGasState,
      induction_co2: initCo2State,
      maintenance_co2: initCo2State,
      total_co2: 0.0
    }

    this.calculateCo2 = this.calculateCo2.bind(this);
    this.handleInduction = this.handleInduction.bind(this);
    this.handleMaintenance = this.handleMaintenance.bind(this);
  }

  calculateCo2(gasses) {
    console.log(gasses);
    var gas_vol = (gasses.n2o_l_min + gasses.air_l_min + gasses.o2_l_min) * gasses.duration;
    var n2o_kg = gasses.n2o_l_min * gasses.duration * gasData.nitrous_oxide.g_per_liter / 1000 * gasData.nitrous_oxide.co2_equiv_100;
    var sevo_kg = gas_vol * gasses.sevo * gasData.sevoflurane.volatility * gasData.sevoflurane.co2_equiv_100 / 100000;
    var des_kg = gas_vol * gasses.des * gasData.desflurane.volatility * gasData.desflurane.co2_equiv_100 / 100000;
    var iso_kg = gas_vol * gasses.iso * gasData.isoflurane.volatility * gasData.isoflurane.co2_equiv_100 / 100000;
    var total_kg = n2o_kg + sevo_kg + des_kg + iso_kg;
    var co2_kg = {
      total: total_kg,
      n2o: n2o_kg,
      sevo: sevo_kg,
      iso: iso_kg,
      des: des_kg
    }
    return co2_kg;
  }

  handleInduction(gasses) {
    var impact = this.calculateCo2(gasses);
    impact["phase"] = "Induction";
    var total = this.state.maintenance_co2.total + impact.total;
    this.setState({induction_co2: impact, total_co2: total});
  }


  handleMaintenance(gasses) {
    var impact = this.calculateCo2(gasses);
    impact["phase"] = "Maintenance";
    var total = this.state.induction_co2.total + impact.total;
    this.setState({maintenance_co2: impact, total_co2: total});
  }

  render() {
    const dataSubmitted = this.state.total_co2 > 0;

    var i = this.state.induction_co2;
    var m = this.state.maintenance_co2;

    var data = [ this.state.induction_co2, this.state.maintenance_co2 ] ;

    console.log(data);

    return (
      <div class="mainDiv">
        <AnesthesiaForm
          type="Induction"
          state={this.state.induction}
          onPhaseSubmit={this.handleInduction} />
        <AnesthesiaForm
          type="Maintenance"
          state={this.state.maintenance}
          onPhaseSubmit={this.handleMaintenance} />
        <ImpactChart total={this.state.total_co2} data={data}/>
      </div>
    );
  }
}

export default ProcedureImpact;
