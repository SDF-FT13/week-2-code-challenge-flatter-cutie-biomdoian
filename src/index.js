// Your code here
const characterBar = document.getElementById('character-bar');
const nameDisplay = document.getElementById('name');
const imageDisplay = document.getElementById('image');
const voteCountDisplay = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const votesInput = document.getElementById('votes');
const resetButton = document.getElementById('reset-btn');

fetch('http://localhost:4000/characters') // The json-server I am using port 4000
  .then(response => response.json())
  .then(characters => {
    characters.forEach(character => {
      const characterButton = document.createElement('span');
      characterButton.textContent = character.name;
      characterBar.appendChild(characterButton);

      characterButton.addEventListener('click', () => {
        nameDisplay.textContent = character.name;
        imageDisplay.src = character.image;
        imageDisplay.alt = character.name;
        voteCountDisplay.textContent = character.votes;
        votesInput.value = ''; // Clears the input
        selectedCharacter = character; //This code stores selected character globally for voting.
      });
    });
  });

let selectedCharacter = null; 

            //Voting functionallity

votesForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    if (selectedCharacter) {
        const votesToAdd = parseInt(votesInput.value);
        if (!isNaN(votesToAdd)) {
            // This code updates votes in db.json
            fetch(`http://localhost:4000/characters/${selectedCharacter.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ votes: selectedCharacter.votes + votesToAdd }),
            })
            .then(response => response.json())
            .then(updatedCharacter => {
                selectedCharacter = updatedCharacter; 
                voteCountDisplay.textContent = updatedCharacter.votes;
                votesInput.value = ''; 
                imageDisplay.src = changeGif(updatedCharacter.name);
            });
        }
    }
});

