let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function getAll() {
      return pokemonList;
    }

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.classList.add('col-12');
      listItem.classList.add('col-sm-6');
      listItem.classList.add('col-md-4');
      listItem.classList.add('col-xl-3');
      let button = document.createElement('button');
      button.classList.add('list-group-item');
      button.classList.add('btn');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#modal');
      button.innerText = pokemon.name;
      listItem.appendChild(button);
   
      pokemonList.appendChild(listItem);

      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            imageUrl: item.myImage,
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }
    
    function showModal(pokemon) {
    
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");
      
      modalTitle.empty();
      modalBody.empty();
      
      let nameElement = $("<h1>" + pokemon.name + "</h1>");
      let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
      let myImage = $('<img class="modal-img" style="width:50%">');
      myImage.attr("src", pokemon.imageUrl);
    
      modalTitle.append(nameElement);
      modalBody.append(myImage); 
      modalBody.append(heightElement);
 
      $("#modal-container").click(function (){
        $(button).toggle("modal");
        });
    }

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal
    };

  })();


  

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
