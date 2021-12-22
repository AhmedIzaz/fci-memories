import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import useMethods from "./methods/useMethods";
import useStateValue from "./StateProvider/StateProvider";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
function App() {
  const [state, dispatch] = useStateValue();
  const { getAllPosts } = useMethods();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "ADD_USER_TOKEN", token: token });
      !state.user &&
        dispatch({
          type: "ADD_USER",
          user: JSON.parse(localStorage.getItem("user")),
        });
    } else {
      dispatch({ type: "REMOVE_USER_TOKEN" });
      dispatch({ type: "REMOVE_USER" });
      localStorage.clear();
    }
    getAllPosts();
  }, []);

  return (
    <main>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-details/:postId" element={<PostDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
