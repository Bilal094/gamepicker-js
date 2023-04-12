var overzicht = document.getElementById('overzicht');

// Genre button
var genreBtn = document.createElement('button');
genreBtn.classList.add('genre');
genreBtn.innerText = 'Genre dropdown';
overzicht.appendChild(genreBtn);

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
gameList.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque. Vivamus vel mauris a nibh pulvinar laoreet. Curabitur dignissim mattis mi vel dictum. In at auctor urna, gravida blandit nisi. Aenean accumsan, augue id venenatis mollis, eros arcu tempus dolor, eget tempus sem velit et quam. Nam consectetur consectetur quam sed rhoncus. Aenean velit justo, varius ut arcu at, tincidunt lobortis lorem. Sed sollicitudin aliquet turpis at vestibulum. Ut in congue sapien. Sed vitae lectus id dolor pellentesque aliquet. Sed lectus massa, luctus ac ultricies id, dictum sed felis. Nam dignissim, diam a pharetra dapibus, risus dolor finibus augue, ut tincidunt turpis tellus eget est.'
gameList.id = 'gameList'
overzicht.appendChild(gameList);

// Fetch JSON file

fetch('games.json')
.then(response => response.json())
.then(data => console.log(data))