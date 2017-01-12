QuotesList = new Mongo.Collection('quotes');

QuotesList.schema = new SimpleSchema({
	saying: {type: String},
	author: {type: String}
});

ProgressList = new Mongo.Collection('progress');

ProgressList.schema = new SimpleSchema({
	class: {type: String, defaultValue: "none"},
	day: {type: Number}
});

MissionsList = new Mongo.Collection('missions');

MissionPrompts = new Mongo.Collection('prompts');