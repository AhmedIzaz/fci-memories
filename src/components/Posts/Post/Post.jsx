import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete, MoreHorizOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import useMethods from "../../../methods/useMethods";
import moment from "moment";
import useStateValue from "../../../StateProvider/StateProvider";
import "./styles.css";
function Post({ post }) {
  const [state, dispatch] = useStateValue();
  const { deletePost } = useMethods();
  return (
    <Card className="card">
      <CardMedia className="card-media" image={post.image} />
      <div className="card-media-head">
        {state.user && state.user._id == post.author_id && (
          <IconButton
            onClick={() =>
              dispatch({ type: "SET_CURRENT_POST", current_post: post })
            }
            style={{ color: "black", float: "right" }}
          >
            <MoreHorizOutlined />
          </IconButton>
        )}
      </div>
      <CardContent
        component={Link}
        to={`/post-details/${post._id}`}
        className="card-content"
      >
        <div className="card-description">
          <Typography variant="h5" color="textPrimary">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <br />
          <Typography color="textPrimary" variant="body1">
            {post.body.slice(0, 20) + "...."}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="card-actions">
        <Typography variant="body2" color="textSecondary">
          --{post.author_name}
        </Typography>
        {post.author_id == state.user?._id && (
          <IconButton
            className="delete-btn"
            onClick={() => deletePost(post._id)}
            color="secondary"
          >
            <Delete />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
