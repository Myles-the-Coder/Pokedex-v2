
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      heightInMeters: 0.7,
      type: ['Grass', 'Poison'],
    },
    {
      name: 'Charizard',
      heightInMeters: 1.7,
      type: 'Fire',
    },
    {
      name: 'Squirtle',
      heightInMeters: 0.5,
      type: 'Water',
    },
  ];

  function add(pokemon) {
    function areValidKeys() {
      if (Object.keys(pokemon).includes('name') &&
      Object.keys(pokemon).includes('heightInMeters') &&
      Object.keys(pokemon).includes('type')) {
        return true
      }
    }

    if(typeof pokemon === 'object' && areValidKeys()) {
      return pokemonList.push(pokemon)
    };
  }

  function getAll() {
    return pokemonList
  }

  function filterPokemon(name) {
    return pokemonList.filter(pokemon => pokemon.name === name)
  }

  return {
    add,
    getAll,
    filterPokemon
  }
})()

pokemonRepository.add({
  name: 'Pikachu',
  heightInMeters: 0.4,
  type: 'Electric'
});

// Prints Pokemon name and height in the DOM
pokemonRepository.getAll().forEach(pokemon => {
	let { name, heightInMeters } = pokemon;
  printPokemon(name, heightInMeters)
});

function printPokemon(name, heightInMeters) {
	document.write(
		heightInMeters > 1
			? ` </br> ${name}: height(${heightInMeters}) - Wow, that's big! </br>`
			: ` </br> ${name}: height(${heightInMeters}) </br>`
	);
}

