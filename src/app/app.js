var App = Ember.Application.create();

App.Router.map(function() {
  'use strict';
  this.resource('home');
  this.resource('about');
});
