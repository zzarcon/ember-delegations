# Ember Property Delegation [![Build Status](https://travis-ci.org/zzarcon/ember-delegations.svg?branch=master)](https://travis-ci.org/zzarcon/ember-delegations)
=================

Plugin for delegate ember properties in a very descriptive and easy way. For example, you have a `dashboard controller` and you want to access a list of properties of your `application controller`, usually you declare each property in your controller and assign the value via `Ember.computed.alias` :

**After**
```javascript
  App.DashboardController = Ember.ObjectController.extend({
    needs: ['application'],
    name: Ember.computed.alias('controllers.application.name'),
    version: Ember.computed.alias('controllers.application.version'),
    currentPath: Ember.computed.alias('controllers.application.currentPath')
  });
```

**Now**
```javascript
  App.DashboardController = Ember.ObjectController.extend({
    needs: ['application'],
    delegates: {properties: 'name version currentPath', to: 'controllers.application'}
  });
```

In both cases the result is the same; from the dashboard context you can access to the three delegate properties but the second is much more elegant and declarative :D

**Multiple delegation**
```javascript
var animal = Ember.Object.create({
  type: 'animal'
});
var alien = Ember.Object.create({
  eyes: {
    number: 4,
    color: 'green'
  }
});

var dog = Em.Object.create({
  animal: animal,
  alien: alien,
  delegates: [
    {properties: 'type', to: 'animal'},
    {properties: 'eyes', to: 'alien'}
  ]
});
```
## CONTRIBUTING
### Runing tests
`grunt connect:test:keepalive`
## TODO

- Implement delegations with `Ember.Binding`