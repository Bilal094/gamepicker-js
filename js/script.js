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

// Rating Select
let rating = [];
var ratingSelect = document.createElement('Select');
ratingSelect.id = 'ratingSelect';
overzicht.appendChild(ratingSelect);

var ratingOk = document.createElement('button');
ratingOk.id = 'ratingOK';
ratingOk.innerText = 'OK knop';
overzicht.appendChild(ratingOk);

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

// Calculate button
var calculateBtn = document.createElement('button');
calculateBtn.id = 'calculateBtn';
calculateBtn.innerText = 'Bereken'
overzicht.appendChild(calculateBtn);

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

        // Event listener to select and button for genre
        genreOk.addEventListener('click', function() {
            gameList.innerHTML = '';
            const selectedGenre = genreSelect.value;
            if (selectedGenre == 'All') {
                data.forEach(element => {
                    showGames(element);
                })
            } else {
                const filteredGenre = data.filter(data => data.genre === selectedGenre);
                filteredGenre.forEach(element => {
                    showGames(element);
                })
            }
        })

        // Give ratingSelect its values
        if (rating.includes(element['rating'])) {
            null
        } else {
            rating.push(element['rating']);
            var option = document.createElement('option');
            option.text = element['rating'];
            option.value = element['rating'];
            ratingSelect.appendChild(option);
            if (rating.length == 5) {
                var option = document.createElement('option');
                option.text = 'All';
                option.value = 'All';
                ratingSelect.appendChild(option);
            }
        }

        // Event listener to select and button for rating
        ratingOk.addEventListener('click', function() {
            gameList.innerHTML = '';
            const selectedRating = ratingSelect.value;
            if (selectedRating == 'All') {
                data.forEach(element => {
                    showGames(element);
                }) } else {
                const filteredRating = data.filter(data => data.rating <= selectedRating);
                filteredRating.forEach(element => {
                    showGames(element);
                })
            }
        })

        // Price filter
        priceOk.addEventListener('click', function() {
            var price = priceInput.value;
            price = parseInt(price);
            gameList.innerHTML = '';
            filteredPrice = data.filter(data => data.price <= price);
            filteredPrice.forEach(element => {
                showGames(element);
            })
        })

        // Show all games
        showGames(element);

        // Function showing games
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

