import { Template } from "meteor/templating";
import { Activities } from "../../lib/activities";
import { News } from "../../lib/news";
import { RecipesData } from "../../lib/recipes-data";

const FEATURED_COUNT = 4;

Template.home.helpers({
  // selects FEATURED_COUNT number of recipes at random
  featuredRecipes: function() {
    const recipes = Object.values(RecipesData);
    const selection = [];

    for (let i = 0;i < FEATURED_COUNT;i++)
      selection.push(recipes.splice(_.random(recipes.length - 1), 1)[0]);

    return selection;
  },

  activities: function() {
    return Activities.latest();
  },

  latestNews: function() {
    return News.latest();
  }
});
