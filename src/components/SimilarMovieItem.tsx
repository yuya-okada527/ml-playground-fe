/* eslint-disable jsx-a11y/anchor-is-valid */
// TODO 暫定対応
import {
  createStyles,
  Grid,
  ListItem,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Image from "material-ui-image";
import React from "react";
import { Movie } from "../interfaces";
import config from "../utils/config";
import { callPostApi } from "../utils/http";
import { makeTitle } from "./MovieDetail";
import LikeButton from "./LikeButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    link: {
      textDecoration: "none",
    },
    similarMovieItem: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(0),
    },
    similarMovieItemPaper: {
      width: "100%",
      transition: "0.3s",
      "&:hover": {
        backgroundColor: "#eee",
        opacity: 0.8,
      },
    },
    similarMovieTitle: {
      margin: theme.spacing(1),
    },
  })
);

type SimilarMovieItemProps = {
  movie: Movie;
  modelType: string;
};

/**
 * 類似映画アイテムを描画する
 */
const SimilarMovieItem: React.FC<SimilarMovieItemProps> = ({
  movie,
  modelType,
}) => {
  const [like, setLike] = React.useState<boolean>(false);
  const classes = useStyles();

  const handleLikeChange = async () => {
    // いいね登録APIを実行する
    const url = config.apiEndpoint + "/v1/user/feedback/like/similar/movie";
    const body = {
      movie_id: movie.movie_id,
      model_type: modelType,
      like: !like,
    };
    await callPostApi(url, JSON.stringify(body));
    setLike(!like);
  };
  return (
    <div className={classes.root}>
      <Link
        href={`/movies/${movie.movie_id}_${modelType}`}
        key={movie.movie_id}
      >
        <a className={classes.link}>
          <ListItem className={classes.similarMovieItem} key={movie.movie_id}>
            <Paper
              className={classes.similarMovieItemPaper}
              variant="outlined"
              square
            >
              <Grid container>
                <Grid item xs={2}>
                  <Image src={movie.poster_url} aspectRatio={9 / 12} />
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    className={classes.similarMovieTitle}
                    variant="h6"
                  >
                    {makeTitle(movie)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        </a>
      </Link>
      <LikeButton like={like} onClick={handleLikeChange} />
    </div>
  );
};

export default SimilarMovieItem;
