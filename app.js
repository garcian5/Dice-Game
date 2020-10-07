/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as they whish. Each result get added to their ROUND score
- BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn
- The first player to reach 100/inputed score points on GLOBAL score wins the game
- Player loses entire score when they roll two 6 in a row.

*/

// these are defined in the global scope so that we can use/change it everywhere 
// in the program
var scores, roundScore, activePlayer, gamePlaying, counter, counter2, winScore;

// initiate game
init();

// when the roll button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
    // all of this only happens if the game is playing
    if(gamePlaying) {
        // Randomize dice value
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        // Check if dice rolls 6 twice in a row
        dice === 6 ? counter += 1 : counter = 0;
        dice2 === 6 ? counter2 += 1 : counter2 = 0;
        
        // Update the round score IF the rolled number was NOT a 1
        // if dice is not equal to 1 and the dice has not rolled a 6 twice in a row
        if(dice !== 1 && dice2 !== 1 && counter !== 2 && counter2 !== 2) {
            // Add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // if the dice rolled a 6 twice in a row then set the player's current score and global score to 0 and change to the next player's turn
        } else if (counter === 2 || counter2 === 2) { 
            
            document.querySelector("#current-" + activePlayer).innerHTML = 0;
            document.querySelector("#score-" + activePlayer).innerHTML = 0;

            // reset the score back to 0
            scores[activePlayer] = 0;
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

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= winningScore()){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
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
    var num = document.getElementById("number").value;
    if (num <= 0) {
        document.getElementById("number").value = 10;
        num = 10
    }
    document.getElementById("enter").innerHTML = "Entered!";
    
    // if num is defined/has a value return the inputted num else, return 100
    if(num){
        return num;
    } else {
        return 100;
    }
}










