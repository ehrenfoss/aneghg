import './App.css';
import gasData from './gasses.js'
import React from 'react';
import AnesthesiaForm from './AnesthesiaForm.js'
import MaintenanceForm from './MaintenanceForm.js'
import ImpactChart from './ImpactChart.js'


class ProcedureImpact extends React.Component {
  constructor(props) {
    super(props);

    const initGasState = {
      duration: 0.0
      ,n2o_l_min: 1.0
      ,air_l_min: 0.0
      ,o2_l_min: 0.0
      ,des: 0.0
      ,iso: 0.0
      ,sevo: 0.0
    }

    const initGasState2 = {
      duration: 0.0
      ,n2o_l_min: 2.0
      ,air_l_min: 0.0
      ,o2_l_min: 0.0
      ,des: 0.0
      ,iso: 0.0
      ,sevo: 0.0
    }

    // for some reason, instantiating both to the same const causes issues with shared state later??
    this.state = {
      induction: initGasState,
      maintenance: initGasState2
    }

    this.calculateCo2 = this.calculateCo2.bind(this);
    this.handleInduction = this.handleInduction.bind(this);
    this.handleMaintenance = this.handleMaintenance.bind(this);
  }

  calculateCo2(gasses) {
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
    console.log(this.state);
    this.setState({'induction': gasses});
  }


  handleMaintenance(gasses) {
    console.log(this.state);
    this.setState({'maintenance': gasses});
  }

  render() {

    var inductionImpact = this.calculateCo2(this.state.induction);
    inductionImpact["phase"] = "Induction";
    var maintenanceImpact = this.calculateCo2(this.state.maintenance);
    maintenanceImpact["phase"] = "Maintenance";
    var total_co2 = inductionImpact.total + maintenanceImpact.total;

    var data = [ inductionImpact, maintenanceImpact ] ;

    return (
      <div class="mainDiv">
        <AnesthesiaForm
          type="Induction"
          gasses={this.state.induction}
          onPhaseSubmit={this.handleInduction} />
        <AnesthesiaForm
          type="Maintenance"
          gasses={this.state.maintenance}
          onPhaseSubmit={this.handleMaintenance} />
        <ImpactChart total={total_co2} data={data}/>
      </div>
    );
  }
}

export default ProcedureImpact;
