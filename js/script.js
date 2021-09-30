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

// Prints Pokemon name and height in the DOM
pokemonList.forEach(pokemon => {
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

