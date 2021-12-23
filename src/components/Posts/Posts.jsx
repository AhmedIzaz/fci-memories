import { Grid } from "@material-ui/core";
import React from "react";
import Post from "./Post/Post";
import "./styles.css";
import useStateValue from "../../StateProvider/StateProvider";

function Posts() {
  const [state] = useStateValue();
  return (
    <div className="posts-container">
      <Grid container spacing={2}>
        {state.posts &&
          state.posts.map((post) => (
            <Grid className="post-grid" key={post._id} item xs={12} sm={4}>
              <Post post={post} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default React.memo(Posts);
