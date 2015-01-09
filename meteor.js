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


c3spline = {
      type: 'spline',
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
        
        
        
Router.configure({
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout'
    
});

Router.map(function(){
    this.route('button', {path: '/test'}) ;
    this.route('conversion', {path: '/conversion'} );
    this.route('social', {path: '/social'} );
    this.route('logistica', {path: '/log'} );
    this.route('trans', {path: '/trans'} );
    this.route('flot', {path: '/flot'} );
    this.route('home', {path: '/'});
});

Data = new Mongo.Collection("data");
    
    
if (Meteor.isClient) {
  Meteor.startup(function () {

  });


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
  
  
  Template.conversion.rendered = function(){
  var a = performance.now();
  	drawChart();
  	var b = performance.now();
  console.log(b-a);
}
  Template.social.rendered = function(){
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


Template.logistica.rendered = function () {
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
  
  Template.trans.rendered = function () {
  var a = performance.now();

  drawChart();
  
  var b = performance.now();
  console.log(b-a);
	
  }



Template.layout.rendered = function(){
  	   $(".button-collapse").sideNav();

 
} 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}