"use strict";
Ember.testing = true;

var estudies, Son, parent, mySon;

module("Delegated properties", {
  setup: function() {
    estudies = ['Primary', 'Secondary', 'University'];
    Son = Em.Object.extend({
      name: 'John',
      age: 24,
      estudies: estudies
    });
    mySon = Son.create();
    parent = Em.Object.create({
      delegates: ['son', 'name age estudies'],
      son: mySon
    });
  }
});

test("Access to delegated properties", function() {
  var properties = parent.getProperties('name', 'age', 'estudies');

  ok(properties.name === 'John');
  ok(properties.age === 24);
  ok(properties.estudies === estudies);
});

test("Mantain the delegated properties updated", function() {
  mySon.set('name', 'Daniel');
  mySon.get('estudies').removeAt(0);

  ok(parent.get('name') === 'Daniel');
  ok(parent.get('estudies.length') === 2);

  mySon.get('estudies').pushObject('master');

  ok(parent.get('estudies.lastObject') === 'master');
});