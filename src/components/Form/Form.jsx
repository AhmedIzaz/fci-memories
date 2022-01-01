import React, { useEffect, useState } from "react";
import { TextField, Button, Card, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import "./createFormStyles.css";
import useMethods from "../../methods/useMethods";
import useStateValue from "../../StateProvider/StateProvider";

function Form() {
  const [state, dispatch] = useStateValue();
  const [form_data, set_form_data] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [current_post, set_current_post] = useState(null);

  const { createPost, updatePost } = useMethods();

  const onChangeHandler = (e) => {
    if (current_post) {
      set_current_post((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } else {
      set_form_data((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current_post) {
      updatePost(current_post._id, current_post.title, current_post.body);
      set_current_post(null);
      return;
    }

    createPost(form_data);
    set_form_data({ title: "", body: "", image: "" });
    return;
  };

  useEffect(() => {
    state.current_post && set_current_post({ ...state.current_post });
  }, [state.current_post]);
  return (
    <>
      <Card className="form-wrapper" variant="elevation">
        <form className="form" onSubmit={onSubmit}>
          <Typography gutterBottom variant="h5">
            {state.current_post ? "Update the memory" : "Create a memory"}
          </Typography>

          <TextField
            label="Title..."
            name="title"
            onChange={onChangeHandler}
            value={current_post ? current_post.title : form_data.title}
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            multiline
            minRows={3}
            maxRows={5}
            label="Body..."
            name="body"
            onChange={onChangeHandler}
            value={current_post ? current_post.body : form_data.body}
            type="text"
            fullWidth
            variant="outlined"
          />

          {!current_post && (
            <div className="fileInput">
              <FileBase
                onDone={({ base64 }) =>
                  set_form_data((prev) => {
                    return { ...prev, image: base64 };
                  })
                }
                type="file"
                multiple={false}
              />
            </div>
          )}

          <div className="form-footer">
            <Button type="submit" variant="outlined" color="primary">
              {state.current_post ? "Update" : "Create"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                dispatch({ type: "REMOVE_CURRENT_POST" });
                set_current_post(null);
              }}
            >
              Clear
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default React.memo(Form);
