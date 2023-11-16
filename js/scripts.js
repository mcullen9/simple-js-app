let pokemonList = [
    {name: "Bulbasaur", height: 7, type: ['grass', 'poison']}, 
    {name: "Charizard", height: 10, type: ['fire', 'flying']}, 
    {name: "Jigglypuff", height: 4, type: ['normal', 'fairy']}
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write("<p>" + pokemonList[i].name + " " + "height: " + pokemonList[i].height + ")" + "</p>");
 if (pokemonList[i].height > 5){
    document.write(' - Wow! That\'s a big!');
 }
}