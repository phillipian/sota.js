import sota from '../js/sota.js';
import '../js/d3.v5.min.js';

// D3/sota.js

sota.barChart({ selector: "#module-general-ethnicity-d3", dataFile: "ethnicity", totalResp: 1052, maxVal: true, displayPercentage: true });

sota.pieChart({ selector: "#module-general-community-d3", dataFile: "community"});

sota.lineGraph({ selector: "#module-discipline-time-d3", dataFile: "disc-time", inputIsPercentage: true, maxVal: 8 })

sota.stackedBarChart({ selector: "#module-discipline-room-visits", dataFile: "room-visit-policy", groupLabelStyle: "onBar" })

sota.stackedBarChart({ selector: "#module-general-parents-college", dataFile: "parents-college", labelStyle: "aboveBar", showLegend: false })

sota.customBarChart({ selector: "#wellness-cloud-svg", dataFile: "happiness", shapeFile: "cloud" })

sota.columnChart({ selector: "#wellness-support", dataFile: "support", totalResp: 1052 })

sota.groupedBarChart({ selector: "#wellness-social-media", dataFile: "wellness-social-media", totalResp: {2022:214,2021:275,2020:271,2019:286} })

sota.stackedColumChart({ selector: "#module-politics-reverse-racism-gender", dataFile: "reverse-racism-gender", totalResp: 1032 })
