import * as d3 from "d3";
import {bindTooltip, toPercentage} from "../lib/tooltip.js";
import {containerSetup, processData, chartRendered, uuidv4} from "../lib/sotaChartHelpers.js";
import sotaConfig from "../lib/sotaConfig.js";

/**
 * Render sota.js custom bar chart, using an SVG path as the base
 * @param {string} dataFile - Relative path to csv data file, excluding file extension, i.e. "data/datafile"
 * @param {string} [selector] - Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector."
 * @param {string} [section] - Either this or selector param is required. Slug for section to add .sota-module container and chart to
 * @param {string} [title] - Title to be rendered in h3 tag. Only rendered if section param is used and not selector
 * @param {string} [subtitle] - Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector
 * @param {string} shapeFile - Relative path to svg shape file, excluding file extension, i.e. "shapes/shapefile"
 * @param {number} shapeWidth - Width of shape for chart
 * @param {boolean} [inputIsPercentage = false] - Whether or not input data is in percentages
 * @param {{top: number, left: number, bottom: number, right: number}} [margin] - Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig
 */
function customBarChart({
    dataFile,
    selector = false,
    title = false,
    subtitle = false,
    section = false,
    shapeFile,
    shapeWidth = 300,
    inputIsPercentage = false,
    margin = sotaConfig.margin
}) {
    const {container, svg, tooltip, width, mainWidth, mainChart} = containerSetup(
        selector, section, title, subtitle, margin, 0);

    const separatorStrokeWidth = sotaConfig.separatorStrokeWidth;
    const hoverOpacity = 0.8;
    const labelLeft = sotaConfig.labelLeft;
    const labelBelow = sotaConfig.labelBelow;
    const lineColor = sotaConfig.lineColor;
    const coeffLabelBelow = 3;

    d3.xml(shapeFile + ".svg").then(shape => {

        // import shape and make it a definition

        let importedNode = document.importNode(shape.documentElement, true)
        let firstPath = d3.select(importedNode)
            .select("path")
            .node()
        let firstPathWidth = 0;
        let firstPathHeight = 0;

        svg.append(() => firstPath)
            .attr("class",function(){
                firstPathWidth = this.getBBox().width;
                firstPathHeight = this.getBBox().height;
                return "";
            })
            .remove();

        let scaleFactor = shapeWidth / firstPathWidth;
        let scaledHeight = firstPathHeight * scaleFactor;

        const uniqueID = uuidv4();

        svg.append("defs")
            .append("clipPath")
            .attr("id","shapeDef"+uniqueID)
            .append(() => firstPath)
            .attr("transform", `scale(${scaleFactor})`)

        d3.csv(dataFile + ".csv").then(data => {

            const [percentages, values, labels] = processData(data, inputIsPercentage);

            // since stacked, left coordinate of each bar progresses, so we need this cumulative array

            let prevValue = 0;
            let prevValues = [];
            for (let d of data){
                prevValues.push(prevValue)
                prevValue += +d.value;
            }

            const x = d3.scaleLinear()
                .domain([0, d3.sum(data, d => +d.value)])
                .range([0, shapeWidth]);

            const classNames = d3.scaleOrdinal()
                .domain(d3.map(data, d=>d.label))
                .range(d3.map(data, (d, i) => "sota-fill-" + (i + 1)).keys())

            // main loop

            mainChart.selectAll(".sota-customBarChart-bar")
                .data(data)
                .join("rect")
                .attr("class", d => "sota-customBarChart-bar " + classNames(d.label))
                .attr("x", (d,i) => x(prevValues[i]))
                .attr("y", 0)
                .attr("width", d => x(d.value))
                .attr("height", scaledHeight)
                .attr("clip-path", "url(#shapeDef"+uniqueID+")")
                .call(bindTooltip, tooltip, percentages, labels, values);

            mainChart.selectAll(".sota-customBarChart-separator")
                .data(data)
                .join("rect")
                .attr("class", "sota-customBarChart-separator")
                .attr("x", (d, i) => (i == 0) ? -separatorStrokeWidth : x(prevValues[i]))
                .attr("y", 0)
                .attr("width", separatorStrokeWidth)
                .attr("height", scaledHeight)
                .attr("fill", "white")
                .attr("clip-path", "url(#shapeDef"+uniqueID+")")

            // draw labels. Code taken just about verbatim from stackedBarChart aboveBar label

            var labelRightBounds = [];

            mainChart.selectAll(".sota-customBarChart-label-aboveBar-text")
                .data(data)
                .join("text")
                .attr("class", "sota-customBarChart-label-aboveBar-text")
                .html((d,i) => `<tspan class="sota-text-label sota-heavy-label">${d.label}:</tspan><tspan class="sota-num-label"> ${toPercentage(percentages[i])}</tspan>`)
                .attr("x", (d,i) => x(prevValues[i]) + x(d.value) / 2 + labelLeft)
                .attr("y", function (d) {
                    labelRightBounds.push([this.getBBox().x, this.getBBox().width]);
                    return scaledHeight + 3 * labelBelow;
                })
                .attr("alignment-baseline", "top")

            let labelHeights = []

            function getLabelHeight(i) {
                if (i == labelRightBounds.length - 1) {
                    labelHeights[i] = coeffLabelBelow;
                    return coeffLabelBelow;
                }
                else if (labelRightBounds[i][0] + labelRightBounds[i][1] + 2 * labelLeft > labelRightBounds[i + 1][0]) {
                    labelRightBounds[i + 1][0] = labelRightBounds[i][0] + labelRightBounds[i][1] + 2 * labelLeft;
                    let nextHeight = getLabelHeight(i + 1);
                    let thisHeight = nextHeight + 1;
                    labelHeights[i] = thisHeight;
                    return thisHeight;
                }
                else {
                    getLabelHeight(i + 1);
                    labelHeights[i] = coeffLabelBelow;
                    return coeffLabelBelow;
                }
            }

            getLabelHeight(0);

            mainChart.selectAll(".sota-customBarChart-label-aboveBar-line")
                .data(data)
                .join("polyline")
                .attr("class", "sota-customBarChart-label-aboveBar-line")
                .attr("points", (d, i) => {
                    let x1 = x(prevValues[i]) + x(d.value) / 2;
                    let y1 = scaledHeight / 2;
                    let x2 = x1;
                    let y2 = scaledHeight + (labelHeights[i] + 1) * labelBelow;
                    let x3 = labelRightBounds[i][0] + labelRightBounds[i][1];
                    let y3 = y2;
                    return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
                })
                .attr("stroke-width", separatorStrokeWidth)
                .attr("stroke", lineColor)
                .attr("fill", "none")

            mainChart.selectAll(".sota-customBarChart-label-aboveBar-text")
                .data(data)
                .join("text")
                .attr("x", (d, i) => labelRightBounds[i][0])
                .attr("y", (d, i) => scaledHeight + labelHeights[i] * labelBelow);

            let labelsHeight = d3.max(labelHeights) * labelBelow + 20;

            let height = scaledHeight + margin.top + margin.bottom + labelsHeight;

            svg.attr("height", height);

            mainChart.attr("transform",`translate(${margin.left} ${margin.top})`)

        });

        chartRendered(container.node());
    })
}

export default customBarChart;