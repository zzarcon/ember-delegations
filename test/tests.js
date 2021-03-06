(function() {
  "use strict";
  Ember.testing = true;

  var studies, Son, parent, mySon, grandpa, animal, dog;

  module("Delegated properties", {
    setup: function() {
      studies = ['Primary', 'Secondary', 'University'];
      Son = Em.Object.extend({
        name: 'John',
        age: 24,
        studies: studies
      });
      mySon = Son.create();

      grandpa = Em.Object.create({
        surname: 'Smith'
      });

      parent = Em.Object.create({
        delegations: [
          {properties: 'name age studies', to: 'son'},
          {properties: 'surname', to: 'grandpa'},
        ],
        son: mySon
      });

      animal = Em.Object.create({
        type: 'animal'
      });

      dog = Em.Object.create({
        delegations: {properties: 'type', to: 'animal'}
      });
    }
  });

  test("Access to delegated properties", function() {
    var properties = parent.getProperties('name', 'age', 'studies');

    ok(properties.name === 'John');
    ok(properties.age === 24);
    ok(properties.studies === studies);
  });

  test("Work with a single delegated property", function() {
    ok(!dog.get('type'));

    dog.set('animal', animal);

    ok(dog.get('type') === 'animal');
  });

  test("Mantain the delegated properties updated", function() {
    mySon.set('name', 'Daniel');
    mySon.get('studies').removeAt(0);

    ok(parent.get('name') === 'Daniel');
    ok(parent.get('studies.length') === 2);

    mySon.get('studies').pushObject('master');

    ok(parent.get('studies.lastObject') === 'master');
  });

  test("Change delegated properties dynamically", function() {
    var grandMa = Ember.Object.create({
      age: 70
    });

    parent.setProperties({
      grandMa: grandMa,
      delegations: {
        properties: 'age', to: 'grandMa'
      }
    });

    ok(parent.get('name') === undefined);
    ok(parent.get('age') === 70);
  });
})();
