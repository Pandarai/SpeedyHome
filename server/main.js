import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import 'meteor/jquery';
import '../imports/api/temps.js';
var later = require('later');


Meteor.startup(() => {
  // code to run on server at startup
  // fires on the 0th, 10th, 20th, 30th, 40th, and 50th min of every hour
  SyncedCron.start(later.parse.recur().every(10).minute());

});

SyncedCron.add({
  name: 'Get the weather',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 10 minutes');
  },
  job: function() {
    var response = GetTemperature();
      console.log(response);
      Temps.insert({text: response['data'].main.temp, humidity: response['data'].main.humidity, condition: response['data'].weather[0].main, description: response['data'].weather[0].description, createdAt: new Date()});
    return response;
  }
});

function GetTemperature(){
    var temperature;
     var response = HTTP.call("get", "http://api.openweathermap.org/data/2.5/weather?q=Portsmouth,uk&units=metric&APPID=5184cc7cc744ad2d5f4137de2cd6226d");
     temperature = response['data'].main.temp;

     return response;
}