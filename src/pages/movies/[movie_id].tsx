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
  AllSimilarityModelResponse,
} from "../../interfaces";
import config from "../../utils/config";
import { callGetApi } from "../../utils/http";

const fetchMovieData = async (movieId: string): Promise<Movie> => {
  const url = config.apiEndpoint + `/v1/movie/search/${movieId}`;
  const query = {};
  const response = await callGetApi<Movie>(url, query);
  return response;
};
const fetchSimilarMovies = async (
  movieId: string,
  modelType: string
): Promise<Movie[]> => {
  const url = config.apiEndpoint + `/v1/movie/similar/${movieId}`;
  const query = {
    model_type: modelType,
  };
  const response = await callGetApi<SimilarMoviesResponse>(url, query);
  return response.results;
};
const fetchAllMovieId = async (): Promise<AllMovieIdResponse> => {
  // 公開中の映画IDを全て取得
  const url = config.apiEndpoint + "/v1/movie/search/id/all";
  const query = {};
  return await callGetApi<AllMovieIdResponse>(url, query);
};
const fetchAllModels = async (): Promise<AllSimilarityModelResponse> => {
  const url = config.apiEndpoint + "/v1/movie/similar/model/all";
  const query = {};
  return await callGetApi<AllSimilarityModelResponse>(url, query);
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 公開中の映画IDを全て取得
  const allIdRes = await fetchAllMovieId();
  // 類似映画判定モデルを全て取得
  const allModelRes = await fetchAllModels();

  // 動的パス用のパラメータを作成
  const paths: { params: { movie_id: string } }[] = [];
  allModelRes.model_types.forEach((model_type) => {
    allIdRes.movie_ids.forEach((movie_id) => {
      paths.push({
        params: { movie_id: `${movie_id.toString()}_${model_type}` },
      });
    });
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // パラメータが未定義の場合
  if (!params) {
    return { props: {} };
  }
  const data = Array.isArray(params.movie_id)
    ? params.movie_id[0]
    : params.movie_id;
  const movieId = data.split("_")[0];
  const modelType = data.split("_")[1];

  // 映画情報を取得
  const movie = await fetchMovieData(movieId);
  // 類似映画情報を取得
  const similarMovies = await fetchSimilarMovies(movieId, modelType);

  return {
    props: { movie: movie, similarMovies: similarMovies, modelType: modelType },
  };
};

type DetailPageProps = {
  movie: Movie;
  similarMovies: Movie[];
  modelType: string;
};

const DetailPage: React.FC<DetailPageProps> = ({
  movie,
  similarMovies,
  modelType,
}) => {
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
            modelType={modelType}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DetailPage;
