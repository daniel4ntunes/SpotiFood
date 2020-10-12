import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { MdPlayArrow, MdFavoriteBorder, MdFavorite } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 100,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Playlist = ({ item, favorite, onChangeFavorite }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" color="textSecondary">
            PLAYLIST
          </Typography>
          <Typography component="h6" variant="h6">
            {item.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Created by <span>{item.owner.display_name}</span> -{" "}
            {item.tracks.total} songs
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            onClick={() => window.open(item.external_urls.spotify)}
            aria-label="play/pause"
          >
            <MdPlayArrow className={classes.playIcon} />
          </IconButton>
          <IconButton onClick={onChangeFavorite} aria-label="play/pause">
            {(favorite && <MdFavorite color="#ea1d2c" />) || (
              <MdFavoriteBorder />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={item.images[0].url}
        title={item.name}
      />
    </Card>
  );
};

export default Playlist;
