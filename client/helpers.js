import { Template } from "meteor/templating";

export const pluralize = function(n, thing, options) {
  var plural = thing;
  if (_.isUndefined(n)) {
    return thing;
  } else if (n !== 1) {
    if (thing.slice(-1) === 's')
      plural = thing + 'es';
    else
      plural = thing + 's';
  }

  if (options && options.hash && options.hash.wordOnly)
    return plural;
  else
    return n + ' ' + plural;
}

Template.registerHelper('pluralize', pluralize);

const DIMENSIONS = {
  small: '320x350',
  large: '640x480',
  full: '640x800'
};

Template.registerHelper('recipeImage', function(options) {
  const size = options.hash.size || 'large';

  if (options.hash.recipe)
    return '/img/recipes/' + DIMENSIONS[size] + '/' + options.hash.recipe.name + '.jpg';
});

Template.registerHelper('activePage', function() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, Router.current().route.name) && 'active';
});
