import { Template } from "meteor/templating";
import { BookmarkCounts } from "../../lib/bookmarks";

Template.recipeItem.helpers({
  path: function () {
    return Router.path('recipe', this.recipe);
  },

  highlightedClass: function () {
    if (this.size === 'large')
      return 'highlighted';
  },

  bookmarkCount: function () {
    const count = BookmarkCounts.findOne({recipeName: this.name});
    return count && count.count;
  }
});
