import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/temps.js';

import './main.html';

if(Meteor.isServer){
}


Template.temperature.helpers({

  temperature: function(){

    return Temps.find({},{limit:1, sort: {createdAt: -1}});

  }
});

Template.condition.helpers({
    
  text: function(){

    return Temps.find({},{limit:1, sort: {createdAt: -1}});

  }
});

Template.humidity.helpers({
    text: function(){

    return Temps.find({},{limit:1, sort: {createdAt: -1}});

  }
});