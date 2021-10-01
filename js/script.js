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

  function addListItem(pokemon) {
    let {name} = pokemon
    const pokemonContainer = document.querySelector('.pokemon-container')
    const listItem = document.createElement('li')
    const btn = document.createElement('button')
    pokemonContainer.classList.add('pokemon-container')
    btn.classList.add('btn')
    btn.innerText = `${name}`
    // btn.classList.add('')
    listItem.appendChild(btn)
    pokemonContainer.appendChild(listItem)

    consoleLogPokemon(btn, pokemon)
  }

  //Add event to call showDetails
  function consoleLogPokemon(target, pokemon) {
    target.addEventListener('click', () => showDetails(pokemon))
  }

  //Log Pokemon name to the console
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add,
    getAll,
    filterPokemon,
    addListItem,
    showDetails
  }
})()

pokemonRepository.add({
  name: 'Pikachu',
  heightInMeters: 0.4,
  type: 'Electric'
});

// Prints Pokemon name and height in the DOM
pokemonRepository.getAll().forEach(pokemon => {
  pokemonRepository.addListItem(pokemon)
});

