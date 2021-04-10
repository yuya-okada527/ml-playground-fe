import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      marginTop: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  })
);

/**
 * 映画検索の説明を描画する。
 */
const SearchSuggestion: React.FC = () => {
  const classes = useStyles();
  return (
    <Alert severity="info" className={classes.alert}>
      <AlertTitle>
        <Typography variant="subtitle1">
          お気に入りの映画を探してみてください。
        </Typography>
      </AlertTitle>
      <Typography variant="body2">
        あなたが好きな映画をもとに、おすすめの映画を紹介します。
      </Typography>
      <Typography variant="body2">
        おすすめ映画が気にいったら、いいねボタンのご協力お願いします。
      </Typography>
    </Alert>
  );
};

export default SearchSuggestion;
