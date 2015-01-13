//Iron Router Configs
Router.configure({
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('button', {path: '/test'}) ;
    this.route('chartjs', {path: '/chartjs'} );
    this.route('c3', {path: '/c3'} );
    this.route('multc3', {path: '/multc3'} );
    this.route('flot', {path: '/flot'} );
    this.route('high', {path: '/highcharts'} );
    this.route('chartist', {path: '/chartist'} );
    this.route('home', {path: '/'});
});

// Chart objects
function drawChart(){
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.tooltipCornerRadius = 1;
  
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  scaleShowGridLines : false,
  datasets : [
    {
        fillColor : "#eeeeee",
        strokeColor : "#eeeeee",
        pointColor : "#eeeeee",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
        
    },
    {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "#03a9f4",
        pointColor : "#fff",
        pointStrokeColor : "#03a9f4",
        data : [45,48,46,49,48,50,51],
        datasetFill : false,
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data);
}

chartistdata = {
  // A labels array that can contain any sort of values
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0]
  ]
	
  }
  
c3spline = {
      type: 'spline',
      columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]
        },
        
c3donut = {
      type: 'donut',
      json: [
                {name: 'www.site1.com', upload: 200, download: 200, total: 400},
                {name: 'www.site2.com', upload: 100, download: 300, total: 400},
                {name: 'www.site3.com', upload: 300, download: 200, total: 500},
                {name: 'www.site4.com', upload: 400, download: 100, total: 500},
            ],
      keys: {
                value: ['upload', 'download'],
            }
        },
        
c3hbar = {
      type: 'bar',
      json: [
                {name: 'www.site1.com', upload: 200, download: 200, total: 400},
                {name: 'www.site2.com', upload: 100, download: 300, total: 400},
                {name: 'www.site3.com', upload: 300, download: 200, total: 500},
                {name: 'www.site4.com', upload: 400, download: 100, total: 500},
            ],
      keys: {
                value: ['upload', 'download'],
            }
        },

//Testing mongo connections
Data = new Mongo.Collection("data");
    

//Client Script
if (Meteor.isClient) {
  Meteor.startup(function () {
  


  });



  
Template.chartjs.rendered = function(){
  var a = performance.now();
  	drawChart();
  	var b = performance.now();
  console.log(b-a);
}

Template.c3.rendered = function(){
	var a = performance.now();
  	c3.generate(
  {
    bindto: this.find('.chart'),
      data: c3spline
  });
  	
	var b = performance.now();
	var time = (b-a);
	console.log(time);

}
  
Template.flot.rendered = function(){
	var a = performance.now();
	$.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });

  	
	var b = performance.now();
	var time = (b-a);
	console.log(time);

}

Template.high.rendered = function(){
var a = performance.now();
$(function () {
	
	
    $('#container').highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});
 var b = performance.now();
  console.log(b-a);

}

Template.multc3.rendered = function () {
  var a = performance.now();

  c3.generate(
  {
    bindto: this.find('.chart'),
      data: c3spline
  });
  c3.generate(
  {
    bindto: this.find('.chart2'),
      data: c3hbar
  });
  c3.generate(
  {
    bindto: this.find('.chart3'),
      data: c3donut
  })
  
  var b = performance.now();
  console.log(b-a);
	
  }

Template.chartist.rendered = function () {

  var a = performance.now();
  
  new Chartist.Line('.ct-chart', chartistdata);
  
  var b = performance.now();
  console.log(b-a);
  }

Template.layout.rendered = function(){
  	   $(".button-collapse").sideNav();
 
} 


  
//Testing mongo connections
Template.button.helpers({
    counters: function () {
      return Data.find({ name: "testing" }).count();
    }

  });

Template.button.events({
    'click button': function () {
      // increment the counter when button is clicked
      Data.insert({
      name: "testing",
      score:0
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}