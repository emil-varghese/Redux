var redux = require('redux');

console.log('Starting');

var stateDefault = {
  searchText: '',
  completed: false,
  todos: [],
  movies: []
}
var todoId = 1;
var movieId = 1;

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

var searchReducer = (state = 'Anonymous' , action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return action.searchText;
    default:
      return state;
  };
};

var todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
          ...state,
          {
            id: todoId++,
            todo: action.todo
          }
        ];
    case 'REMOVE_TODO':
      return  state.filter( (todo) => todo.id !== action.id )
    default:
      return state;
  };
};

var movieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
          ...state,
          {
            id: movieId++,
            name: action.movie,
            genre: action.genre
          }
        ];
    default:
      return state;
  };
};

var reducer = redux.combineReducers({
  searchText: searchReducer,
  todos: todoReducer,
  movies: movieReducer
});

//Create Store, 2nd adds Redux dev tools
var store = redux.createStore(reducer, redux.compose (
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
//Subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('Search is ',state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
  console.log('New State', state);
});
//unsubscribe(); //to unsubscribe

var currentState = store.getState();
console.log('currentState',currentState);

var action = {
  type: 'CHANGE_SEARCH',
  searchText: 'First Search'
};

store.dispatch(action);

store.dispatch({
  type: 'CHANGE_SEARCH',
  searchText: 'Second Search'
});

store.dispatch({
  type: 'ADD_TODO',
  todo: 'Walk the dog'
});

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'Titanic',
  genre: 'Romance'
});

store.dispatch({
  type: 'ADD_TODO',
  todo: 'Trash'
});

store.dispatch({
  type: 'ADD_TODO',
  todo: 'Groceries'
});


store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
});
