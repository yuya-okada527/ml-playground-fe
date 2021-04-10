import React from "react";
import { createStyles, makeStyles, Theme, IconButton } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thumbUp: {
      position: "absolute",
      bottom: theme.spacing(1.5),
      right: theme.spacing(1),
    },
  })
);

type LikeButtonProps = {
  like: boolean;
  onClick: (_event?: React.MouseEvent<unknown>) => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({ like, onClick }) => {
  const classes = useStyles();
  return (
    <IconButton className={classes.thumbUp} onClick={onClick}>
      {like ? (
        <ThumbUpIcon color="primary" />
      ) : (
        <ThumbUpOutlinedIcon color="primary" />
      )}
    </IconButton>
  );
};

export default LikeButton;
