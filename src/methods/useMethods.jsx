import axios from "axios";
import React from "react";
import useStateValue from "../StateProvider/StateProvider";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
function useMethods() {
  axios.defaults.withCredentials = true;
  const [state, dispatch] = useStateValue();
  const tokenExpired = () => isExpired(localStorage.getItem("token"));
  const navigate = useNavigate();
  const post_url = "https://fci-memories.herokuapp.com/posts";
  const user_url = "https://fci-memories.herokuapp.com/user";

  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================

  const getAllPosts = () => {
    axios
      .get(`${post_url}/all-post`)
      .then((response) => {
        if (response.data.posts.length > 0) {
          dispatch({ type: "ADD_POSTS", posts: response.data.posts });
          return;
        }
        return;
      })
      .catch((error) => alert(error.message));
  };

  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const onTokenExpired = () => {
    localStorage.clear();
    dispatch({ type: "REMOVE_USER" });
    dispatch({ type: "REMOVE_CURRENT_POST" });
    dispatch({ type: "REMOVE_USER_TOKEN" });
    alert("login first");
    return navigate("/login");
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const createPost = (form_data) => {
    if (tokenExpired()) return onTokenExpired();
    axios
      .post(`${post_url}/create-post`, {
        post: {
          ...form_data,
        },
        token: state.token,
      })
      .then((response) => {
        if (!response.data.created) return alert("post doesn't created! ");
        let posts = state.posts;
        posts.unshift(response.data.new_post);
        dispatch({ type: "ADD_POSTS", posts });
      })
      .catch((error) => alert(error.message));
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const updatePost = (id, title, body) => {
    if (tokenExpired()) return onTokenExpired();
    axios
      .post(`${post_url}/update-post`, {
        new_post: { title, body },
        id: id,
        token: state.token,
      })
      .then((response) => {
        if (!response.data.updated) return alert("post doesn't updated! ");

        let posts = state.posts;
        let the_index = null;
        posts.map((post, index) => {
          if (post._id == id) {
            the_index = index;
          }
        });
        posts[the_index] = response.data.updated_post;
        dispatch({
          type: "ADD_POSTS",
          posts,
        });
        dispatch({ type: "REMOVE_CURRENT_POST" });
      })
      .catch((error) => alert(error.message));
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const deletePost = (id) => {
    if (tokenExpired()) return onTokenExpired();
    axios
      .post(`${post_url}/delete-post`, { _id: id, token: state.token })
      .then((response) => {
        if (!response.data.deleted) return alert("post doesn't deleted!");
        let posts = state.posts.filter((post) => post._id != id);
        dispatch({ type: "ADD_POSTS", posts: posts });
      })
      .catch((error) => alert(error.message));
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const userSignup = ({ username, email, password }) => {
    axios
      .post(`${user_url}/signup`, { user_data: { username, email, password } })
      .then((response) => {
        if (response.data.error) return alert("user cant created!");
        alert("user created successfully!");
        return navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const userLogin = ({ email, password }) => {
    axios
      .post(`${user_url}/login`, { email, password })
      .then((response) => {
        if (!response.data.user || !response.data.token)
          return alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({ type: "ADD_USER", user: response.data.user });
        dispatch({ type: "ADD_USER_TOKEN", token: response.data.token });
        return navigate("/");
      })
      .catch((error) => console.log(error.message));
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================

  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  const userLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    dispatch({ type: "REMOVE_CURRENT_POST" });
    dispatch({ type: "REMOVE_USER_TOKEN" });
    localStorage.clear();
    return navigate("/");
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  return {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    userSignup,
    userLogin,

    userLogout,
  };
}

export default React.memo(useMethods);
