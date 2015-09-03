/**
 * Dimension Module Javascript File
 * --------------------------------
 * @author   aidentailor <aiden@aidentailor.net>
 * @copyight 2011 Aiden Tailor
 */


/**
 * Handle initial Country selection
 */

// Global var to access the chart
var chart;
var options;

function displayDimensionChart(data)
{
	// display no value if LTO == -1
	if (data.lto == -1) data.lto = null;
	// display no value if IND == -1
	if (data.ind == -1) data.ind = null;	
	
	//console.log(data);
	options =
	{
		chart:
		{
			renderTo: 'chart_container',
			defaultSeriesType: 'column',
			showAxis: false
		},
		title:
		{
			text: '<strong>' + data.country + '</strong>',
			margin: 30
		},
		xAxis:
		{
			categories: ['Power Distance', 'Individualism', 'Masculinity', 'Uncertainty Avoidance', 'Long Term Orientation', 'Indulgence'],
			offset: 10,
			tickColor: null,
			lineColor: null,
			title: {text: null},
			labels:
			{
				style:
				{
					fontWeight: 'normal',
					fontSize: '12'
				}
			}
		},
		yAxis:
		{
			min: 0,
			gridLineColor: null,
			title: {text: null},
			labels: {enabled: false}
		},
		tooltip:
		{
			formatter: function()
			{
				// like "Angola PDI 56"
				return this.series.name + ' ' + this.x + ': ' + this.y;
			}
		},
		plotOptions:
		{
			column:
			{
				dataLabels: {
					enabled: true,
					style: {fontSize: '14'}
				},
				shadow: false,
				borderWidth: 0,
				cursor: 'pointer'
			}
		},
		legend : {enabled: true},
		credits: {enabled: false},
		series:
		[{
			name: data.country,
			data: [data.pdi, data.idv, data.mas, data.uai, data.lto, data.ind]
		}],
		colors: ['#9c9a9c', '#aac4cb' ,'#bfd0a0']
	}
	
	// instantiate the chart
	chart = new Highcharts.Chart(options);

	// call listenForComparsion if chart has been loaded
	listenForComparison();

} // method end


/**
 * Handle Comparison Charts
 */
function listenForComparison()
{
	// Listen for change on comparison selector
	$('#comparisonSelection form select[name=target]').change(function(event)
	{
		event.preventDefault();
		
		// check if more than 3 countries are being compared
		if (chart.series.length >= 3) {
			apprise('<div style="text-align:center"><h3>Notice:</h3><p>You cannot compare more than 3 countries at the same time.<br>Please select a new base country to compare again with others.</p></div>');
			return;
		}
		
		// show loading message
		chart.showLoading();
		
		// get link and strip off .html
		var link = $(this).val().replace('.html', '').replace('index.php/', '');
		//console.log(link);
		
		// send link to PHP
		$.post(
			'system/modules/at_dimension_charts/Comparison.php',
			{alias: link},
			function(data)
			{
				// hide loading message
				chart.hideLoading();
				
				// parse json data from php as js json object
				data = JSON.parse(data);
				
				data.pdi = parseInt(data.pdi);
				data.idv = parseInt(data.idv);
				data.mas = parseInt(data.mas);
				data.uai = parseInt(data.uai);
				data.lto = parseInt(data.lto);
				data.ind = parseInt(data.ind);
				
				// display no value if LTO == -1
				if (data.lto == -1) data.lto = null;
				// display no value if IND == -1
				if (data.ind == -1) data.ind = null;
				
				// prepare data for series array of the chart
				var cpCountry = {
					name: data.country,
					data: [data.pdi, data.idv, data.mas, data.uai, data.lto, data.ind]
				};
				
				chart.addSeries(cpCountry);
				var cc = "";
				for (var i = 1; i < chart.series.length; i++) {if (i > 1) cc = cc + " and " + chart.series[i].name ; else cc = chart.series[i].name;}
				// add new data series to the chart
				// Set a subtitle
				//chart.setTitle(null, {text: 'in comparison with the below'});
				chart.setTitle(null, {text: 'in comparison with ' + cc});
			}
		);
	});
}
