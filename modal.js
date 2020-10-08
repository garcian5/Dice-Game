// Get the modal
var game_modal = document.getElementById("game-modal");

// Get the button that opens the modal
var game_rules = document.getElementById("g-rules");

// Get the <span> element that closes the modal
var close_btn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
game_rules.onclick = function () {
    game_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close_btn.onclick = function () {
    game_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == game_modal) {
        game_modal.style.display = "none";
    }
}