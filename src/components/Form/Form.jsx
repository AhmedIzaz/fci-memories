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

export default Form;

// import React, { useState } from "react";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { TextField, Button, Card, Typography } from "@material-ui/core";
// import { useForm, Controller } from "react-hook-form";
// import FileBase from "react-file-base64";
// import "./createFormStyles.css";
// import useMethods from "../../methods/useMethods";
// import useStateValue from "../../StateProvider/StateProvider";
// import { useNavigate } from "react-router-dom";

// const schema = Yup.object({
//   title: Yup.string().min(3).max(100).required(),
//   body: Yup.string().min(5).required(),
// });
// function Form() {
//   const [state] = useStateValue();
//   const { createPost, updatePost } = useMethods();
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = ({ title, body }) => {
//     if (state.current_post) {
//       updatePost(state.current_post._id, title, body);
//       return;
//     }
//     createPost(title, body, image);
//     navigate("/login");
//     return;
//   };

//   return (
//     <>
//       <Card className="form-wrapper" variant="elevation">
//         <form className="form" onSubmit={handleSubmit(onSubmit)}>
//           <Typography gutterBottom variant="h5">
//             {state.current_post ? "Update the memory" : "Create a memory"}
//           </Typography>
//           <Controller
//             name="title"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 label="Title..."
//                 {...field}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//               />
//             )}
//           />
//           <Typography variant="body2" color="secondary">
//             {errors.title ? errors.title : null}
//           </Typography>
//           <Controller
//             name="body"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 multiline
//                 minRows={3}
//                 maxRows={5}
//                 label="Body..."
//                 {...field}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//               />
//             )}
//           />
//           <Typography variant="body2" color="secondary">
//             {errors.body ? errors.body : null}
//           </Typography>
//           <div className="fileInput">
//             <Typography gutterBottom variant="body2" color="textSecondary">
//               please insert a photo less than 70kb size!
//             </Typography>
//             <Controller
//               name="image"
//               control={control}
//               render={({ field }) => (
//                 <FileBase
//                   onDone={({ base64 }) => setImage({ image: base64 })}
//                   {...field}
//                   type="file"
//                   multiple={false}
//                 />
//               )}
//             />
//           </div>
//           <div className="form-footer">
//             <Button type="submit" variant="outlined" color="primary">
//               {state.current_post ? "Update" : "Create"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </>
//   );
// }

// export default Form;
