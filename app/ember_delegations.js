Ember.Object.reopen({
  setDelegatedProperties: function() {
    var delegates = this.get('delegates');
    if (!delegates || delegates.get('length') < 2) return;

    var targetName = delegates.objectAt(0);
    var target = this.get(targetName);
    var properties = delegates.objectAt(1).split(' ');

    properties.forEach(function(property) {
      Ember.defineProperty(this, property, Ember.computed(function() {
        return target.get(property);
      }).property(targetName + '.' + property));
    }, this);
  }.observes('delegates').on('init')
});