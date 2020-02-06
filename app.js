/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*------VERSION 1------*/

/*
var scores, roundScore, activePlayer, gamePlaying;//these are defined in the global scope so that we can use/change it everywhere in the program

init();

//DOM manipulation

//the click is an event
//an event listener for the roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    //all of this only happens if the game is playing
    if(gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if(dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

//an event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //stop the game
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    //ternary operator
    //change the active player when the current player rolls a 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //set both currents back to 0 when 1 is rolled
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle adds the class if it's not there, and if it's there to remove
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //remove and replace active class so that the background that indicates which the active player is changes as the players changes
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //when you roll a 1, the dice will disappear
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);//don't add a parenthesis because you don't want to call it right away, you only want to call it when the button is clicked

function init(){
    //score for each player
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;//to keep track of the player that is currently playing; 0-player1 1-player2
    gamePlaying = true;
    
    //we can also use the querySelector to change the CSS of some element
    document.querySelector('.dice').style.display = 'none';//change the dice so that it doesn't show when we first start the game

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
*/

/*
//this is a setter because we set a value
//query selector is really easy to use because it lets us select stuffs exactly the way we do it in CSS the only difference is that it only selects the first element that it finds but there's a solution for that; # to select ids
//textContent is a method to change the text of this element
document.querySelector('#current-' + activePlayer).textContent = dice;//query selector is one of the methods(and the most useful one) that we can use to select elements from our webpage

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'<em>';

//we can use querySelector method to only read values in our webpage and store them in some them in some variable

//this is a getter because we get a value
var x = document.querySelector('#score-0').textContent; //we don't set this a value because we just need to read this and store it to a variable x
console.log(x);
*/


/*
CODING CHALLENGE 6

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out)
3. Add another dice to the game, so that there are 2 dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

/*------VERSION 2------*/

/*var scores, roundScore, activePlayer, gamePlaying, counter, winScore;//these are defined in the global scope so that we can use/change it everywhere in the program

init();

//DOM manipulation

//the click is an event
//an event listener for the roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    //all of this only happens if the game is playing
    if(gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        // Check if dice rolls 6 twice in a row
        dice === 6 ? counter += 1 : counter = 0;

        //3. Update the round score IF the rolled number was NOT a 1
        if(dice !== 1 && counter !== 2) {//if dice is not equal to 1 and the dice has not rolled a 6 twice in a row
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (counter === 2) { //if the dice rolled a 6 twice in a row then set the player's current score and global score to 0 and change to the next player's turn
            
            //document.querySelector("#current-" + activePlayer).innerHTML = 0;
            document.querySelector("#score-" + activePlayer).innerHTML = 0;
            
            scores[activePlayer] = 0;//reset the score back to 0
            nextPlayer();
        } else {
            //Next player
            nextPlayer();
        }
    }
});

//an event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= winningScore()){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //stop the game
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    //ternary operator
    //change the active player when the current player rolls a 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    counter = 0;//counter for rolls of 6 back to 0

    //set both currents back to 0 when 1 is rolled
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle adds the class if it's not there, and if it's there to remove
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //when you roll a 1, the dice will disappear
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);//don't add a parenthesis because you don't want to call it right away, you only want to call it when the button is clicked

function init(){
    //score for each player
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;//to keep track of the player that is currently playing; 0-player1 1-player2
    counter = 0; //counter for the number of rolls of 6 in a row
    
    gamePlaying = true;
    
    //we can also use the querySelector to change the CSS of some element
    document.querySelector('.dice').style.display = 'none';//change the dice so that it doesn't show when we first start the game

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.getElementById("enter").innerHTML = "enter";
}

function winningScore(){
    document.getElementById("enter").innerHTML = "Entered!";
    var num = document.getElementById("number").value;
    if(num){
        return num;
    } else {
        return 100;
    }
}*/

/*------VERSION 3------*/

