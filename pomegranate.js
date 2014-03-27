Pomegranates = new Meteor.Collection("Pomegranates", {}); //global variable

if (Meteor.isClient) {
  Accounts.ui.config({
   passwordSignupFields: 'USERNAME_AND_EMAIL'
  });

  Template.hello.greeting = function () {
    return "Welcome to Pomegranate.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });


Template.pomegranatesList.helpers({
    allPomegranates: function () {
       return Pomegranates.find({}, {sort: {startDate: -1}});
     }
   });
 
   Template.pomegranatesList.events({
     'submit #new-pomegranate' : function (e) {
       e.preventDefault(); // don't reload the page like you would by default
                            // instead do some interesting stuff: 
       var pomegranate = {
         userId: Meteor.user()._id, // user id added to document
         startDate: new Date(),
         goal: $(e.target).find('[name=goal]').val(),
       };
       
       Pomegranates.insert(pomegranate);
     },

     'click .delete' : function (e) { //event name is click; selector is anything with delete
      Pomegranates.remove(this._id);
     }
   });
 }

if (Meteor.isServer) {
  // check to see if the appropriate user is signed in to the document
  Meteor.startup(function () {
    var ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
 }
 // if current user matches the document, you are allowed to do these things
 Pomegranates.allow({
   insert: ownsDocument,
   update: ownsDocument,
   remove: ownsDocument,
 });
    // code to run on server at startup
  });
}
