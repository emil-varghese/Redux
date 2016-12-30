//Search Reducer
export var searchReducer = (state = 'Anonymous' , action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return action.searchText;
    default:
      return state;
  };
};

var todoId = 1;
var movieId = 1;

//Todo Reducer
export var todoReducer = (state = [], action) => {
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

//Movie Reducer
export var movieReducer = (state = [], action) => {
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

//Map Reducer
export var mapReducer = (state = {isFetching:false, url:undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  };
};
