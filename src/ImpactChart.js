import './App.css';
import gasData from './gasses.js'
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

class ImpactChart extends React.Component {
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        let width = this.getWidth();
        let height = this.getHeight();
        this.setState({width: width, height: height}, ()=> {
            this.drawChart();
        });
    }

    componentDidUpdate() {
        this.drawChart();
        this.render();
    }

    getWidth(){
        return this.chartRef.current.parentElement.offsetWidth;
    }
    getHeight(){
        return this.chartRef.current.parentElement.offsetHeight;
    }

    drawChart() {
        const node = this.node;
        const data = this.props.data;

        // Setup svg using Bostock's margin convention

        var margin = { top: 20, right: 80, bottom: 35, left: 50 };

        var width = this.state.width - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        d3.select(this.chartRef.current).selectAll("*").remove();

        var svg = d3.select(this.chartRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        /* Data in strings like it would be if imported from a csv */

        // Transpose the data into layers
        var dataset = d3.layout.stack()(["n2o", "sevo", "iso", "des"].map(function (gas) {
            return data.map(function (d) {
                var yGas = 0;
                if (typeof d[gas] === 'undefined') { yGas = 0; }
                else { yGas = d[gas]; }
                
                return { x: d.phase, y: +yGas };
            });
        }));


        // Set x, y and colors
        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function (d) { return d.x; }))
            .rangeRoundBands([10, width - 10], 0.02);

        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
            .range([height, 0]);

        var colors = ["#55CDFC", "#F7A8B8", "#65DA69", "#F22D45"];


        // Define and draw axes
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-width, 0, 0)
            .tickFormat(function (d) { return d });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(function (d) { return d });

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
            .call(xAxis);


        // Create groups for each series, rects for each segment 
        var groups = svg.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function (d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
            .data(function (d) { return d; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", function (d) { return y(d.y0 + d.y); })
            .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
            .attr("width", x.rangeBand())
            .on("mouseover", function () { tooltip.style("display", null); })
            .on("mouseout", function () { tooltip.style("display", "none"); })
            .on("mousemove", function (d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.y);
            });

        // Draw legend
        var legend = svg.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d, i) {
                switch (i) {
                    case 0: return "Des";
                    case 1: return "Iso";
                    case 2: return "Sevo";
                    case 3: return "N2O";
                }
            });


        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
    }


    render() {
        var kgs = Math.round(this.props.total*100)/100;
        // 8.51 kgs per gallon, 6.5 mpg for semis, 1.60934 kms per mile
        var kms = (this.props.total / 8.51) * 6.5 * 1.60934;
        kms = Math.round(kms*100)/100;
        return (
            <div className="anesthesiaForm">
                <h1>Your procedure emitted the equivalent of <label>{kgs} kg co2, or driving a semi {kms} kilometers</label></h1>
                <svg ref={this.chartRef}>
                </svg>
            </div>
        )
    }
}

export default ImpactChart;
