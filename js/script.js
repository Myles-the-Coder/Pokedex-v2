let pokemonRepository = (function () {
	let pokemonList = [];
	const pokemonContainer = document.querySelector('.pokemon-container');
	const loadingIcon = document.querySelectorAll('.loading-icon');
	const searchForm = document.querySelector('#search-form');
	const searchInput = document.querySelector('#search-input');
	const searchBtn = document.querySelector('#button-addon2');
	const modal = document.querySelector('#poke-modal');
	const modalBody = document.querySelector('.modal-body');
	let pokeApi = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

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

	function capitalize(word) {
		return word.toUpperCase().slice(0, 1) + word.slice(1);
	}

	function addListItem(pokemon) {
		let { name } = pokemon;
		let capitalizedName = capitalize(name);
		const listItem = document.createElement('li');
		listItem.classList.add('group-list-item');
		const btn = document.createElement('button');
		btn.classList.add('btn');
		btn.innerText = `${capitalizedName}`;
		btn.setAttribute('data-bs-toggle', 'modal');
		btn.setAttribute('data-bs-target', '#poke-modal');
		listItem.appendChild(btn);
		pokemonContainer.appendChild(listItem);
		hideLoadingIcon();
		btn.addEventListener('click', () => showDetails(pokemon));
	}

	//Display Pokemon Info in modal
	function showDetails(pokemon) {
		loadDetails(pokemon).then(() => {
			const modalHeader = document.querySelector('.modal-header');
			const modalTitle = document.querySelector('.modal-title');
			const modalBody = document.querySelector('.modal-body');

			const pokemonImg = document.createElement('img');
			const pokemonInfo = document.createElement('p');
			const pokemonName = document.createElement('h2');
			const closeModalBtn = document.createElement('button');

			pokemonImg.src = `${pokemon.imageUrl}`;
			modalTitle.innerText = `${capitalize(pokemon.name)}`;
			closeModalBtn.innerText = 'X';
			closeModalBtn.setAttribute('data-bs-dismiss', 'modal');

			displayTypesAndHeight(pokemon, pokemonInfo);

			pokemonName.classList.add('pokemon-name');
			pokemonImg.classList.add('pokemon-sprite-lg');
			pokemonInfo.classList.add('pokemon-info');
			closeModalBtn.classList.add('close-btn');
			closeModalBtn.setAttribute('title', 'Close Modal');
			closeModalBtn.setAttribute('aria-label', 'Close modal');
			modalHeader.appendChild(closeModalBtn);
			modalBody.appendChild(pokemonImg);
			modalBody.appendChild(pokemonInfo);
			hideLoadingIcon();
			closeModalBtn.addEventListener('click', () => {
				modalBody.innerHTML = '';
			});
		});
	}

	function displayTypesAndHeight(pokemon, el) {
		const pokemonInfoArray = [];
		if (pokemon.types.length === 2) {
			pokemon.types.forEach(type => {
				pokemonInfoArray.push(capitalize(type.type.name));
				el.innerText = `
          Types: ${pokemonInfoArray} 
          Height: ${pokemon.height}m
          `;
			});
		} else {
			el.innerText = `
        Type: ${capitalize(pokemon.types[0].type.name)} 
        Height: ${pokemon.height}m`;
		}
	}

	function hideLoadingIcon() {
		loadingIcon.forEach(icon => {
			icon.classList.add('hidden');
		});
	}

	function handleError(err) {
		hideLoadingIcon();
		console.error(err);
	}

	//API functions
	function loadList() {
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
  
	function filterPokemonList(e) {
    e.preventDefault();
    let pokeList = document.querySelectorAll('.group-list-item')
		let searchTerm = searchInput.value.toLowerCase();
		if (searchTerm) {
			pokeList.forEach(pokemon => {
				if (pokemon.innerText.toLowerCase().indexOf(searchTerm) > -1) {
					pokemon.classList.remove('hidden')
				} else {
					pokemon.classList.add('hidden')
				}
			});
		}

    if(searchTerm === '') {
      pokeList.forEach(pokemon => pokemon.classList.remove('hidden'))
    }
	}

	searchForm.addEventListener('submit', e => filterPokemonList(e));
	searchBtn.addEventListener('click', e => filterPokemonList(e));
	searchInput.addEventListener('input', e => filterPokemonList(e));
	modal.addEventListener('hidden.bs.modal', () => (modalBody.innerHTML = ''));

	return {
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
