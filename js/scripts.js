let pokemonRepository = (function () {

  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

      button.addEventListener('click', function(){
        showDetails(pokemon.name);
      });
    }

    function showDetails(pokemon){
      console.log(pokemon);
    }

    function loadList() {
      return fetch(apiURL).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList
  };
})();

console.log(pokemonRepository.getAll())
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

pokemonRepository.add({
  name: "Slowbro", height: 8, type: ['water', 'psychic']
})
console.log(pokemonRepository.getAll());

