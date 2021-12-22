export const InitialState = {
  posts: [],
  user: null,
  current_post: null,
  token: null,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_POSTS":
      return {
        ...state,
        posts: action.posts,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.user,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    case "SET_CURRENT_POST":
      return {
        ...state,
        current_post: action.current_post,
      };
    case "REMOVE_CURRENT_POST":
      return {
        ...state,
        current_post: null,
      };
    case "ADD_USER_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "REMOVE_USER_TOKEN":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default Reducer;
