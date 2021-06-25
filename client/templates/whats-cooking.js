import { Template } from "meteor/templating";
import { Activities } from "../../lib/activities";

Template.feed.helpers({
  activities: function() {
    return Activities.find({}, {sort: {date: -1}});
  },
  ready: function() {
    return Router.current().feedSubscription.ready();
  }
})
