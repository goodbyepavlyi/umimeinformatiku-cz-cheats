let runInterval = 250;
let gamePlayerInterval;

function request (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => callback(xhr.response);
    xhr.send();
}

const start = () => (gamePlayerInterval = setInterval(() => evaluate(), runInterval));

// Replacing the original evaluate function with our one
evaluate = () => {
    // If the game hasn't finished yet, don't run
    if (finished != 0) return;

    // Stop the timer
    stopTimer();

    // Set the game to finished
    finished = 1;

    // Log the attempt
    logAttempt(user,items[offset].id,answer,1,moves,timePassed,cookieHash);

    // Next item
    nextItem();

    // If there's no item to play anymore, show list
    if (offset == items.length)
        setTimeout(() => showList(), 1000)
}

showList = () => {
    // Stopping the interval from trying to play the game
    clearInterval(gamePlayerInterval);

    // Getting the list and showing it
    request(`${location.protocol}//${location.host}/${recommended_prehled}`, function(response) {
        var parsedDocument = new DOMParser().parseFromString(response, "text/html");
        document.getElementsByTagName('html')[0].innerHTML = parsedDocument.getElementsByTagName('html')[0].innerHTML;
    });
}

// Replacing the original keyPressed function with our one
keyPressed = (event) => {
    // Key code which was pressed on the keyboard
    const { keyCode } = event;

    // Converting the key code to a key
    const key = String.fromCharCode(keyCode);

    // Adding 1 to moves
    moves += 100;
    
    // Adding 1 to correctMoves and moves
    correctMoves += 50;
    
    // Updating the metrics
    updateMetrics(moves,correctMoves,1);

    // Don't know what this is right now
    let userInput = $("#userArea").html(); // User input of the words
    userInput = userInput.substring(0, rowOffset); // Substrings from the beggining to the row offset
    $("#userArea").html(userInput); // User input to the user area
    $("#userArea").append(key); // Appends the key to the user area

    // Next character
    nextCharacter();
};