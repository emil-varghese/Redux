var redux = require('redux');
var thunk = require('redux-thunk').default;

var {searchReducer,todoReducer,movieReducer,mapReducer} = require('./../reducers/index');

export var configure = () => {

  var reducer = redux.combineReducers({
    searchText: searchReducer,
    todos: todoReducer,
    movies: movieReducer,
    map: mapReducer
  });

  //Create Store, 2nd adds Redux dev tools
  var store = redux.createStore(reducer, redux.compose (
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
