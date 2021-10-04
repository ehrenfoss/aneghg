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

  /*
  cost:(inputs.sevo*(inputs.nitrous+inputs.oxygen+inputs.air)*60*200.056*0.47)/(2412*1.53)+(inputs.iso*(inputs.nitrous+inputs.oxygen+inputs.air)*60*184.5*0.25)/(2412*1.45)+(inputs.des*(inputs.nitrous+inputs.oxygen+inputs.air)*60*168.038*0.7)/(2412*1.44)+(inputs.halo*(inputs.nitrous+inputs.oxygen+inputs.air)*60*197.38*0.55)/(2412*1.875)+(inputs.prop*inputs.kg/1000*60*0.02)+(inputs.remi*inputs.kg/1000*60*64.84)+(inputs.dex*inputs.kg/1000*0.13)+(inputs.ket*0.07)+(inputs.lido*0.05)+(inputs.bupi*0.03)+(inputs.ropi*0.1)+(inputs.oxygen*60*0.003)+(inputs.nitrous*60*0.006),
  
  co2:inputs.sevo*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*8.32*130/1000+
  inputs.iso*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*7.67*510/1000+
  inputs.des*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*6.99*2540/1000+
  inputs.halo*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*8.21*50/1000+
  inputs.nitrous*60*1.83/1000*310+inputs.prop*inputs.kg*60/1000*0.000021
  +inputs.remi*inputs.kg*60/1000*0.000103+inputs.dex*inputs.kg/1000*0.00301+
  inputs.ket*0.00014+inputs.lido*0.0000286
  +inputs.bupi*0.0000233+
  inputs.ropi*0.000356,
  
  miles:1000/411*((inputs.sevo*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*8.32*130/1000+inputs.iso*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*7.67*510/1000+inputs.des*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*6.99*2540/1000+inputs.halo*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*8.21*50/1000+inputs.nitrous*60*1.83/1000*310+inputs.prop*inputs.kg*60/1000*0.000021+inputs.remi*inputs.kg*60/1000*0.000103+inputs.dex*inputs.kg/1000*0.00301+inputs.ket*0.00014+inputs.lido*0.0000286+inputs.bupi*0.0000233+inputs.ropi*0.000356)),
  
  kilometers:1000/255*((inputs.sevo*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*8.32*130/1000+inputs.iso*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*7.67*510/1000+inputs.des*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*6.99*2540/1000+inputs.halo*(inputs.nitrous+inputs.oxygen+inputs.air)/100*60*8.21*50/1000+inputs.nitrous*60*1.83/1000*310+inputs.prop*inputs.kg*60/1000*0.000021+inputs.remi*inputs.kg*60/1000*0.000103+inputs.dex*inputs.kg/1000*0.00301+inputs.ket*0.00014+inputs.lido*0.0000286+inputs.bupi*0.0000233+inputs.ropi*0.000356)), 
  
  usercost:(inputs.sevo*(inputs.nitrous+inputs.oxygen+inputs.air)*60*200.056*inputs.gasprice)/(2412*1.53)+(inputs.iso*(inputs.nitrous+inputs.oxygen+inputs.air)*60*184.5*inputs.gasprice)/(2412*1.45)+(inputs.des*(inputs.nitrous+inputs.oxygen+inputs.air)*60*168.038*inputs.gasprice)/(2412*1.44)+(inputs.halo*(inputs.nitrous+inputs.oxygen+inputs.air)*60*197.38*inputs.gasprice)/(2412*1.875)+(inputs.prop*inputs.kg/1000*60*inputs.propprice)+(inputs.remi*inputs.kg/1000*60*inputs.remiprice)+(inputs.dex*inputs.kg/1000*inputs.dexpice)+(inputs.ket*inputs.ketprice)+(inputs.lido*inputs.lidoprice)+(inputs.bupi*inputs.bupiprice)+(inputs.ropi*inputs.ropiprice)+(inputs.oxygen*60*inputs.oxygenprice)+(inputs.nitrous*60*inputs.n2oprice),
*/

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
    console.log(co2_kg);
    return co2_kg;
  }

  handleInduction(gasses) {
    this.setState({induction_co2: this.calculateCo2(gasses)});
    this.setState({total_co2: this.state.induction_co2.total + this.state.maintenance_co2.total});
  }


  handleMaintenance(gasses) {
    this.setState({maintenance_co2: this.calculateCo2(gasses)});
    this.setState({total_co2: this.state.induction_co2.total + this.state.maintenance_co2.total});
  }

  render() {
    console.log('render');
    console.log(this.state.co2);

    const dataSubmitted = this.state.total_co2 > 0;
    console.log(this.state.total_co2);
    console.log(dataSubmitted);
    let chart;
    if (dataSubmitted) {
      console.log('draw chart');
      chart = <ImpactChart
        total={this.state.total_co2}
        induction={this.state.induction_co2}
        maintenance={this.state.maintenance_co2}
      />
    }
    return (
      <div>
        <AnesthesiaForm
          type="Induction"
          state={this.state.induction}
          onPhaseSubmit={this.handleInduction} />
        <AnesthesiaForm
          type="Maintenance"
          state={this.state.maintenance}
          onPhaseSubmit={this.handleMaintenance} />
        {chart}
      </div>
    );
  }
}

export default ProcedureImpact;
