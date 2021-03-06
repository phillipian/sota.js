import barChart from "./components/barChart.js";
import pieChart from "./components/pieChart.js";
import lineGraph from "./components/lineGraph.js";
import stackedBarChart from "./components/stackedBarChart.js";
import customBarChart from "./components/customBarChart.js";
import columnChart from "./components/columnChart.js";
import groupedBarChart from "./components/groupedBarChart.js";
import stackedColumnChart from "./components/stackedColumnChart.js";
import customColumnChart from "./components/customColumnChart.js";
import multiLineGraph from "./components/multiLineGraph.js";
import bigNumber from "./components/bigNumber.js";
import contentModule from "./components/contentModule.js";
import sotaConfig from "./lib/sotaConfig.js";
import {setColors, setStyles, colorInterpolate} from "./lib/sotaStyles.js";
import {sotaNavbar, sotaMasonry, createSections} from "./lib/sotaLayout.js";

let sota = {};

sota.barChart = barChart;
sota.pieChart = pieChart;
sota.lineGraph = lineGraph;
sota.stackedBarChart = stackedBarChart;
sota.customBarChart = customBarChart;
sota.columnChart = columnChart;
sota.groupedBarChart = groupedBarChart;
sota.stackedColumnChart = stackedColumnChart;
sota.customColumnChart = customColumnChart;
sota.multiLineGraph = multiLineGraph;
sota.bigNumber = bigNumber;
sota.contentModule = contentModule;
sota.setColors = setColors;
sota.setStyles = setStyles;
sota.sotaConfig = sotaConfig;
sota.colorInterpolate = colorInterpolate;
sota.sotaMasonry = sotaMasonry;
sota.sotaNavbar = sotaNavbar;
sota.createSections = createSections;

sota.setParam = function(prop, value){
    this.sotaConfig[prop] = value;
}

sota.getParam = function(prop){
    return this.sotaConfig[prop];
}

export default sota;
