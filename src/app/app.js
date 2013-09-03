var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Ember.Application.extend({
  ready: function() {
    'use strict';
    $(document).ajaxError(function(event, request, settings) {
      if (request.status === 401) { // && !["/profile", "/users/sign_in.json"].contains(settings.url) {
        alert("401 error");
      }
    });
  }
});

App.Router.map(function() {
  'use strict';
  this.resource('home');
  this.resource('about');
});

App.Store = DS.Store.extend({

});

DS.RESTAdapter.reopen({
  url: 'http://localhost:8080',
  namespace: 'beta/api/1'
});