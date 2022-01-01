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
  email: Yup.string().email().required(),
  password: Yup.string().min(5).max(50).required(),
});
// ===============================================
// ===============================================
// ===============================================
// ===============================================
function Login() {
  const [state] = useStateValue();
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin, userLogout } = useMethods();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    userLogin(data);
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
      <Paper className="paper" elevation={3}>
        <form className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="footer">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <div>
              <Typography
                className="form-option"
                component={Link}
                to="/signup"
                variant="body2"
                color="textSecondary"
              >
                "Don't have an account?"
              </Typography>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
