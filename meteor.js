function drawChart(){
  Chart.defaults.global.responsive = true;
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
    },
    {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data);
}

Router.configure({
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout'
    
});

Router.map(function(){
    this.route('button', {path: '/test'}) ;
    this.route('conversion', {path: '/conversion'} );
    this.route('social', {path: '/social'} );
    this.route('logistica', {path: '/log'} );
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
  	drawChart();
}
  Template.social.rendered = function(){
  	drawChart();
}

  Template.logistica.rendered = function(){
  	drawChart();
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


