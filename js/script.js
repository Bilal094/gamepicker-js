// Get overzicht id
var overzicht = document.getElementById('overzicht');

// Genre Select
let genre = [];
var genreSelect = document.createElement('select');
genreSelect.id = 'genreSelect';
overzicht.appendChild(genreSelect);

var genreOk = document.createElement('button');
genreOk.id = 'genreOK';
genreOk.innerText = 'OK knop';
overzicht.appendChild(genreOk);

// Price inputfield 
var priceInput = document.createElement('input');
priceInput.type = 'text';
priceInput.value = 'Prijs inputfield';
priceInput.classList.add('price');
overzicht.appendChild(priceInput);

var priceOk = document.createElement('button');
priceOk.id = 'priceOK';
priceOk.innerText = 'OK knop';
overzicht.appendChild(priceOk);

// Game list
var gameList = document.createElement('section');
gameList.id = 'gameList'
overzicht.appendChild(gameList);

// Fetch JSON file
fetch('games.json')
.then(response => response.json())
.then(data =>
    data.forEach(element => {
    
        // Give genreSelect its values
        if (genre.includes(element['genre'])) {
            null
        } else {
            genre.push(element['genre']);
            var option = document.createElement('option');
            option.text = element['genre'];
            option.value = element['genre'];
            genreSelect.appendChild(option);
            if (genre.length == 8) {
                var option = document.createElement('option');
                option.text = 'All';
                option.value = 'All';
                genreSelect.appendChild(option);
            }
        }

        // Event listener to select and button
        genreOk.addEventListener('click', function() {
            gameList.innerHTML = '';
            const selectedGenre = genreSelect.value;
            if (selectedGenre == 'All') {
                data.forEach(element => {
                    showGames(element);
                })
            } else {
                const filteredData = data.filter(data => data.genre === selectedGenre);
                filteredData.forEach(element => {
                    showGames(element);
                })
            }
        })

        showGames(element);

        function showGames(element) {
            // Create label and checkbox
            var gameDiv = document.createElement('div');
            var gameLabel = document.createElement('label');
            var gameCheckbox = document.createElement('input');
            var gamePriceLabel = document.createElement('label');
            gameCheckbox.type = 'checkbox';
        
            // Assign id to label and checkbox
            gameCheckbox.id = 'gameCheckbox';
            gameLabel.id = 'gameLabel';
            gameDiv.id = 'gameDiv';
            gamePriceLabel.id = 'gamePriceLabel';
            gameLabel.innerText = element['title'];
            gamePriceLabel.innerText = '$' + element['price'];

            if (element['price'] == '0') {
                gamePriceLabel.innerText = 'FREE';
            }
        
            // Append label and checkbox
            gameList.appendChild(gameDiv);
            gameDiv.appendChild(gameCheckbox);
            gameDiv.appendChild(gameLabel);
            gameDiv.appendChild(gamePriceLabel);
        }
    })
)