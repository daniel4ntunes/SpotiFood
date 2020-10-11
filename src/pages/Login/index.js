import React, { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";

import { Container, Grid, Button } from "@material-ui/core";

import Logo from "../../components/Logo";

const Login = () => {
  const getHashParams = () => {
    const hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);

    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    window.open(
      `https://accounts.spotify.com/authorize?client_id=26ac2bc242bf4fc380fe114df129e31e&response_type=token&redirect_uri=http://localhost:3002/&scope=user-read-private%20user-read-email&state=34fFs29kd09`,
      "_self"
    );
  };

  const handleLogin = (token, type, expires_in) => {
    localStorage.setItem("@SpotiFood:token", token);
    localStorage.setItem("@SpotiFood:type", type);
    localStorage.setItem("@SpotiFood:expires_in", expires_in);

    window.history.pushState({ urlPath: "/auth" }, "", "/auth");
    window.location.reload();

    return (
      <Switch>
        <Redirect path="/auth" to="/home" />
      </Switch>
    );
  };

  useEffect(() => {
    const { access_token, token_type, expires_in } = getHashParams();

    if (access_token !== undefined) {
      handleLogin(access_token, token_type, expires_in);
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        justify="center"
        style={{ minHeight: "95vh" }}
      >
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<MdExitToApp />}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
