let pokemonRepository = (function () {

  let pokemonList = [
      {name: "Bulbasaur", height: 7, type: ['grass', 'poison']}, 
      {name: "Charizard", height: 10, type: ['fire', 'flying']}, 
      {name: "Jigglypuff", height: 4, type: ['normal', 'fairy']}
  ]

    function getAll() {
      return pokemonList;
    }

    function add(item) {
      pokemonList.push(item);
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

    
    }

    function showDetails(pokemon) {
      console.log()
    }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }
})()

console.log(pokemonRepository.getAll())
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
})

pokemonRepository.add({
  name: "Slowbro", height: 8, type: ['water', 'psychic']
})
console.log(pokemonRepository.getAll())

