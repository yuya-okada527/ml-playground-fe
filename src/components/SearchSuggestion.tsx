import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

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
      <AlertTitle>お気に入りの映画を探してみてください。</AlertTitle>
      あなたが好きな映画をもとに、おすすめの映画を紹介します。
    </Alert>
  );
};

export default SearchSuggestion;
