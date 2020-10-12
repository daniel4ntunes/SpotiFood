import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdExitToApp } from "react-icons/md";
import { Container, Grid, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import Filters from "../../components/Filters";
import ListPlaylists from "../../components/ListPlaylists";
import Logo from "../../components/Logo";
import api from "../../services/api";
import {
  loadingPlaylists,
  listPlaylists,
  failurePlaylists,
} from "../../store/actions/playlists";

const Home = () => {
  const [expiredToken, setExpiredToken] = useState(false);

  const hasAuthorization = !!localStorage.getItem("@SpotiFood:token");

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.playlists.filter);

  useEffect(() => {
    const getPlaylists = () => {
      dispatch(loadingPlaylists());
      api
        .get("browse/featured-playlists", { params: filter })
        .then((response) => {
          dispatch(listPlaylists(response.data.playlists.items));
        })
        .catch((error) => {
          dispatch(failurePlaylists(error.response.data));
          if (error.response.status === 401) {
            setExpiredToken(true);
          }
        });
    };

    getPlaylists();

    const interval = setInterval(() => getPlaylists(), 30000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, filter]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid
          container
          direction="row"
          alignItems="center"
          alignContent="center"
          justify="space-between"
        >
          <Logo />
          <Button
            component={Link}
            to="/"
            color="primary"
            size="small"
            startIcon={<MdExitToApp />}
          >
            Log out
          </Button>
        </Grid>
        {hasAuthorization ? (
          (!expiredToken && (
            <>
              <Filters />
              <ListPlaylists />
            </>
          )) || (
            <Grid item md={12} xs={12}>
              <Alert
                severity="error"
                action={
                  <Button component={Link} to="/" color="inherit" size="small">
                    back to login
                  </Button>
                }
              >
                <AlertTitle>Error</AlertTitle>
                Your token <strong>has been expired!</strong>
              </Alert>
            </Grid>
          )
        ) : (
          <Grid item md={12} xs={12}>
            <Alert
              severity="error"
              action={
                <Button component={Link} to="/" color="inherit" size="small">
                  back to login
                </Button>
              }
            >
              <AlertTitle>Error</AlertTitle>
              Sorry, you <strong>don't have access!</strong>
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
