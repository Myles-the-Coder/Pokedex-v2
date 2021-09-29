let pokemonList = [
  {
    name: 'Bulbasaur',
    heightInMeters: 0.7,
    type: ['Grass', 'Poison']
  },
  {
    name: 'Charizard',
    heightInMeters: 1.7,
    type: 'Fire'
  },
  {
    name: 'Squirtle',
    heightInMeters: 0.5,
    type: 'Water'
  }
];

// Prints Pokemon name and height in the DOM
for(let i = 0; i < pokemonList.length; i++) {
  let pokemonName = pokemonList[i].name
  let pokemonHeight = pokemonList[i].heightInMeters

  if (pokemonHeight > 1) {
    document.write('</br>')
    document.write(`${pokemonName}: height(${pokemonHeight}) - Wow, that's big! `)
    document.write('</br>')
  } else {
    document.write('</br>')
    document.write(`${pokemonName}: height(${pokemonHeight}) `);
    document.write('</br>')
  }
}




