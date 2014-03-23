'use strict';
var App = Ember.Application.create();

App.ApplicationController = Ember.ObjectController.extend({
  name: 'Amazing app',
  version: 0.1
});

App.IndexController = Ember.ObjectController.extend({
  needs: ['application'],
  delegates: ['controllers.application', 'name version currentPath']
});