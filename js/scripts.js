let pokemonList = [
    {name: "Bulbasaur", height: 7, type: ['grass', 'poison']}, 
    {name: "Charizard", height: 10, type: ['fire', 'flying']}, 
    {name: "Jigglypuff", height: 4, type: ['normal', 'fairy']}
];

for (let i = 0; i < pokemonList[i].length; i++){
  document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + ")");
 if (pokemonList[i].height > 5){
    document.write(' - Wow! That\'s a big!');
 }
}

 // if (pokemonList[i].height <11){
  //  document.write (pokemonList[i].name + ' (height:' + pokemonList[i].height + ')');
   // }