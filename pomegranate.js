Pomegranates = new Meteor.Collection("Pomegranates", {}); //global variable

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to pomegranate.";
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
         startDate: new Date(),
         goal: $(e.target).find('[name=goal]').val(),
       };
       
       Pomegranates.insert(pomegranate);
     },
   });
 }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
