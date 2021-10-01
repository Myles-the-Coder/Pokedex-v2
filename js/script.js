let pokemonRepository = (function () {
	let pokemonList = [];
  let pokeballIcon;
	const pokemonContainer = document.querySelector('.pokemon-container');
	const loadingIcon = document.querySelector('.loading-icon')
  let pokeApi = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		if (typeof pokemon === 'object') {
			return pokemonList.push(pokemon);
		}
	}

	function getAll() {
		return pokemonList;
	}

	function filterPokemon(name) {
		return pokemonList.filter(pokemon => pokemon.name === name);
	}

	function addListItem(pokemon) {
		let { name } = pokemon;
		let capitalizedName = name.toUpperCase().slice(0, 1) + name.slice(1);
		const listItem = document.createElement('li');
		const btn = document.createElement('button');
		pokemonContainer.classList.add('pokemon-container');
		btn.classList.add('btn');
		btn.innerText = `${capitalizedName}`;
		// btn.classList.add('')
		listItem.appendChild(btn);
		pokemonContainer.appendChild(listItem);

		consoleLogPokemon(btn, pokemon);
	}

	//Add event to call showDetails
	function consoleLogPokemon(target, pokemon) {
		target.addEventListener('click', () => showDetails(pokemon));
	}

	//Log Pokemon name to the console
	function showDetails(pokemon) {
		loadDetails(pokemon).then(() => {
      console.log(pokemon)
      const pokemonInfo = document.querySelector('.pokemon-info')
      pokemonInfo.innerHTML = ''
      const pokemonImg = document.createElement('img')
      pokemonImg.src = `${pokemon.imageUrl}`
      pokemonImg.classList.add('pokemon-sprite')
      pokemonInfo.appendChild(pokemonImg)
      pokemonInfo.classList.remove('hidden')
    });
	}

	function showLoadingIcon() {
		pokeballIcon = document.createElement('img');
		pokeballIcon.classList.add('loading-icon');
		pokeballIcon.src =
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDI5YjhiZDktY2I1YS00MWU0LTljN2UtZWU1MTZmYWNlOWJiXC9kYXlvM293LTdhYzg2YzMxLThiMmItNDgxMC04OWYyLWU2MTM0Y2FmMWYyZC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LJBxDkRocQStjZpmj9Injfv73mG2SQZ8X6HNdlP5WHw';
		loadingIcon.appendChild(pokeballIcon);
    pokemonContainer.classList.add('hidden')
	}

	function hideLoadingIcon() {
    if(pokeballIcon) {
      pokeballIcon.classList.add('hidden')
      pokemonContainer.classList.remove('hidden')
    }
	}

	function handleError(err) {
		hideLoadingIcon();
		console.error(err);
	}

	//API functions
	function loadList() {
		showLoadingIcon();
		return fetch(pokeApi)
			.then(res => res.json())
			.then(data => {
				data.results.forEach(item => {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
        hideLoadingIcon();
			})
			.catch(err => handleError(err));
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(res => res.json())
			.then(data => {
				item.imageUrl = data.sprites.front_default;
				item.height = data.height;
				item.types = data.types;
			})
			.catch(err => handleError(err));
	}

	return {
		add,
		getAll,
		filterPokemon,
		loadList,
		loadDetails,
		addListItem,
		showDetails,
	};
})();

pokemonRepository.loadList().then(() => {
	pokemonRepository.getAll().forEach(pokemon => {
		pokemonRepository.addListItem(pokemon);
	});
});
