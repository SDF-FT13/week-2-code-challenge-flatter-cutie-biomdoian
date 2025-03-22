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