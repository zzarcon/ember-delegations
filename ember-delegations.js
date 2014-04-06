(function() {
  "use strict";
  Ember.Object.reopen({
    setDelegatedProperties: function() {
      var delegates = this.get('delegates');

      var self;

      var setDelegate = function(delegate) {
        var properties = delegate.properties.split(' ');

        console.log("1", this);
        properties.forEach(function(property) {
          Ember.defineProperty(this, property, Ember.computed(function() {
            var target = this.get(delegate.to);
            return target && target.get(property);
          }).property(delegate.to + '.' + property));
        }, this);
      }.bind(this);

      if (delegates) {
        if (Ember.isArray(delegates)) {
          delegates.forEach(setDelegate);
        } else {
          setDelegate(delegates);
        }
      }
    }.observes('delegates').on('init')
  });
})();
