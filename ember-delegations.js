(function() {
  "use strict";

  Ember.Object.reopen({
    onInit: function() {
      this.setDelegatedProperties();
    }.on('init'),

    onDelegatesChange: function() {
      this.removeOldDelegations();
      this.setDelegatedProperties();
    }.observes('delegations'),

    removeOldDelegations: function() {
      var oldProps = this.get('oldDelegatedProperties');
      if (!oldProps) return;

      var self = this;
      var removeProps = function(props) {
        var arr = props.properties.split(' ');

        arr.forEach(function(propertyName) {
          self.set(propertyName, undefined);
        });
      };

      if (oldProps) {
        if (Ember.isArray(oldProps)) {
          oldProps.forEach(removeProps);
        } else {
          removeProps(oldProps);
        }
      }

      this.set('oldDelegatedProperties', null);
    },

    setDelegatedProperties: function() {
      if (!this || !this.get('delegations')) return;

      var delegations = this.get('delegations');
      var self = this;
      var setDelegate = function(delegate) {
        var properties = delegate.properties.split(' ');

        properties.forEach(function(property) {
          Ember.defineProperty(this, property, Ember.computed(function() {
            var target = this.get(delegate.to);
            return target && target.get(property);
          }).property(delegate.to + '.' + property));
        }, self);
      };

      if (delegations) {
        if (Ember.isArray(delegations)) {
          delegations.forEach(setDelegate);
        } else {
          setDelegate(delegations);
        }
      }

      this.set('oldDelegatedProperties', delegations);
    }
  });
})();
