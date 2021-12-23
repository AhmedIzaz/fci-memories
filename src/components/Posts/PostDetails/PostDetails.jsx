import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStateValue from "../../../StateProvider/StateProvider";
import moment from "moment";
import "./styles.css";
function PostDetails() {
  const { postId } = useParams();
  const [state] = useStateValue();
  const [post, setPost] = useState({});
  useEffect(() => {
    state.posts.map((post) => post._id == postId && setPost(post));
  }, []);
  return (
    <>
      <br />
      <Paper variant="elevation" elevation={2} className="wrapper">
        <div className="post-details">
          <Grid className="details-header" container alignContent="stretch">
            <Grid item xs={10} sm={8}>
              <Typography variant="h5">{post.title}</Typography>
            </Grid>
            <Grid item xs={2} sm={4}>
              <Typography variant="body2" color="textSecondary">
                {moment(post.createdAt).fromNow()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {post.author_name}
              </Typography>
            </Grid>

            <Grid item xs={10} sm={8} style={{ margin: "auto" }}>
              <img
                className="details-image"
                src={post.image}
                alt="post-image"
              />
            </Grid>
          </Grid>
          <Typography
            className="post-details-body"
            align="center"
            gutterBottom
            variant="body1"
          >
            {post.body}
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default PostDetails;
