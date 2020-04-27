import helper from '../helper.js';

export default function ({
    selector,
    dataFile,
    inputIsPercentage = false,
    showXAxis = true,
    writePercentageOnBar = true,
    prop3 = "value3",
    prop4 = "value4",
    prop5 = "value5",
    prop6 = "value6",
    margin = {
        "top": 20,
        "bottom": 20,
        "left": 24,
        "right": 20
    } }) {

    var container = d3.select(selector);
    var svg = container.append("svg");
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    var width = document.querySelector(selector).offsetWidth;

    d3.csv("data/" + dataFile + ".csv").then(data => {
        const hoverOpacity = 0.8;
        const tickSize = 8;
        
        const barHeight = 28;
        const barMargin = 16;
        
        // define styling variables here
        
        const barspace = barHeight + barMargin;
        const height = data.length * barspace + margin.bottom;

        svg.attr("width", width)
            .attr("height", height);

        // DATA PROCESSING

        const valueLabels = data.columns.slice(1);
        const groupLabels = d3.map(data, d => d.group).keys()

        // arrays of values and percentages

        var stackedData = [];

        if (inputIsPercentage){
            data.forEach(d => {
                let prevPercentage = 0;
                let thisPrevPercentages = [];
                let thisData = [];
                for (let valueLabel of valueLabels) {
                    thisPrevPercentages.push(prevPercentage);
                    let thisPercentage = +d[valueLabel];
                    thisData.push([thisPercentage,prevPercentage]);
                    prevPercentage += thisPercentage;
                }
                stackedData.push(thisData);
            })
        }
        else{
            data.forEach(d => {
                let prevPercentage = 0;
                let thisPrevPercentages = [];
                let total = d3.sum(valueLabels, k => +d[k]);
                let thisData = [];
                let thisValues = [];
                for (let valueLabel of valueLabels) {
                    thisPrevPercentages.push(prevPercentage);
                    let thisPercentage = +d[valueLabel] / total * 100;
                    thisData.push([thisPercentage, prevPercentage, +d[valueLabel]]);
                    prevPercentage += thisPercentage;
                }
                stackedData.push(thisData);
            });
        }

        const y = d3.scaleBand()
            .domain(groupLabels)
            .range([height - margin.bottom, margin.top])
            .padding([0.2])
        
        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width - margin.left - margin.right])

        const color = d3.scaleOrdinal()
            .domain(valueLabels)
            .range(['#e41a1c', '#377eb8', '#4daf4a']) // temporary. replace with class names later? with something like a map function for index so it can take any number of value options

        svg.append("g")
            .attr("class", "sota-lineGraph-axis sota-lineGraph-xAxis")
            .call(d3.axisBottom(x).ticks(data.length).tickSize(-tickSize))
            .attr("transform", "translate(" + margin.left + " " + (height - margin.bottom) + ")");

        svg.append("g")
            .attr("class", "sota-lineGraph-axis sota-lineGraph-yAxis")
            .call(d3.axisLeft(y).tickSize(-tickSize))
            .style("transform", "translateX(" + margin.left + "px)");

        // MAIN LOOP

        svg.selectAll(".sota-stackedBarChart-group")
            .data(stackedData)
            .join("g")
            .attr("class","sota-stackedBarChart-group")
            .attr("transform",(d, i) => "translate(0 " + y(groupLabels[i]) + ")")
            .selectAll(".sota-stackedBarChart-bar")
            .data(d => d)
            .join("rect")
            .attr("class","sota-stackedBarChart-bar")
            .attr("x", d => margin.left + x(d[1]))
            .attr("y", 0)
            .attr("fill", (d, i) => color(valueLabels[i]))
            .attr("width", d => x(d[0]))
            .attr("height", barHeight)
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("opacity", hoverOpacity);
                tooltip.style("opacity", 1.0)
                    .html(() => {
                        let retval = valueLabels[i] + "<br/>Percentage: " + d3.format(".1f")(d[0]) + "%";
                        if (!inputIsPercentage){
                            retval += "<br/>Number of responses: " + d[2];
                        }
                        return retval;
                    })
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mousemove", d => {
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("opacity", 1.0);
                tooltip.style("opacity", 0);
            });

        // svg.append("g")
        //     .selectAll("g")
        //     .data(stackedData)
        //     .join("g")
        //     .attr("fill",d=>color(d.key))
        //     .selectAll("rect")
        //     .data(d=>d)
        //     .join("rect")
        //     .attr("y", d => y(d.data.group))
        //     .attr("x", d=>x(d[0]))
        //     .attr("width",d=>x(d[1]) - x(d[0]))
        //     .attr("height", barHeight)
            

    });
}