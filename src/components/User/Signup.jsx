import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./authenticationStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMethods from "../../methods/useMethods";
import useStateValue from "../../StateProvider/StateProvider";

// ===============================================
// ===============================================
// ===============================================
// ===============================================
const schema = Yup.object({
  username: Yup.string().min(3).max(20).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(5).max(50).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required(),
});
// ===============================================
// ===============================================
// ===============================================
// ===============================================
function Signup() {
  const [state] = useStateValue();
  const location = useLocation();
  const navigate = useNavigate();
  const { userSignup, userLogout } = useMethods();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    userSignup(data);
  };
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  useEffect(() => state.user && navigate("/"));
  useEffect(() => location.pathname == "/logout" && userLogout());
  // ===============================================
  // ===============================================
  // ===============================================
  // ===============================================
  return (
    <div className="container">
      {" "}
      <Paper className="paper" elevation={3}>
        <form className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                type="text"
                label="username"
                variant="outlined"
                size="small"
                {...field}
                placeholder="username..."
              />
            )}
          />
          <Typography gutterBottom variant="body2" color="secondary">
            {errors.username && errors.username}
          </Typography>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                type="email"
                label="email"
                variant="outlined"
                size="small"
                {...field}
                placeholder="email..."
              />
            )}
          />

          <Typography gutterBottom variant="body2" color="secondary">
            {errors.email && errors.email}
          </Typography>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                label="password"
                variant="outlined"
                size="small"
                {...field}
                placeholder="password..."
              />
            )}
          />

          <Typography gutterBottom variant="body2" color="secondary">
            {errors.password && errors.password}
          </Typography>

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                label="confirm password"
                variant="outlined"
                size="small"
                {...field}
              />
            )}
          />

          <Typography gutterBottom variant="body2" color="secondary">
            {errors.confirmPassword && errors.confirmPassword}
          </Typography>

          <div className="footer">
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
            <div>
              <Typography
                className="form-option"
                component={Link}
                to="/login"
                variant="body2"
                color="textSecondary"
              >
                All ready have an account?
              </Typography>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default React.memo(Signup);
