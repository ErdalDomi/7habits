Template.quotes.helpers({
  'quote': function(){
    var array = QuotesList.find().fetch();
    var quoteArray = [];
    var numberOfQuotes = 3;
    for(var i = 0; i < numberOfQuotes; i++){
      var randomIndex = Math.floor( Math.random() * array.length);
      quoteArray[i] = array[randomIndex];
    }
    return quoteArray;
  },
});
