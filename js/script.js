// Static divs
const overzicht = document.getElementById('overzicht');
const winkelwagen = document.getElementById("winkelwagen");

// Hide winkelwagen
winkelwagen.style.display = "none";

// Thanks to Robin for this method (Object.assign)
// Genre select and button
let genre = [];
var genreSelect = Object.assign(document.createElement('select'), {id: 'genreSelect'});
overzicht.appendChild(genreSelect);

const genreOk = Object.assign(document.createElement('button'), {innerText: 'OK knop', id: 'genreOK'});
overzicht.appendChild(genreOk);

// Rating select and button
let rating = [];
var ratingSelect = Object.assign(document.createElement('select'), {id: 'ratingSelect'});
overzicht.appendChild(ratingSelect);

const ratingOk = Object.assign(document.createElement('button'), {innerText: 'OK knop', id: 'ratingOK'});
overzicht.appendChild(ratingOk);

// Price inputfield and button
var priceInput = Object.assign(document.createElement('input'), {value: 'Prijs inputfield', className: 'price', type: 'text'});
overzicht.appendChild(priceInput);

const priceOk = Object.assign(document.createElement('button'), {innerText: 'OK knop', id: 'priceOK'});
overzicht.appendChild(priceOk);

// Game list
var gameList = Object.assign(document.createElement('section'), {id: 'gameList'});
overzicht.appendChild(gameList);

// Calculate button
const calculateBtn = document.createElement('button');
calculateBtn.innerText = 'Bereken';
calculateBtn.id = 'calculateBtn';
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

            gameCheckbox.value = element.title + '=' + element.price;
            
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
.then(() => {
    // Calculate button
    calculateBtn.addEventListener('click', function () {
        const checkedGames = Array.from(document.querySelectorAll('#gameList input[type="checkbox"]:checked')).map(checkbox => checkbox.value.split('='));
        calculate(checkedGames);
    });
})

function calculate(list) {
   let totalPrice = 0;
   // Creating a remove game label
   const removeGameLabel = document.createElement('label');
   removeGameLabel.id = "removeGameLabel";
   removeGameLabel.innerText = "Klik op de prijs button onderaan om geselecteerde games uit je winkelwagen te verwijderen";
   winkelwagen.appendChild(removeGameLabel);

   //  Make new button for removing selected games  
   const removeSelectedBtn = document.createElement("button");
   removeSelectedBtn.id = "removeGameBtn";

   // Make the 'winkelwagen' div appear and the 'overzicht' div disappear
   overzicht.style.display = "none";
   winkelwagen.style.display = "block";
   winkelwagen.appendChild(gameList);

   // Remove child elements
    while (gameList.firstChild) {
        gameList.removeChild(gameList.firstChild);
    }

    const gamesObjects = list.map(game => {
        return {
            name: game[0],
            price: parseFloat(game[1])
        }
    });

    // Make the selected games appear
    gamesObjects.forEach(element => {
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
            gameLabel.innerText = element['name'];
            gamePriceLabel.innerText = '$' + element['price'];

            gameCheckbox.value = element.name + '=' + element.price;
            
            if (element['price'] == '0') {
                gamePriceLabel.innerText = 'FREE';
            }
        
            // Append label and checkbox
            gameList.appendChild(gameDiv);
            gameDiv.appendChild(gameCheckbox);
            gameDiv.appendChild(gameLabel);
            gameDiv.appendChild(gamePriceLabel);
    })

    // Count price
    gamesObjects.forEach(element => {
        totalPrice += element['price']
    })

    // Put price in remove button and append it to the div
    removeSelectedBtn.innerText = "Prijs: $" + totalPrice;
    winkelwagen.appendChild(removeSelectedBtn);

    removeSelectedBtn.addEventListener('click', function() {
        const selectedGames = document.querySelectorAll('#gameList input[type="checkbox"]:checked');
        
        selectedGames.forEach(game => {

            const gameValue = game.value
            var splitStr = gameValue.substring(gameValue.indexOf('=') + 1);

            game.parentElement.remove();
            totalPrice -= parseFloat(splitStr);
            removeSelectedBtn.innerText = "Prijs: $" + totalPrice.toFixed(2);
        });
    });
}