lists = new Meteor.Collection("Lists");

if (Meteor.isClient) {
    /*
    Template.hello.greeting = function () {
	return "my list.";
    };
    
    Template.hello.events({
	'click input': function () {
	    // template data, if any, is available in 'this'
	    if (typeof console !== 'undefined')
		console.log("You pressed the button");
	}
    });
    */
    Template.categories.lists = function(){
	return lists.find({}, {sort: {Category: 1}});
    };
    // We are declaring the 'adding_category' flag
    Session.set('adding_category', false);
    // This returns true if adding_category has been assigned a value of true
    Template.categories.new_cat = function(){
	return Session.equals('adding_category', true);
    };
    Template.categories.events({
	'click #btnNewCat': function(e, t){
	    Session.set('adding_category', true);
	    Meteor.flush();
	    focusText(t.find("#add-category"));
	},
	'keyup #add-category': function(e, t){
	    if (e.which === 13){
		var catVal = String(e.target.value || "");
		if (catVal){
		    lists.insert({Category:catVal});
		    Session.set('adding_category', false);
		}
	    }
	},
	'focusout #add-category': function(e, t){
	    Session.set('adding_category', false);
	}
    });
    /////Generic Helper Functions////
    // this function puts our cursor where it needs to be.
    function focusText(i){
	i.focus();
	i.select();
    };
    Template.list.items = function(){
	if (Session.equals('current_list', null)){
	    return null;
	} else {
	    var cats = lists.findOne({_id:Session.get('current_list')});
	    if (cats&&cats.items)
	    {
		for(var i = 0; i<cats.items.length;i++) {
		    var d = cats.items[i];  d.Lendee = d.LentTo ? d.LentTo :
			"free"; d.LendClass = d.LentTo ?
			"label-important" : "label-success";
		}
		return cats.items;
	    }
	} 
    }
};

if (Meteor.isServer) {
    Meteor.startup(function () {
	// code to run on server at startup
    });
}
