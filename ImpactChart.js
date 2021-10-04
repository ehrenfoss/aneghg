import './App.css';
import gasData from './gasses.js'
import React from 'react';
import * as d3 from 'd3';

class ImpactChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.state;
    }

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        console.log('chart');
        console.log(this.props);
        console.log(this.state);

        if (this.props.hasOwnProperty('total')) {
        const total = this.props.total;
        const carbonData = [this.props.maintenance.total, this.props.induction.total];

        // set the dimensions and margins of the graph
        var margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.selectAll("rect")
            .data(carbonData)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => height - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green");

            return (
                <div id="chart">{total}</div>
            )
    
        }



    }

    render() {
        this.drawChart();
        return (
            <div id="chart">Loading...</div>
        )
    }
}

export default ImpactChart;
