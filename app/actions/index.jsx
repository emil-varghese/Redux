var axios = require('axios');
//Action Generator for Search
export var changeSearch = (searchText) => {
  return {
    type: 'CHANGE_SEARCH',
    searchText: searchText
  }
};
//Action Generator for Todo
export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  }
};

export var removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id : id
  }
};

//Action Generator for Movies
export var addMovie = (movie,genre) => {
  return {
    type: 'ADD_MOVIE',
    movie,
    genre
  }
};

//Action Generator for Map
export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

//This action is like a function. using dispatch. Thunk is used in cases like this.

export var fetchLocation = () => {
  return (dispatch,getState) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function(res) {
      var loc = res.data.loc;
      var baseUrl = 'http://maps.google.com?q=';

      dispatch(completeLocationFetch(baseUrl + loc));
    });
  }
};
