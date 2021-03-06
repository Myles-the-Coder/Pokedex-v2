'strict mode';
const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);
const ce = document.createElement.bind(document);

let pokemonRepository = (() => {
	let pokemonList = [];
	const pokemonContainer = qs('.pokemon-container');
	const loadingIcon = qsa('.loading-icon');
	const searchInput = qs('#search-input');
	const modal = qs('#poke-modal');
	const modalBody = qs('.modal-body');
	let pokeApi = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
	const colors = {
		fire: '#FDDFDF',
		grass: '#DEFDE0',
		electric: '#FCF7DE',
		water: '#DEF3FD',
		ground: '#f4e7da',
		rock: '#d5d5d4',
		fairy: '#fceaff',
		poison: '#98d7a5',
		bug: '#f8d5a3',
		dragon: '#97b3e6',
		psychic: '#eaeda1',
		flying: '#778899',
		fighting: '#E6E0D4',
		normal: '#F5F5F5',
	};
	const main_types = Object.keys(colors);

	const add = pokemon =>
		typeof pokemon === 'object' && pokemonList.push(pokemon);

	const getAll = () => pokemonList;
<<<<<<< HEAD
	const filterPokemon = name =>
		pokemonList.filter(pokemon => pokemon.name === name);
	const capitalize = s => s.toUpperCase().slice(0, 1) + s.slice(1);
=======
	const capitalize = word => word.toUpperCase().slice(0, 1) + word.slice(1);
>>>>>>> 83ebec4fba02054dfa575e0ac2ebde9e7b9a656c

	const addListItem = pokemon => {
		let { name } = pokemon;
<<<<<<< HEAD
		let capitalizedName = capitalize(name);
		const listItem = ce('li');
=======
		const listItem = document.createElement('li');
>>>>>>> 83ebec4fba02054dfa575e0ac2ebde9e7b9a656c
		listItem.classList.add('group-list-item');
		const btn = ce('button');
		btn.classList.add('btn');
		btn.innerText = `${capitalize(name)}`;
		btn.setAttribute('data-bs-toggle', 'modal');
		btn.setAttribute('data-bs-target', '#poke-modal');
		listItem.appendChild(btn);
		pokemonContainer.appendChild(listItem);
		hideLoadingIcon();
		btn.addEventListener('click', () => showDetails(pokemon));
	}

	//Display Pokemon Info in modal
<<<<<<< HEAD
	const showDetails = pokemon => {
		loadDetails(pokemon).then(() => {
			const { name, imageUrl, types } = pokemon;
			const modalHeader = qs('.modal-header');
			const modalTitle = qs('.modal-title');
			const modalBody = qs('.modal-body');
			const pokemonImg = ce('img');
			const pokemonInfo = ce('p');
			const pokemonName = ce('h2');
			const closeModalBtn = ce('button');
			const poke_types = types.map(({ type }) => type.name);
			const type = capitalize(
				main_types.find(type => poke_types.indexOf(type) > -1)
			);
			const color = colors[type[0].toLowerCase() + type.slice(1)];
=======
	const showDetails = async (pokemon) => {
		await loadDetails(pokemon).then(() => {
			const { name, imageUrl, types } = pokemon;
			const modalHeader = document.querySelector('.modal-header');
			const modalTitle = document.querySelector('.modal-title');
			const modalBody = document.querySelector('.modal-body');
			const pokemonImg = document.createElement('img');
			const pokemonInfo = document.createElement('p');
			const pokemonName = document.createElement('h2');
			const closeModalBtn = document.createElement('button');
			const poke_types = types.map(type => type.type.name);
			const type = main_types.find(type => poke_types.includes(type));
			const color = colors[type];
>>>>>>> 83ebec4fba02054dfa575e0ac2ebde9e7b9a656c

			modalBody.style.backgroundColor = color;

			pokemonImg.src = `${imageUrl}`;
			modalTitle.innerText = `${capitalize(name)}`;
			closeModalBtn.innerText = 'X';
			closeModalBtn.setAttribute('data-bs-dismiss', 'modal');

			displayPokemonInfo(pokemon, pokemonInfo);

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

<<<<<<< HEAD
	const displayTypesAndHeight = (pokemon, el) => {
		const { types, height } = pokemon;
		const infoArr = types.map(({ type }) => capitalize(type.name));
		el.innerText = `
      ${
				types.length > 1 ? `Types: ${infoArr.join(',')}` : `Type: ${infoArr[0]}`
			}
      Height: ${height}m
      `;
	}
=======
	const displayPokemonInfo = (pokemon, el) => {
		const { types, height, weight } = pokemon;
		const typesArray = types.map(type => capitalize(type.type.name));
		el.innerText =
			types.length > 1
				? `
        Types: ${typesArray} 
        Height: ${height}m
        Weight: ${weight}
        `
				: `
        Type: ${capitalize(types[0].type.name)} 
        Height: ${height}m`;
	};
>>>>>>> 83ebec4fba02054dfa575e0ac2ebde9e7b9a656c

	const hideLoadingIcon = () =>
		loadingIcon.forEach(icon => icon.classList.add('hidden'));

	const handleError = err => {
		hideLoadingIcon();
		console.error(err);
	};

	//API functions
	const loadList = async () => {
		try {
			const res = await fetch(pokeApi);
			const { results } = await res.json();
<<<<<<< HEAD
			results.forEach(({ name, url }) => {
				let pokemon = { name, detailsUrl: url };
=======
			results.forEach(item => {
				const { name, url } = item;
				let pokemon = { name, url };
>>>>>>> 83ebec4fba02054dfa575e0ac2ebde9e7b9a656c
				add(pokemon);
			});
		} catch (err) {
			handleError(err);
		}
	}

<<<<<<< HEAD
	const loadDetails = async item => {
		let url = item.detailsUrl;
		try {
			const res = await fetch(url);
			const { sprites, height, types } = await res.json();

=======
	const loadDetails = async (item) => {
		let url = item.url;
		try {
			const res = await fetch(url);
			const data = await res.json();
			const { sprites, height, weight, types } = data;
>>>>>>> 83ebec4fba02054dfa575e0ac2ebde9e7b9a656c
			item.imageUrl = sprites.front_default;
			item.height = height;
			item.types = types;
			item.weight = weight;
		} catch (err) {
			handleError(err);
		}
	}

	const filterPokemonList = e => {
		e.preventDefault();
		let pokeList = qsAll('.group-list-item');
		let searchTerm = searchInput.value.toLowerCase();
		pokeList.forEach(pokemon => {
			pokemon.innerText.toLowerCase().includes(searchTerm.toLowerCase())
				? pokemon.classList.remove('hidden')
				: pokemon.classList.add('hidden');
		});
	};

	searchInput.addEventListener('keyup', e => {
		clearTimeout(setTimeout(filterPokemonList(e), 500));
	});

	modal.addEventListener('hidden.bs.modal', () => (modalBody.innerHTML = ''));

	return {
		getAll,
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
