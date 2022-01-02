let pokemonRepository = (function () {
	let pokemonList = [];
	const pokemonContainer = document.querySelector('.pokemon-container');
	const loadingIcon = document.querySelectorAll('.loading-icon');
	const searchInput = document.querySelector('#search-input');
	const modal = document.querySelector('#poke-modal');
	const modalBody = document.querySelector('.modal-body');
	let pokeApi = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#778899",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
  };
  const main_types = Object.keys(colors);

	const add = pokemon => {
		if (typeof pokemon === 'object') return pokemonList.push(pokemon);
	};

	const getAll = () => pokemonList;
	const filterPokemon = name =>
		pokemonList.filter(pokemon => pokemon.name === name);
	const capitalize = word => word.toUpperCase().slice(0, 1) + word.slice(1);

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
      const {name, imageUrl, types} = pokemon
			const modalHeader = document.querySelector('.modal-header');
			const modalTitle = document.querySelector('.modal-title');
			const modalBody = document.querySelector('.modal-body');

			const pokemonImg = document.createElement('img');
			const pokemonInfo = document.createElement('p');
			const pokemonName = document.createElement('h2');
			const closeModalBtn = document.createElement('button');

      const poke_types = types.map(type => type.type.name);
      const type = capitalize(main_types.find(type => poke_types.indexOf(type) > -1))
      const color = colors[type[0].toLowerCase() + type.slice(1)];

      modalBody.style.backgroundColor = color

			pokemonImg.src = `${imageUrl}`;
			modalTitle.innerText = `${capitalize(name)}`;
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
			closeModalBtn.addEventListener('click', () => (modalBody.innerHTML = ''));
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

	const hideLoadingIcon = () =>
		loadingIcon.forEach(icon => icon.classList.add('hidden'));

	function handleError(err) {
		hideLoadingIcon();
		console.error(err);
	}

	//API functions
	async function loadList() {
		try {
			const res = await fetch(pokeApi);
			const data = await res.json();
      console.log(data)
			data.results.forEach(item => {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url,
				};
				add(pokemon);
			});
		} catch (err) {
			return handleError(err);
		}
	}

	async function loadDetails(item) {
		let url = item.detailsUrl;
		try {
			const res = await fetch(url);
			const data = await res.json();
			item.imageUrl = data.sprites.front_default;
			item.height = data.height;
			item.types = data.types;
		} catch (err) {
			return handleError(err);
		}
	}

	const filterPokemonList = e => {
		e.preventDefault();
		let pokeList = document.querySelectorAll('.group-list-item');
		let searchTerm = searchInput.value.toLowerCase();
		searchTerm !== ''
			? pokeList.forEach(pokemon => {
					pokemon.innerText.toLowerCase().indexOf(searchTerm) > -1
						? pokemon.classList.remove('hidden')
						: pokemon.classList.add('hidden');
			  })
			: pokeList.forEach(pokemon => pokemon.classList.remove('hidden'));
	};

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

pokemonRepository
	.loadList()
	.then(() =>
		pokemonRepository
			.getAll()
			.forEach(pokemon => pokemonRepository.addListItem(pokemon))
	);
