let pokemonRepository = (function () {
	let pokemonList = [];
	let pokeballIcon;
	const pokemonContainer = document.querySelector('.pokemon-container');
	const loadingIcon = document.querySelector('.loading-icon');
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

			closeModalBtn.addEventListener('click', () => {
				modalBody.innerHTML = '';
			});
		});
	}

	function displayTypesAndHeight(pokemon, el) {
		if (pokemon.types.length === 2) {
			const pokemonInfoArray = [];
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

	function showLoadingIcon() {
		pokeballIcon = document.createElement('img');
		pokeballIcon.classList.add('loading-icon');
		pokeballIcon.src =
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDI5YjhiZDktY2I1YS00MWU0LTljN2UtZWU1MTZmYWNlOWJiXC9kYXlvM293LTdhYzg2YzMxLThiMmItNDgxMC04OWYyLWU2MTM0Y2FmMWYyZC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LJBxDkRocQStjZpmj9Injfv73mG2SQZ8X6HNdlP5WHw';
		loadingIcon.appendChild(pokeballIcon);
	}

	function hideLoadingIcon() {
		if (pokeballIcon) {
			pokeballIcon.classList.add('hidden');
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

	function filterPokemon(e) {
		e.preventDefault();
		let searchTerm = searchInput.value.toLowerCase();

		if (searchTerm) {
			pokemonList.filter(pokemon => {
				if (pokemon.name === searchTerm) {
					pokemonContainer.innerHTML = '';
					addListItem(pokemon);
				} else {
					return;
				}
			});
		}
	}

	function restoreList(e) {
		if (e.target.value === '') {
			pokemonContainer.innerHTML = '';
			pokemonList.forEach(pokemon => {
				addListItem(pokemon);
			});
		}
	}

	searchForm.addEventListener('submit', e => filterPokemon(e));
	searchBtn.addEventListener('click', e => filterPokemon(e));
	searchInput.addEventListener('input', e => restoreList(e));
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