/*var scores, roundScore, roundScore2, activePlayer, gamePlaying, counter, counter2, winScore;//these are defined in the global scope so that we can use/change it everywhere in the program

init();

//DOM manipulation

//the click is an event
//an event listener for the roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    //all of this only happens if the game is playing
    if(gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        // Check if dice rolls 6 twice in a row
        dice === 6 ? counter += 1 : counter = 0;
        dice2 === 6 ? counter2 += 1 : counter2 = 0;

        //Player 1:
        
        //3. Update the round score IF the rolled number was NOT a 1
        if(dice !== 1 && counter !== 2) {//if dice is not equal to 1 and the dice has not rolled a 6 twice in a row
            //Add score
            roundScore += dice;
            document.querySelector('#current-0').textContent = roundScore;
        } else if (counter === 2) { //if the dice rolled a 6 twice in a row then set the player's current score and global score to 0 and change to the next player's turn
            
            document.querySelector("#current-0").innerHTML = 0;
            document.querySelector("#score-0").innerHTML = 0;
            
            scores[0] = 0;//reset the score back to 0
        } else {
            document.querySelector("#current-0").innerHTML = 0;
            roundScore = 0;
            
            document.querySelector('.dice').style.display = 'none';
        }
        
        //Player 2:
        
        //3. Update the round score IF the rolled number was NOT a 1
        if(dice2 !== 1 && counter2 !== 2) {//if dice is not equal to 1 and the dice has not rolled a 6 twice in a row
            //Add score
            roundScore2 += dice2;
            document.querySelector('#current-1').textContent = roundScore2;
        } else if (counter === 2) { //if the dice rolled a 6 twice in a row then set the player's current score and global score to 0 and change to the next player's turn
            
            document.querySelector("#current-1").innerHTML = 0;
            document.querySelector("#score-1").innerHTML = 0;
            
            scores[1] = 0;//reset the score back to 0
        } else {
            document.querySelector("#current-1").innerHTML = 0;
            roundScore2 = 0;
            
            document.querySelector('.dice2').style.display = 'none';
        }
    }
});

//an event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[0] += roundScore;
        scores[1] += roundScore2;

        //Update the UI
        document.querySelector('#score-0').textContent = scores[0];
        document.querySelector('#score-1').textContent = scores[1];

        //Check if player won the game
        if(scores[0] >= winningScore()){
            document.querySelector('#name-0').textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-0-panel').classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            //stop the game
            gamePlaying = false;
        } else { 
            document.querySelector("#current-0").innerHTML = 0;
            roundScore = 0;
        }
            
        if(scores[1] >= winningScore()){
            document.querySelector('#name-1').textContent = 'Winner!';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-1-panel').classList.add('winner');
            document.querySelector('.player-1-panel').classList.remove('active');
            //stop the game
            gamePlaying = false;
        } else { 
            document.querySelector("#current-1").innerHTML = 0;
            roundScore2 = 0;
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);//don't add a parenthesis because you don't want to call it right away, you only want to call it when the button is clicked

function init(){
    //score for each player
    scores = [0, 0];
    roundScore = 0;
    roundScore2 = 0;
    activePlayer = 0;//to keep track of the player that is currently playing; 0-player1 1-player2
    counter = 0; //counter for the number of rolls of 6 in a row
    counter2 = 0;
    
    gamePlaying = true;
    
    //we can also use the querySelector to change the CSS of some element
    document.querySelector('.dice').style.display = 'none';//change the dice so that it doesn't show when we first start the game
    document.querySelector('.dice2').style.display = 'none';//change the dice so that it doesn't show when we first start the game

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.getElementById("enter").innerHTML = "enter";
}

function winningScore(){
    document.getElementById("enter").innerHTML = "Entered!";
    var num = document.getElementById("number").value;
    //if num is defined/has a value return the inputted num else, return 100
    if(num){
        return num;
    } else {
        return 100;
    }
}*/

/*------VERSION 4------*/

var scores, roundScore, activePlayer, gamePlaying, counter, counter2, winScore;//these are defined in the global scope so that we can use/change it everywhere in the program

init();

//DOM manipulation

//the click is an event
//an event listener for the roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    //all of this only happens if the game is playing
    if(gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        // Check if dice rolls 6 twice in a row
        dice === 6 ? counter += 1 : counter = 0;
        dice2 === 6 ? counter2 += 1 : counter2 = 0;
        
        //3. Update the round score IF the rolled number was NOT a 1
        if(dice !== 1 && dice2 !== 1 && counter !== 2 && counter2 !== 2) {//if dice is not equal to 1 and the dice has not rolled a 6 twice in a row
            //Add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (counter === 2 || counter2 === 2) { //if the dice rolled a 6 twice in a row then set the player's current score and global score to 0 and change to the next player's turn
            
            document.querySelector("#current-" + activePlayer).innerHTML = 0;
            document.querySelector("#score-" + activePlayer).innerHTML = 0;
            
            scores[activePlayer] = 0;//reset the score back to 0
            nextPlayer();
        } else {
            document.querySelector("#current-" + activePlayer).innerHTML = 0;
            roundScore = 0;
            
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            nextPlayer();
        }
    }
});

//an event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= winningScore()){
            document.querySelector('#name-0').textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-0-panel').classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            //stop the game
            gamePlaying = false;
        } else { 
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);//don't add a parenthesis because you don't want to call it right away, you only want to call it when the button is clicked

function nextPlayer() {
    //Next player
    //ternary operator
    //change the active player when the current player rolls a 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    counter = 0;//counter for rolls of 6 back to 0
    counter2 = 0;

    //set both currents back to 0 when 1 is rolled
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle adds the class if it's not there, and if it's there to remove
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //when you roll a 1, the dice will disappear
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function init(){
    //score for each player
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;//to keep track of the player that is currently playing; 0-player1 1-player2
    counter = 0; //counter for the number of rolls of 6 in a row
    counter2 = 0;
    
    gamePlaying = true;
    
    //we can also use the querySelector to change the CSS of some element
    document.querySelector('.dice').style.display = 'none';//change the dice so that it doesn't show when we first start the game
    document.querySelector('.dice2').style.display = 'none';//change the dice so that it doesn't show when we first start the game

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.getElementById("enter").innerHTML = "enter";
}

function winningScore(){
    document.getElementById("enter").innerHTML = "Entered!";
    var num = document.getElementById("number").value;
    //if num is defined/has a value return the inputted num else, return 100
    if(num){
        return num;
    } else {
        return 100;
    }
}










