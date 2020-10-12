import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { MdSentimentDissatisfied } from "react-icons/md";

import Playlist from "../Playlist";

const ListPlaylists = () => {
  const [favorite, setFavorite] = useState({});

  const playlists = useSelector((state) => {
    if (state.playlists.text) {
      return state.playlists.playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(state.playlists.text.toLowerCase())
      );
    }

    return state.playlists.playlists;
  });

  const loading = useSelector((state) => state.playlists.loading);

  const error = useSelector((state) => state.playlists.error);

  const onChangeFavorite = (id) => {
    setFavorite((prevFavorite) => ({
      ...prevFavorite,
      [id]: !prevFavorite[id],
    }));
  };

  if (loading) {
    return (
      <Grid
        container
        alignItems="center"
        alignContent="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item md={12} xs={12}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.error.message}
        </Alert>
      </Grid>
    );
  }

  return (
    <>
      {(playlists &&
        playlists.length > 0 &&
        playlists.map((playlist, key) => (
          <Grid key={key} item lg={4} md={6} xs={12}>
            <Playlist
              item={playlist}
              favorite={favorite[playlist.uri]}
              onChangeFavorite={() => onChangeFavorite(playlist.uri)}
            />
          </Grid>
        ))) || (
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
          justify="center"
          style={{ minHeight: "50vh" }}
        >
          <MdSentimentDissatisfied size={100} />
          <Typography variant="h4" component="h4">
            No results found!
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default ListPlaylists;
