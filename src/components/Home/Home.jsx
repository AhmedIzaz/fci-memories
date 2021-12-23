import React from "react";
import { Grow, Grid, Typography } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStateValue from "../../StateProvider/StateProvider";
import "./styles.css";
function Home() {
  const [state] = useStateValue();

  return (
    <Grow in>
      <div className="home">
        {!state.user && (
          <Typography
            variant="h4"
            style={{
              color: "white",
              textAlign: "center",
              width: "50%",
              margin: "auto",
            }}
          >
            To create your own memory please signup or login
          </Typography>
        )}
        <Grid container alignItems="stretch">
          <Grid item xs={12} sm={state.user ? 6 : 12} lg={state.user ? 8 : 12}>
            <Posts />
          </Grid>

          {state.user && (
            <Grid item xs={12} sm={6} lg={4}>
              <Form />
            </Grid>
          )}
        </Grid>
      </div>
    </Grow>
  );
}

export default React.memo(Home);
