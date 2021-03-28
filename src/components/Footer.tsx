import {
  createStyles,
  List,
  ListItem,
  Link as MaterialLink,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

const GITHUB_URL = "https://github.com/yuya-okada527/ml-playground";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      width: "100%",
      height: "25px",
      borderTop: "1px solid black",
      marginTop: theme.spacing(2),
    },
    footerList: {
      paddingTop: theme.spacing(0.5),
    },
    footerListItem: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0),
    },
    githubUrl: {
      paddingLeft: theme.spacing(1),
    },
  })
);

/**
 * フッターを描画する
 */
const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <List className={classes.footerList}>
        <ListItem className={classes.footerListItem}>
          Github:
          <MaterialLink href={GITHUB_URL} className={classes.githubUrl}>
            {GITHUB_URL}
          </MaterialLink>
        </ListItem>
      </List>
    </footer>
  );
};

export default Footer;
