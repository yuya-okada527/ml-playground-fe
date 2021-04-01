const Config = () => {
  return {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
    similarityModel: process.env.NEXT_PUBLIC_SIMILARITY_MODEL,
  };
};

const config = Config();

export default config;
