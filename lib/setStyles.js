import sotaConfig from "./sotaConfig.js";

export default function(thisSotaConfig = sotaConfig){
    const mainWidth = 1500;
    const moduleMargin = 48;
    const numberFont = thisSotaConfig.numberFont;
    const labelFont = thisSotaConfig.labelFont;
    const axisStrokeWidth = thisSotaConfig.separatorStrokeWidth;
    const axisStrokeColor = thisSotaConfig.lineColor;
    const axisTextMargin = 4;
    let styleSheet = `
.sota-section {
	padding: 48px 0;
	width: 100%
}

.sota-section > p{
  color: #fff;
  font-family: ${labelFont};
  line-height: 1.5;
  max-width: 800px;
  margin: 64px auto;
  padding: 0 24px;
}

.sota-section h1 {
	font-size: 56px;
	font-family: ${numberFont}, sans-serif;
	text-transform: uppercase;
	font-weight: 700;
	text-align: center;
	color: #fff
}

.sota-section-inner {
    position: relative;
	max-width: ${mainWidth}px;
	box-sizing: border-box;
	font-family: "Montserrat", Arial, sans-serif;
	width: 100%;
	padding: 48px 24px;
	margin: 0 auto;
	background-color: #fff;
	grid-template-columns: minmax(0, 1fr)
}

.sota-section-inner:before{
    pointer-events: none;
    content: "";
    position: absolute;
    left: 0;
    top: 32px;
    display: none;
    height: calc(100% - 64px);
}

.sota-section-inner:after{
    content: "";
    clear: both;
    display: table;    
}

.sota-section .sota-module {
	position: absolute;
	float: left;
	width: calc(100% - 48px);
	border-bottom: 1px solid rgba(0,0,0,0.2);
	padding-bottom: 32px;
	margin-bottom: 32px;
}

@media (min-width: 800px) {
    .sota-section-inner:before{
      width: 50%;
      display: block;
        border-right: 1px solid rgba(0,0,0,0.1);
    }
    
    .sota-section .sota-module {
        width: calc(50% - ${24 + moduleMargin / 2}px);
    }
}

@media (min-width: 1200px) {    
    .sota-section .sota-module {
        width: calc(33% - ${16 + 2 * moduleMargin / 3}px);
    }

    .sota-section-inner:before{
        width: 33.3%;
        left: 33.3%;
        border-left: 1px solid rgba(0,0,0,0.1);
    }
}

.sota-module>svg {
	width: 100%
}

.sota-module h3 {
	font-family: ${numberFont}, sans-serif;
	font-weight: 700;
	text-transform: uppercase;
	line-height: 1.1;
}

.sota-module p{
    line-height: 1.4;
}

.sota-module .subtitle {
	font-family: ${labelFont}, serif;
	opacity: 0.4;
	line-height: 1.1;
}

.sota-heavy-label{
    font-weight: 700;
}

.sota-num-label, .sota-num-axis .tick text{
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    fill: ${sotaConfig.labelColor};
}

.sota-text-label, .sota-text-axis .tick text{
    font-family: ${labelFont}, serif;
    fill: black;
}

.sota-num-label.sota-stackedBarChart-label-onBar{
    fill: rgba(255,255,255,0.6);
}

.sota-tooltip {
	background-color: #222;
	color: #fff;
	padding: 12px;
	position: absolute;
	pointer-events: none;
	opacity: 0;
	transform: translate(-50%, -100%);
	white-space: nowrap
}

.sota-gen-axis{
    opacity: 0.4;
}

.sota-gen-axis.sota-gen-xAxis .tick text {
	transform: translateY(${axisTextMargin}px);
}

.sota-gen-axis.sota-gen-yAxis .tick text {
	transform: translateX(${-axisTextMargin - 4}px);
	text-anchor: end
}

.sota-gen-xAxis:not(.sota-text-axis) g.tick:first-of-type text:not(.angled-label){
    text-anchor: start;
}

.sota-gen-xAxis:not(.sota-text-axis) g.tick:last-of-type text:not(.angled-label){
    text-anchor: end;
}

.sota-gen-axis .tick line,
.sota-gen-axis path.domain {
	stroke-width: ${axisStrokeWidth}px;
	stroke: ${axisStrokeColor};
}

.sota-groupedBarChart-xAxis .tick line {
	opacity: 0.2
}

.sota-big {
	font-weight: 700;
	font-size: 96px;
	line-height: 1.0;
	margin-top: -8px;
	font-family: ${labelFont}, serif
}

.sota-section-inner.hide .module{
    border-bottom: none;
}

.sota-section-inner.hide .module > *{
    visibility: hidden;
}

.sota-section-inner:not(.hide) .loading{
    display: none;
}
    `;

    document.head.appendChild(document.createElement('style')).textContent = styleSheet;
    console.log("styles set");
}