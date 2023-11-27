let pokemonRepository = (function () {

let pokemonList = [
    {name: "Bulbasaur", height: 7, type: ['grass', 'poison']}, 
    {name: "Charizard", height: 10, type: ['fire', 'flying']}, 
    {name: "Jigglypuff", height: 4, type: ['normal', 'fairy']}
]
function getAll() {
  return pokemonList;
}
return {
  getAll: getAll,
  add: add
}
})()

pokemonList.forEach (function (pokemon) {
  document.write("<p>" + pokemon.name + " " + "height: " + pokemon.height + ")" + "</p>")
})