import { Template } from "meteor/templating";
import { pluralize } from "../helpers";

Template.bookmarks.helpers({
  recipeCount: function() {
    return pluralize(this.length, 'recipe');
  }
});
