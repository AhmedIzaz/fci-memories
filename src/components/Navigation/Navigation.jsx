import React from "react";
import "./styles.css";
import fci_image from "../images/fci.png";
import { Button, Typography, Paper, Grid } from "@material-ui/core";
import useStateValue from "../../StateProvider/StateProvider";
import { Link, useLocation } from "react-router-dom";
import useMethods from "../../methods/useMethods";

function Navigation() {
  const [state] = useStateValue();
  const location = useLocation();
  const { userLogout } = useMethods();
  return (
    <Paper elevation={2} className="header">
      <Grid container>
        <Grid className="left" item lg={8} sm={6} xs={12}>
          <Typography
            style={{ textDecoration: "none" }}
            color="primary"
            component={Link}
            to="/"
            variant="h2"
          >
            FCI Memories
          </Typography>
          <div className="image-container">
            <img style={{ width: "5em" }} className="image" src={fci_image} />
          </div>
        </Grid>
        <Grid className="right" item lg={4} sm={6} xs={12}>
          {state.user ? (
            <>
              <Typography variant="h5" color="textPrimary">
                {state.user.username}
              </Typography>
              <Button
                onClick={() => userLogout()}
                variant="contained"
                color="secondary"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {location.pathname == "/login" ? null : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              )}

              {location.pathname == "/signup" ? null : (
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="inherit"
                >
                  Signup
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default React.memo(Navigation);
