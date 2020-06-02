import * as d3 from "d3";
import {bindTooltip, toPercentage} from "../lib/tooltip.js";
import sotaConfig from "../lib/sotaConfig.js";

export default function ({
                             selector,
                             dataFile,
                            height = 300,
    showLegend = true,
                             inputIsPercentage = false,
                             margin = {
                                 "top": 20,
                                 "bottom": 20,
                                 "left": 24,
                                 "right": 0
                             }
                         }) {

    const lineColor = "#bbb";
    const lineWidth = 3;
    const hoverOpacity = 0.8;
    const tickSize = 8;
    const overflowOffset = sotaConfig.overflowOffset;
    const swatchBetween = sotaConfig.swatch.between;
    const swatchRight = sotaConfig.swatch.right;
    const swatchWidth = sotaConfig.swatch.width;
    const swatchHeight = sotaConfig.swatch.height;
    const swatchBelowBetween = sotaConfig.swatch.belowBetween;
    const swatchBelow = sotaConfig.swatch.below;
    const xAxisTop = sotaConfig.xAxisTop;

    const container = d3.select(selector);
    const svg = container.append("svg");
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    const width = document.querySelector(selector).offsetWidth;
    const mainWidth = width - margin.left - margin.right;
    const mainHeight = height - margin.top - margin.bottom;

    const mainChart = svg.append("g")
        .attr("class", "sota-stackedBarChart-mainChart")
        .attr("transform", `translate(${margin.left + overflowOffset} ${margin.right})`)
        .attr("width", mainWidth);

    d3.csv(dataFile + ".csv").then(data => {
        // DATA PROCESSING

        const valueLabels = data.columns.slice(1);
        const groupLabels = d3.map(data, d => d.group).keys()

        const x = d3.scaleBand()
            .domain(valueLabels)
            .range([0, mainWidth]);

        const y = d3.scaleLinear()
            .domain([0, 50]) // for now, hardcode displayPercentage
            .range([mainHeight,0]);

        // arrays of values and percentages

        var stackedData = [];

        // can be written more efficiently but bleh

        if (inputIsPercentage){
            data.forEach(d => {
                let thisData = [];
                for (let valueLabel of valueLabels) {
                    thisData.push(+d[valueLabel]);
                }
                stackedData.push(thisData);
            })
        }
        else{
            data.forEach(d => {
                let total = d3.sum(valueLabels, k => +d[k]);
                let thisData = [];
                let thisValues = [];
                for (let valueLabel of valueLabels) {
                    let thisPercentage = +d[valueLabel] / total * 100;
                    thisData.push([thisPercentage, +d[valueLabel]]);
                }
                stackedData.push(thisData);
            });
        }

        const fillClassNames = d3.scaleOrdinal()
            .domain(groupLabels)
            .range(d3.map(groupLabels, (d, i) => "module-fill-" + (groupLabels.length > 3 ? (i + 1) : (2 * i + 1))).keys())

        const strokeClassNames = d3.scaleOrdinal()
            .domain(groupLabels)
            .range(d3.map(groupLabels, (d, i) => "module-stroke-" + (groupLabels.length > 3 ? (i + 1) : (2 * i + 1))).keys())

        // LEGEND

        let legendHeight = 0;

        if (showLegend){
            let groupLabelWidths = [];

            const legend = svg.append("g")
                .lower()
                .attr("class","sota-gen-legend")
                .attr("transform", `translate(0 ${margin.top})`)

            legend.selectAll("nothing")
                .data(groupLabels)
                .enter()
                .append("text")
                .attr("class","sota-gen-legend-text")
                .text(d => d)
                .attr("x", function(){
                    groupLabelWidths.push(this.getBBox().width);
                })
                .remove();

            if (d3.sum(groupLabelWidths, d => d) + groupLabels.length * (swatchWidth + swatchBetween) + (groupLabels.length - 1) * swatchRight > mainWidth){
                // vertical legends
                let legendLeft = width + overflowOffset - d3.max(groupLabelWidths) - swatchWidth - swatchBetween;

                legend.selectAll(".sota-gen-legend-swatch")
                    .data(groupLabels)
                    .join("rect")
                    .attr("class", d => "sota-gen-legend-swatch " + fillClassNames(d))
                    .attr("x",legendLeft)
                    .attr("y", (d, i) => (swatchHeight + swatchBelowBetween) * i)
                    .attr("width",swatchWidth)
                    .attr("height",swatchHeight)

                legend.selectAll(".sota-gen-legend-text")
                    .data(groupLabels)
                    .join("text")
                    .attr("class", "sota-gen-legend-text sota-text-label sota-heavy-label")
                    .text(d => d)
                    .attr("x", legendLeft + swatchWidth + swatchBetween)
                    .attr("y", (d, i) => (swatchHeight + swatchBelowBetween) * i + swatchHeight / 2)
                    .attr("alignment-baseline", "central")
                    .attr("dominant-baseline", "central")

                legendHeight = groupLabels.length * swatchHeight + (groupLabels.length - 1) * swatchBelowBetween + swatchBelow;
            }
            else{
                let legendLeft = width + overflowOffset - (d3.sum(groupLabelWidths, d => d) + groupLabels.length * (swatchWidth + swatchBetween) + (groupLabels.length - 1) * swatchRight);

                legend.selectAll(".sota-gen-legend-swatch")
                    .data(groupLabels)
                    .join("rect")
                    .attr("class", d => "sota-gen-legend-swatch " + fillClassNames(d))
                    .attr("x", (d, i) => legendLeft + i * (swatchWidth + swatchBetween + swatchRight) + d3.sum(groupLabelWidths.slice(0,i), d => d))
                    .attr("y", 0)
                    .attr("width", swatchWidth)
                    .attr("height", swatchHeight)

                legend.selectAll(".sota-gen-legend-text")
                    .data(groupLabels)
                    .join("text")
                    .attr("class", "sota-gen-legend-text sota-text-label sota-heavy-label")
                    .text(d => d)
                    .attr("x", (d, i) => legendLeft + i * (swatchWidth + swatchBetween + swatchRight) + swatchWidth + swatchBetween + d3.sum(groupLabelWidths.slice(0, i), d => d))
                    .attr("y", swatchHeight / 2)
                    .attr("alignment-baseline", "central")
                    .attr("dominant-baseline", "central")

                legendHeight = swatchHeight + swatchBelow;
            }
        }

        mainChart.append("g")
            .attr("class", "sota-gen-axis sota-gen-xAxis sota-text-axis")
            .call(d3.axisBottom(x).ticks(data.length).tickSize(-tickSize))
            .style("transform","translateY(" + mainHeight + "px)");

        mainChart.append("g")
            .attr("class", "sota-gen-axis sota-gen-YAxis sota-num-axis")
            .call(d3.axisLeft(y).tickSize(-tickSize))

        const chartGroups = mainChart.selectAll(".sota-multiLineGraph-group")
            .data(stackedData)
            .join("g")
            .attr("class", (d, i) => `sota-multiLineGraph-group ${strokeClassNames(groupLabels[i])}`)

        chartGroups.selectAll(".sota-multiLineGraph-path")
            .data(d => [d])
            .join("path")
            .attr("class", "sota-multiLineGraph-path")
            .attr("d", d3.line()
                .x((d, i) => x(valueLabels[i]) + x.bandwidth() / 2)
                .y(d => y(d[0])))
            .attr("fill","none")
            .style("stroke-width",lineWidth);

        height = mainHeight + legendHeight;

        svg.style("width", width + 2 * overflowOffset + "px")
            .attr("height", height + legendHeight + "px")
            .style("margin-left", -overflowOffset + "px");

        mainChart.attr("transform", `translate(${margin.left} ${margin.top + legendHeight})`)
            .attr("width", mainWidth);
    });
}