var quotes = ["Sometimes the questions are complicated and the answers are simple. — Dr. Seuss",
			"You don’t have to be a mathematician to have a feel for numbers. — John Forbes Nash",
			"The only way to learn mathematics is to do mathematics. — Paul R. Halmos",
			"Millions saw the apple fall, but Newton asked why. — Bernard Baruch",
			"Wherever there is number, there is beauty. — Proclus",
			"The essence of mathematics lies in its freedom. — Georg Cantor",
			"Mathematics is a language. — Josiah Willard Gibbs",
			"Nature is written in mathematical language. — Galileo Galilei",
			"Go down deep enough into anything and you will find mathematics. — Dean Schlicter",
			"It is impossible to be a mathematician without being a poet in soul. — Sofia Kovalevskaya",
			"Mathematics allows for no hypocrisy and no vagueness. — Stendhal",
			"‘Obvious’ is the most dangerous word in mathematics. — Eric Temple Bell",
			"There should be no such thing as boring mathematics. — Edsger W. Dijkstra",
			"Mathematics is the music of reason. — James Joseph Sylvester",
			"Pure mathematics is, in its way, the poetry of logical ideas. — Albert Einstein"
			];
var currentQuote = 0;
			
function random(currentQuote){
		var randNum = Math.random();
		var lengthOfArray =  quotes.length;
		var randArray = Math.floor(randNum * lengthOfArray);
		if(currentQuote != randArray){
		return randArray;
		}
		else if (randArray < lengthOfArray -1){
		return randArray + 1;
		}
		else {
		return randArray -1; }
};
function quote(){
var newQuote = random(currentQuote);
var res = quotes[newQuote];
currentQuote = newQuote;
return res;
};
