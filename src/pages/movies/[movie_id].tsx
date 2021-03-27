import React, { ChangeEvent } from "react";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import SearchBox from "../../components/SearchBox";
import MovieDetail from "../../components/MovieDetail";
import SimilarMovies from "../../components/SimilarMovies";
import {
  Movie,
  SimilarMoviesResponse,
  AllMovieIdResponse,
} from "../../interfaces";
import config from "../../utils/config";
import { callGetApi } from "../../utils/http";

const fetchMovieData = async (movieId: string): Promise<Movie> => {
  const url = config.apiEndpoint + `/v1/movie/search/${movieId}`;
  const query = {};
  const response = await callGetApi<Movie>(url, query);
  return response;
};
const fetchSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  const url = config.apiEndpoint + `/v1/movie/similar/${movieId}`;
  const query = {
    model_type: "tmdb-sim",
  };
  const response = await callGetApi<SimilarMoviesResponse>(url, query);
  return response.results;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 公開中の映画IDを全て取得
  const url = config.apiEndpoint + "/v1/movie/search/id/all";
  const query = {};
  const res = await callGetApi<AllMovieIdResponse>(url, query);

  // 動的パス用のパラメータを作成
  const paths = res.movie_ids.map((movie_id) => ({
    params: { movie_id: movie_id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // パラメータが未定義の場合
  if (!params) {
    return { props: {} };
  }
  const movieId = Array.isArray(params.movie_id)
    ? params.movie_id[0]
    : params.movie_id;
  // 映画情報を取得
  const movie = await fetchMovieData(movieId);
  // 類似映画情報を取得
  const similarMovies = await fetchSimilarMovies(movieId);

  return { props: { movie: movie, similarMovies: similarMovies } };
};

type DetailPageProps = {
  movie: Movie;
  similarMovies: Movie[];
};

const DetailPage: React.FC<DetailPageProps> = ({ movie, similarMovies }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchTermChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    router.push({
      pathname: "/",
      query: { searchTerm: searchTerm },
    });
  };

  return (
    <Layout
      title={`Movie Recommend ${movie.original_title}`}
      description="映画の詳細情報を表示します。"
    >
      <Grid container>
        <Grid item xs={8}>
          <SearchBox
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
            handleSearchButtonClick={handleSearchButtonClick}
          />
          {movie !== undefined && <MovieDetail movie_detail={movie} />}
        </Grid>
        <Grid item xs={4}>
          <SimilarMovies
            similarMovies={similarMovies}
            movieTitle={movie ? movie.japanese_title : ""}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DetailPage;
