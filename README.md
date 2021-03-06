# sota.js

Charting library for *The Phillipian*'s [annual State of the Academy survey project](https://sota.phillipian.net) by
Samson Zhang EDE CXLII (@wwsalmon) and Anthony Kim Digital Editor CXLII,CXLIII (@createandbuild). Built on d3.

# Setup

## Using plain JS (recommended for now):

1. Include d3.js and masonry.js (to use createSections, section selectors, and sotaMasonry), as well as
`dist/sota.min.js`, in your `<head>`:

    ```
    <script src="PATH/TO/d3.min.v5.js"></script>
    <script src="PATH/TO/masonry.pkgd.min.js"></script>
    <script src="PATH/TO/sota.min.js"></script>
    ```

    Or, using CDNs:

    ```
    <script src="https://unpkg.com/d3@5.16.0/dist/d3.min.js"></script>
    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
    <script src="PATH/TO/sota.min.js"></script>
    ```

2. In your app or index js, configure `sotaConfig` and call setup functions like `setColors` and `setStyles`, and
    `createSections` and `sotaNavbar` if desired. As an example, here is a snippet from `demo/index.js`:

    ```
    // required for graphs to look okay -- specify at minimum a slug and array of colors
    sota.sotaConfig.sections = [
    {"slug": "sotajs", "name": "sota.js", "colors": sota.colorInterpolate("#222222")},
    {"slug": "politics", "name": "Politics & Worldview", "blurb": "test blurb", "colors":
    sota.colorInterpolate("#660066", "#dac7d8", 5, true)},
    {"slug": "wellness", "name": "Health & Wellness", "colors": sota.colorInterpolate("#6cb643", "#cae3cb", 5, true)},
    {"slug": "discipline", "name": "Discipline", "colors": sota.colorInterpolate("#b43432", "#f0d1ca", 5, true)}
    ]

    // required for graphs to look okay -- call functions to inject color, style CSS based on sotaConfig
    sota.setColors(sota.sotaConfig);
    sota.setStyles(sota.sotaConfig);

    // required only if you want to generate default layout containers. Can also specify directly through HTML and use
    selectors for graphs
    sota.createSections(sota.sotaConfig);

    // optional, render navbar based on sotaConfig.sections
    // make sure you call createSections first!
    sota.sotaNavbar(sota.sotaConfig, "sota.js Demo", "szlogo.png", false, "https://www.samsonzhang.com/");
    ```

    See [usage](#Usage) for specifics on these functions.

3. After calling setup functions, call all the chart-rendering functions you want inside `window.onload` (to ensure
    that these functions can find containers and selectors being dynamically created). After all your chart-rendering
    functions, call `sotaMasonry` to arrange the layout.

    See [usage](#Usage) for specifics on these functions, as well as each of the chart-rendering functions.

    ```
    // render graphs inside window.onload so they will be able to find parent containers dynamically created above
    window.onload = () => {

    sota.barChart({title: "What does a graph look like?", subtitle: "Here's a bar chart", section: "sotajs",
    dataFile: "data/ethnicity", totalResp: 1052, maxVal: true, displayPercentage: true});

    sota.multiLineGraph({section: "sotajs", title: "Multilinegraph", dataFile: "data/gpaXincome", maxVal: 30});

    ...

    sota.stackedColumnChart({ section: "politics", title: "Reverse Racism Percentage by Gender",
    subtitle: "Do you believe that reverse racism exists?", dataFile: "data/reverse-racism-gender",
    totalResp: 1032 });

    // after everything has loaded, use Masonry to fix up layout
    sota.sotaMasonry();
    }
    ```

    If you're not using `sota-section` parent containers or if you're using selectors that are hard-coded rather than
    dynamically created, you can forego `window.onload` and `sotaMasonry`.

## Using npm:

**I haven't tested using npm and believe there are some problems with dependencies, so I would advise against using
npm for now.**

Run:

npm i sota.js

d3 and masonry are dependencies, so you don't have to worry about them separately.

In your app, you can now use the functions of the `sota` object just as you would in plain js.

<a name="Usage"></a>

## Functions

<dl>
<dt><a href="#barChart">barChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [showXAxis], [showSeparators], [displayPercentage], [totalResp], [maxVal], [minVal], [margin])</a></dt>
<dd><p>Render sota.js bar chart</p>
</dd>
<dt><a href="#bigNumber">bigNumber(title, number, subtitle, [selector], [section])</a></dt>
<dd><p>Render big number with subtitle. Not really a chart, no SVG involved, but using JS helps keep ordering correct</p>
</dd>
<dt><a href="#columnChart">columnChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [totalResp], [maxVal], [minVal], [mainHeight], [showLegend], [margin])</a></dt>
<dd><p>Render sota.js column chart</p>
</dd>
<dt><a href="#contentModule">contentModule(title, content, subtitle, [selector], [section])</a></dt>
<dd><p>Render big number with subtitle. Not really a chart, no SVG involved, but using JS helps keep ordering correct</p>
</dd>
<dt><a href="#customBarChart">customBarChart(dataFile, [selector], [section], [title], [subtitle], shapeFile, shapeWidth, [inputIsPercentage], [margin])</a></dt>
<dd><p>Render sota.js custom bar chart, using an SVG path as the base</p>
</dd>
<dt><a href="#customColumnChart">customColumnChart(dataFile, [selector], [section], [title], [subtitle], shapeFile, shapeHeight, [inputIsPercentage], [margin])</a></dt>
<dd><p>Render sota.js custom column chart, using an SVG path as the base</p>
</dd>
<dt><a href="#groupedBarChart">groupedBarChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [totalResp], [maxVal], [minVal], [margin])</a></dt>
<dd><p>Render sota.js grouped bar chart</p>
</dd>
<dt><a href="#lineGraph">lineGraph(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [maxVal], [minVal], [margin], [height])</a></dt>
<dd><p>Render sota.js line graph</p>
</dd>
<dt><a href="#multiLineGraph">multiLineGraph(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [maxVal], [minVal], [height], [showLegend], [margin])</a></dt>
<dd></dd>
<dt><a href="#pieChart">pieChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [sorted], [pieRad], [pieThick], [margin])</a></dt>
<dd><p>Render sota.js pie chart</p>
</dd>
<dt><a href="#stackedBarChart">stackedBarChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [showXAxis], [labelStyle], [groupLabelStyle], [showLegend], [margin])</a></dt>
<dd><p>Render sota.js stacked bar chart</p>
</dd>
<dt><a href="#stackedColumnChart">stackedColumnChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [maxVal], [minVal], [mainHeight], [margin])</a></dt>
<dd><p>Render sota.js stacked column chart</p>
</dd>
<dt><a href="#sotaMasonry">sotaMasonry()</a></dt>
<dd><p>Function to generate masonry layout on sota containers and modules</p>
</dd>
<dt><a href="#sotaNavbar">sotaNavbar(sotaConfig, [text], [logo], [textLink], [logoLink])</a></dt>
<dd><p>Function to render navbar. <em>Run after createSections</em></p>
</dd>
<dt><a href="#createSections">createSections(sotaConfig)</a></dt>
<dd><p>Function to render sections. <em>Run before sotaNavbar</em></p>
</dd>
<dt><a href="#setStyles">setStyles(sotaConfig)</a></dt>
<dd><p>Function to inject inline styling for sota charts, navbar, layout, etc.</p>
</dd>
<dt><a href="#setColors">setColors(sotaConfig)</a></dt>
<dd><p>Function to set colors for sota charts, layout, navbar, etc.</p>
</dd>
<dt><a href="#colorInterpolate">colorInterpolate(start, [end], [steps], [includeLast])</a></dt>
<dd><p>Function that generates an array of hex codes interpolating between start and end hex codes</p>
</dd>
</dl>

