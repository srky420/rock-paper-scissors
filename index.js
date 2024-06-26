document.addEventListener('DOMContentLoaded', () => {

    // Scores
    let playerScore = 0;
    let computerScore = 0;

    // Get results div
    const resultDiv = document.querySelector('#result');

    // Score elems
    const playerScoreEl = document.querySelector('#player-score');
    const computerScoreEl = document.querySelector('#computer-score');

    // Get all game buttons
    const gameBtns = document.querySelectorAll('.game-btn');
    gameBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get player selection
            const playerSelection = e.currentTarget.dataset.playerSelection;
            console.log(playerSelection);

            // Play a round
            const result = playRound(playerSelection);

            switch (result) {
                case 'won':
                    resultDiv.textContent = 'Round Won!';
                    resultDiv.style.color = 'green';
                    playerScore++;
                    break;
                
                case 'lost':
                    resultDiv.textContent = 'Round Lost!';
                    resultDiv.style.color = 'red';
                    computerScore++;
                    break;

                case 'tie':
                    resultDiv.textContent = 'Round Tie!';
                    resultDiv.style.color = 'blue';
                    break;
            }

            // Set score
            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;

            if (playerScore === 5 || computerScore === 5) {
                // Announce winner
                if (playerScore > computerScore) {
                    alert('Player Won!')
                }
                else if (playerScore < computerScore) {
                    alert('Computer Won!')
                }
                else {
                    alert('It is a Tie!')
                }
                // Reset
                playerScore = computerScore = 0;
                playerScoreEl.textContent = '0';
                computerScoreEl.textContent = '0';
                resultDiv.textContent = '';
            }  
        })
    })
});



// Get computer's choice 
function getComputerChoice() {
    // Create random num between 1 and 10
    const random = getRandomNumInRange(1, 3);

    // Check num at 3 levels
    if (random === 1) {
        return 'rock';
    }
    else if (random === 2) {
        return 'paper';
    }
    else {
        return 'scissors';
    }
}

// Plays a round, returning the final statement of who won
function playRound(playerSelection, computerChoice = getComputerChoice()) {
    
    // Convert to lowercase
    playerSelection = playerSelection.toLowerCase();

    // Tie condition
    if (playerSelection === computerChoice) {
        return 'tie';
    }

    // Switch based on player's selection
    if (playerSelection === 'rock' && computerChoice === 'scissors') {
        return 'won';
    }
    else if (playerSelection === 'scissors' && computerChoice === 'paper') {
        return 'won';
    }
    else if (playerSelection === 'paper' && computerChoice === 'rock') {
        return 'won';
    }

    return 'lost';
}

// Play game
function playGame() {

    // Play 5 rounds
    let i = 0;
    let playerScore = 0;
    let computerScore = 0;

    while (i < 5) {
        console.log(`--- ROUND ${i + 1} --- Scores: Player ${playerScore} | Computer ${computerScore}`)

        // Get player selection
        let playerSelection = prompt(`What's your Selection? (Rock, Paper or Scissors):`);

        // If closed prompt
        if (playerSelection === null) {
            console.log('Game closed!')
            return;
        }

        playerSelection = playerSelection.toLowerCase();
        
        // Validate user selection
        if (!/rock|paper|scissors/.test(playerSelection)) {
            console.log('Invalid selection');
            continue;
        }

        // Get computer choice
        let computerChoice = getComputerChoice();

        // Play a round
        let result = playRound(playerSelection, computerChoice);
        
        // Switch on result
        switch (result) {
            case 'won':
                console.log(`Won! ${playerSelection.capitalize()} beats ${computerChoice.capitalize()}`);
                playerScore++;
                break;
            case 'lost':
                console.log(`Lost! ${computerChoice.capitalize()} beats ${playerSelection.capitalize()}`);
                computerScore++;
                break;
            case 'tie':
                console.log(`Tie! ${playerSelection.capitalize()} and ${computerChoice.capitalize()}`);
                continue;
        }
        i++;
    }
    
    // Print final results
    console.log('--- FINAL RESULTS ---');
    console.log(`Player Score: ${playerScore}`);
    console.log(`Computer Score: ${computerScore}`);
    console.log(playerScore > computerScore ? 'Player Won!' : playerScore === computerScore ? 'Tie!' : 'Computer Won!');

    // Play again
    if (confirm('Play Again?')) {
        playGame();
    }
    else {
        console.log('Game closed!')
    }
}