let pokemonRepository = (function () {

  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
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
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
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
    
    function showModal(title, text) {
      // Clear all existing modal content
      modalContainer.innerHTML = '';
    
      let modal = document.createElement('div');
      modal.classList.add('modal');
    
      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
    
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
    
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
    
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
    
    
    
      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();


  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });


  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  

  

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




// console.log(pokemonRepository.getAll());

