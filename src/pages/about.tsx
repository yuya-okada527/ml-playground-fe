import {
  Grid,
  Typography,
  Link as MaterialLink,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import Link from "next/link";
import Layout from "../components/Layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    subText: {
      marginBottom: theme.spacing(2),
    },
    link: {
      cursor: "pointer",
    },
  })
);

/**
 * Aboutページをレンダリングします。
 */
const AboutPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Layout title="About Site" description="サイトの説明">
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h5" component="h1" className={classes.title}>
            このサイトについて
          </Typography>
          <Typography variant="body1" className={classes.subText}>
            このサイトは、機械学習を活用したアプリケーションの検証サイトです。
          </Typography>
          <Typography variant="body1" className={classes.subText}>
            現在、以下の機能を提供しています。
          </Typography>
          <Link href="/">
            <MaterialLink className={classes.link}>映画推薦</MaterialLink>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
