let pokemonRepository = (function () {

  // let modalContainer = document.querySelector('#modal-container');
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
      //Clear all existing modal content
      modalContainer.innerHTML = '';
      //Bootstrap
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");
      //Bootstrap clear modal get rid of modalContainer innerHTML line?
      modalTitle.empty();
      modalBody.empty();
    
      let modal = document.createElement('div');
      modal.classList.add('modal');
    
      // Add the new modal content
      //Delete closeButtonElement bc of Bootstrap?
     // let closeButtonElement = document.createElement('button');
     // closeButtonElement.classList.add('modal-close');
     // closeButtonElement.innerText = 'Close';
     // closeButtonElement.addEventListener('click', hideModal);
    
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
    
      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height:' + ' ' + pokemon.height;

      let myImage = document.createElement('img');
      myImage.src = pokemon.imageUrl;
      modal.appendChild(myImage);
    
     // modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
    
    
    
      modalContainer.classList.add('is-visible');
    }

   // function hideModal() {
    //  modalContainer.classList.remove('is-visible');
    //}

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
      });
    });
  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal
    };

  }) ();


  

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
