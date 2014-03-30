Ember Property Delegation
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
    delegates: ['controllers.application', 'name version currentPath']
  });
```

In both cases the result is the same; from the dashboard context you can access to the three delegate properties but the second is much more elegant and declarative :D

## TODO

- [ ] Implement delegations with `Ember.Binding`
- [ ] Add tests