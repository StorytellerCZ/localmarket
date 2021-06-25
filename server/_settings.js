import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration"
// Provide defaults for Meteor.settings
//
// To configure your own Twitter keys, see:
//   https://github.com/meteor/localmarket#configuring-twitter
if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

ServiceConfiguration.configurations.upsert(
  { service: "twitter" },
  {
    $set: {
      consumerKey: Meteor.settings?.twitter?.consumerKey || "PLfrg2bUh0oL0asi3R2fumRjm",
      secret: Meteor.settings?.twitter?.secret || "sRI8rnwO3sx7xUAxNWTX0WEDWph3WEBHu6tTdJYQ5wVrJeVCCt"
    }
  }
);
