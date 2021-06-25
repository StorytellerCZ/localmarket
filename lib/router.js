import { Meteor } from "meteor/meteor";
import { LaunchScreen } from "meteor/launch-screen";
import { RecipesData } from "./recipes-data";

let feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
let dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  feedSubscription = Meteor.subscribe('feed');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

export const HomeController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('latestActivity', function () {
      dataReadyHold.release();
    });
  }
});

export const FeedController = RouteController.extend({
  onBeforeAction: function () {
    this.feedSubscription = feedSubscription;
  }
});

export const RecipesController = RouteController.extend({
  data: function () {
    return Object.values(RecipesData);
  }
});

export const BookmarksController = RouteController.extend({
  onBeforeAction: function () {
    if (Meteor.user())
      Meteor.subscribe('bookmarks');
    else {
      if (Meteor.isClient) {
        import { Overlay } from "../client/templates/overlay";

        Overlay.open('authOverlay');
      }
    }
  },
  data: function () {
    if (Meteor.user())
      return Object.values(_.pick(RecipesData, Meteor.user().bookmarkedRecipeNames));
  }
});

export const RecipeController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('recipe', this.params.name);
  },
  data: function () {
    return RecipesData[this.params.name];
  }
});

export const AdminController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('news');
  }
});

Router.route('home', {
  path: '/'
});

Router.route('feed');

Router.route('recipes');

Router.route('bookmarks');

Router.route('about');

Router.route('recipe', {
  path: '/recipes/:name'
});

Router.route('admin', {
  layoutTemplate: null
});

Router.onBeforeAction('dataNotFound', {
  only: 'recipe'
});
