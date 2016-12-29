var redux = require('redux');

console.log('Starting');

var stateDefault = {
  searchText: '',
  completed: false,
  todos: []
}
var reducer = (state = stateDefault, action) => {
    //state = state || {name: 'Anonymous'};

    switch (action.type) {
      case 'CHANGE_SEARCH':
        return {
          ...state,
          searchText: action.searchText
        };
      default:
        return state;
    }
  }

//Create Store, 2nd adds Redux dev tools
var store = redux.createStore(reducer, redux.compose (
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
//Subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('Search is ',state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
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