<a name="barChart"></a>

## barChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [showXAxis], [showSeparators], [displayPercentage], [totalResp], [maxVal], [minVal], [margin])
Render sota.js bar chart

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [showXAxis] | <code>boolean</code> | <code>true</code> | Whether or not to render x axis |
| [showSeparators] | <code>boolean</code> | <code>true</code> | Whether or not to show separators between bars |
| [displayPercentage] | <code>boolean</code> | <code>true</code> | Whether to display percentage or value on bar |
| [totalResp] | <code>number</code> |  | Number of total responses. Specify if categories are non-exclusive, i.e. if there are less total items than the sum of data points. |
| [maxVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 100 for percentages or max of data for non-percentages is used as scale maximum value. If maxVal is set to true, max of dataset is used for percentages instead of 100. If a number is specified, that number is used as the max. |
| [minVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 0 for percentages or min of data for non-percentages is used as scale minimum value. If minVal is set to true, min of dataset is used for percentages instead of 0. If a number is specified, that number is used as the min. |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="bigNumber"></a>

## bigNumber(title, number, subtitle, [selector], [section])
Render big number with subtitle. Not really a chart, no SVG involved, but using JS helps keep ordering correct

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | Title to be rendered in h3 tag |
| number | <code>string</code> | Number to be rendered in .sota-big |
| subtitle | <code>string</code> | Subtitle to follow number |
| [selector] | <code>string</code> | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> | Either this or selector param is required. Slug for section to add .sota-module container and chart to |

<a name="columnChart"></a>

## columnChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [totalResp], [maxVal], [minVal], [mainHeight], [showLegend], [margin])
Render sota.js column chart

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [displayPercentage] | <code>boolean</code> | <code>true</code> | Whether to display percentage or values on axis |
| [totalResp] | <code>number</code> |  | Number of total responses. Specify if categories are non-exclusive, i.e. if there are less total items than the sum of data points. |
| [maxVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 100 for percentages or max of data for non-percentages is used as scale maximum value. If maxVal is set to true, max of dataset is used for percentages instead of 100. If a number is specified, that number is used as the max. |
| [minVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 0 for percentages or min of data for non-percentages is used as scale minimum value. If minVal is set to true, min of dataset is used for percentages instead of 0. If a number is specified, that number is used as the min. |
| [mainHeight] | <code>number</code> |  | Height of the chart. Defaults to value from sotaConfig |
| [showLegend] | <code>boolean</code> | <code>false</code> | Whether to show legend or bottom text labels |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="contentModule"></a>

## contentModule(title, content, subtitle, [selector], [section])
Render big number with subtitle. Not really a chart, no SVG involved, but using JS helps keep ordering correct

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | Title to be rendered in h3 tag |
| content | <code>string</code> | HTML conetnt to be rendered beneath subtitle |
| subtitle | <code>string</code> | Subtitle to follow number |
| [selector] | <code>string</code> | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> | Either this or selector param is required. Slug for section to add .sota-module container and chart to |

<a name="customBarChart"></a>

## customBarChart(dataFile, [selector], [section], [title], [subtitle], shapeFile, shapeWidth, [inputIsPercentage], [margin])
Render sota.js custom bar chart, using an SVG path as the base

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| shapeFile | <code>string</code> |  | Relative path to svg shape file, excluding file extension, i.e. "shapes/shapefile" |
| shapeWidth | <code>number</code> |  | Width of shape for chart |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="customColumnChart"></a>

## customColumnChart(dataFile, [selector], [section], [title], [subtitle], shapeFile, shapeHeight, [inputIsPercentage], [margin])
Render sota.js custom column chart, using an SVG path as the base

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| shapeFile | <code>string</code> |  | Relative path to svg shape file, excluding file extension, i.e. "shapes/shapefile" |
| shapeHeight | <code>number</code> |  | Height of shape for chart |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="groupedBarChart"></a>

## groupedBarChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [totalResp], [maxVal], [minVal], [margin])
Render sota.js grouped bar chart

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [displayPercentage] | <code>boolean</code> | <code>true</code> | Whether to display percentage or value on axis |
| [totalResp] | <code>number</code> |  | Number of total responses. Specify if categories are non-exclusive, i.e. if there are less total items than the sum of data points. |
| [maxVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 100 for percentages or max of data for non-percentages is used as scale maximum value. If maxVal is set to true, max of dataset is used for percentages instead of 100. If a number is specified, that number is used as the max. |
| [minVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 0 for percentages or min of data for non-percentages is used as scale minimum value. If minVal is set to true, min of dataset is used for percentages instead of 0. If a number is specified, that number is used as the min. |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="lineGraph"></a>

## lineGraph(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [maxVal], [minVal], [margin], [height])
Render sota.js line graph

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [maxVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 100 for percentages or max of data for non-percentages is used as scale maximum value. If maxVal is set to true, max of dataset is used for percentages instead of 100. If a number is specified, that number is used as the max. |
| [minVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 0 for percentages or min of data for non-percentages is used as scale minimum value. If minVal is set to true, min of dataset is used for percentages instead of 0. If a number is specified, that number is used as the min. |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |
| [height] | <code>number</code> | <code>300</code> | Height of the chart. Defaults to 300 |

<a name="multiLineGraph"></a>

## multiLineGraph(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [maxVal], [minVal], [height], [showLegend], [margin])
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [displayPercentage] | <code>boolean</code> | <code>true</code> | Whether to display percentage or value on axis |
| [maxVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 100 for percentages or max of data for non-percentages is used as scale maximum value. If maxVal is set to true, max of dataset is used for percentages instead of 100. If a number is specified, that number is used as the max. |
| [minVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 0 for percentages or min of data for non-percentages is used as scale minimum value. If minVal is set to true, min of dataset is used for percentages instead of 0. If a number is specified, that number is used as the min. |
| [height] | <code>number</code> | <code>300</code> | Height of the graph |
| [showLegend] | <code>boolean</code> | <code>true</code> | Whether or not to show legend |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="pieChart"></a>

## pieChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [sorted], [pieRad], [pieThick], [margin])
Render sota.js pie chart

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [sorted] | <code>boolean</code> | <code>true</code> | Whether or not to sort order of slices by size |
| [pieRad] | <code>number</code> | <code>150</code> | Radius of pie in chart |
| [pieThick] | <code>number</code> | <code>80</code> | Thickness of pie slices (this is actually a donut chart) |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="stackedBarChart"></a>

## stackedBarChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [showXAxis], [labelStyle], [groupLabelStyle], [showLegend], [margin])
Render sota.js stacked bar chart

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [showXAxis] | <code>boolean</code> | <code>true</code> | Whether or not to render x axis |
| [labelStyle] | <code>&quot;none&quot;</code> \| <code>&quot;onBar&quot;</code> \| <code>&quot;aboveBar&quot;</code> | <code>&quot;onBar&quot;</code> | Style of labels for sub-groups (slices of bars). None hides all labels. onBar displays values on the bars, and hides any that don’t fit. aboveBar draws labels above the bar with pointing lines |
| [groupLabelStyle] | <code>&quot;none&quot;</code> \| <code>&quot;onBar&quot;</code> | <code>&quot;none&quot;</code> | Style of labels for groups. None hides all labels. onBar displays labels above bars |
| [showLegend] | <code>boolean</code> | <code>true</code> | Whether or not to show legend |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="stackedColumnChart"></a>

## stackedColumnChart(dataFile, [selector], [section], [title], [subtitle], [inputIsPercentage], [displayPercentage], [maxVal], [minVal], [mainHeight], [margin])
Render sota.js stacked column chart

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataFile | <code>string</code> |  | Relative path to csv data file, excluding file extension, i.e. "data/datafile" |
| [selector] | <code>string</code> |  | Either this or section param is required. Query selector for container div to render chart in, i.e. "#selector." |
| [section] | <code>string</code> |  | Either this or selector param is required. Slug for section to add .sota-module container and chart to |
| [title] | <code>string</code> |  | Title to be rendered in h3 tag. Only rendered if section param is used and not selector |
| [subtitle] | <code>string</code> |  | Subtitle to be rendered in .sota-subtitle div. Only rendered if section param is used and not selector |
| [inputIsPercentage] | <code>boolean</code> | <code>false</code> | Whether or not input data is in percentages |
| [displayPercentage] | <code>boolean</code> | <code>true</code> | Whether to display percentage or value on axis |
| [maxVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 100 for percentages or max of data for non-percentages is used as scale maximum value. If maxVal is set to true, max of dataset is used for percentages instead of 100. If a number is specified, that number is used as the max. |
| [minVal] | <code>number</code> \| <code>boolean</code> |  | By default, either 0 for percentages or min of data for non-percentages is used as scale minimum value. If minVal is set to true, min of dataset is used for percentages instead of 0. If a number is specified, that number is used as the min. |
| [mainHeight] | <code>number</code> |  | Height of the chart. Defaults to value from sotaConfig |
| [margin] | <code>Object</code> |  | Object containing top, left, bottom, right margins for chart. Defaults to values from sotaConfig |

<a name="sotaMasonry"></a>

## sotaMasonry()
Function to generate masonry layout on sota containers and modules

**Kind**: global function  
<a name="sotaNavbar"></a>

## sotaNavbar(sotaConfig, [text], [logo], [textLink], [logoLink])
Function to render navbar. *Run after createSections*

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sotaConfig |  |  | sotaConfig object |
| [text] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Text to display in navbar |
| [logo] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Relative path to logo to display in navbar |
| [textLink] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Link for navbar text |
| [logoLink] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Link for navbar logo |

<a name="createSections"></a>

## createSections(sotaConfig)
Function to render sections. *Run before sotaNavbar*

**Kind**: global function  

| Param | Description |
| --- | --- |
| sotaConfig | sotaConfig object |

<a name="setStyles"></a>

## setStyles(sotaConfig)
Function to inject inline styling for sota charts, navbar, layout, etc.

**Kind**: global function  

| Param | Description |
| --- | --- |
| sotaConfig | sotaConfig object |

<a name="setColors"></a>

## setColors(sotaConfig)
Function to set colors for sota charts, layout, navbar, etc.

**Kind**: global function  

| Param | Description |
| --- | --- |
| sotaConfig | sotaConfig object |

<a name="colorInterpolate"></a>

## colorInterpolate(start, [end], [steps], [includeLast])
Function that generates an array of hex codes interpolating between start and end hex codes

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>string</code> |  | 6-digit hex code for starting color, including "#" at beginning |
| [end] | <code>string</code> | <code>&quot;#ffffff&quot;</code> | 6-digit hex code for ending color, including "#" at beginning |
| [steps] | <code>number</code> | <code>8</code> | Number of steps, equal to the length of the returned array |
| [includeLast] | <code>boolean</code> | <code>false</code> | Whether or not to include the given end value in the final array |

