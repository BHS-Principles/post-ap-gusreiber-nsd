alert("?????");

var TEMP    = document.getElementById("temp");
var CARD    = TEMP.querySelector(".card");
var TARGET  = document.getElementById("target");

class Game{
    constructor( players, deck ){

        this.table          = document.getElementById('target');

        this.players        = players;
        this.deck           = deck;

        this.activePlayer   = players[0];
        this.turn           = 0;
        this.winner;

        this.play();
    }

    play = function(){
        alert("playing the game!");
        // shuffle cards
        this.deck.shuffle();

        // give cards to each player
        for(var i =0; i < this.players.length; i++){
            this.players[i].joinGame(this);
            this.deck.giveCard(this.players[i]);
            alert("I the GAME gave "+ this.players[i].name + " a card");
        }

        // have players take turns
        while( this.gameOn() ){
            this.updateScreen();
        }
        this.whoWon();
        
        alert("this was the funnest game EVER!!!!!");
    }

    updateScreen(){
        // 1st check and see if players are already on the screen
        // if not do this...
        for(var p = 0; p < this.players.length; p++)
            this.players[p].illustrate();

        //else do this..
        // some form of updating the players
    }

    whoWon(){
        this.winner = this.activePlayer;
        alert("We win!! " + this.activePlayer.name);

        return this.activePlayer;
    }

    gameOn(){
        this.activePlayer = this.players[ this.turn%this.players.length ];
        this.turn++;

        return this.turn < 5;

    }





}

class Player{
    constructor(name){
        //The stuff that IS the player
        this.name = name;
        this.hand = [];
        this.inGame;
    }

    joinGame(game){
        this.inGame = game;
    }

    // the stuff the player can do.
    illustrate(){
        // only create the element if it doesn't exist.
        // the element ID is "player_" + this.name

        // DOM will be either the existing element or the new one...
        var dom = document.getElementById("player_" + this.name) ||  document.createElement("div");
        dom.classList.add("player");
        dom.id = "player_" + this.name;

        //only add the cards from the player's hand if they aren't there...
        dom.innerHTML = this.name; // <== and now they aren't for sure!    
        for(var c=0; c <  this.hand.length; c++){ 
            var card = this.hand[c];
            card.illustrate(dom);
        }

        this.inGame.table.append(dom);

    }
    take(card){
        this.hand.push(card);
    }
}
class Deck{

    constructor(numOCards){
    // These are the essential parts of a DECK
        this.cardCount  = numOCards;
        this.cards      = [];

        this.make();
    }
    // These are the skills of a deck
    giveCard( player ){
        var card = this.cards[this.cards.length-1];
        this.cards.length = this.cards.length-1;
        player.take(card);
    }
    
    make(){

        for(var i = 0; i < this.cardCount; i++){
            var card = new Card(i);
            this.cards.push( card );
        }

        return this.cards;
    }

    shuffle(){
        alert("Worst shuffle ever!");
    }

    deal(player){
        alert("I delt to: " + player.name);
    }

}
class Card{
    // WHAT THE CARD IS
    constructor(num){
        this.id     = num;
        this.suit   = Math.floor(num / 13);
        this.value  = num % 13;
        this.pic    = "mine.svg";
    }

    // WHAT IT CAN DO!!!
    illustrate(target){
        target = target || TARGET;
        var cardCopy = CARD.cloneNode(true);
        cardCopy.innerHTML = "silver:" + this.id;
        cardCopy.style.backgroundPositionX = -(this.id) +"00%";
        cardCopy.style.backgroundPositionY =  Math.floor(this.id/-13) +"00%";
        
        target.append(cardCopy);        
    }

}

var steve   = new Player("Steve");
var sue     = new Player("Sue");
var myDeck  = new Deck(52);
new Game( [steve,sue], myDeck );