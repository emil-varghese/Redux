var redux = require('redux');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();
console.log('Starting');

var stateDefault = {
  searchText: '',
  completed: false,
  todos: [],
  movies: []
}

var oldreducer = (state = stateDefault, action) => {
    //state = state || {name: 'Anonymous'};

    switch (action.type) {
      case 'CHANGE_SEARCH':
        return { //Spread operation, Only changes search text and keeps others intact
          ...state,
          searchText: action.searchText
        };
      case 'ADD_TODO':
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: todoId++,
              todo: action.todo
            }
          ]
        };
      case 'REMOVE_TODO':
        return {
          ...state,
          todos: state.todos.filter( (todo) => todo.id !== action.id )

        };
      case 'ADD_MOVIE':
        return {
          ...state,
          movies: [
            ...state.movies,
            {
              id: movieId++,
              name: action.movie,
              genre: action.genre
            }
          ]
        };
      default:
        return state;
    }
}

//Subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  //console.log('Search is ',state.searchText);
  //document.getElementById('app').innerHTML = state.searchText;
  console.log('New State', state);

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="'+ state.map.url + '" target="_blank">View Your Location</a>'
  }
});
//unsubscribe(); //to unsubscribe

store.dispatch(actions.fetchLocation());

var currentState = store.getState();
console.log('currentState',currentState);
/*
var action = {
  type: 'CHANGE_SEARCH',
  searchText: 'First Search'
};
*/
store.dispatch(actions.changeSearch('First Search'));

store.dispatch(actions.changeSearch('Second Search'));

store.dispatch(actions.addTodo('Walk the dog'));

store.dispatch(actions.addMovie('Titanic', 'Romance'));

store.dispatch(actions.addTodo('Trash'));

store.dispatch(actions.addTodo('Groceries'));

store.dispatch(actions.removeTodo(1));
