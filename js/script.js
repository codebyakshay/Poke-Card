const logoReload = document.querySelector(".pokicard");
const pokiContainer = document.querySelector('.container');
const pokiCount = 100;

const colors = {
    fire: '#FDDFDF',
    grass: '#adff2f',
	electric: '#FCF7DE',
	water: '#3ea4f0',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors); 
const fetchPokimon = async () => {
    for(let i = 1; i <= pokiCount; i++) {
        await getPokimon(i);
    }
};

const getPokimon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('item');
    const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokemonId = pokemon.id.toString().padStart(3, '0');

    const pokemonTypeName = pokemon.types.map(type => type.type.name); 
    const type = main_types.find(type => pokemonTypeName.indexOf(type) > -1); 
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokemoninnerHtml = `
    

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
        <div class="info">
            <span class="number">#${pokemonId}</span>
            <h3 class="name"> ${pokemonName}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>    

    `;
    pokemonEl.innerHTML = pokemoninnerHtml;
    pokiContainer.appendChild(pokemonEl);

};

fetchPokimon();

logoReload.addEventListener('click', function (event) {
    window.location.reload();
});
