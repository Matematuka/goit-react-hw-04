import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const fetchImagesSearch = async (query) => {
  const response = await instance.get("/search/photos", {
    params: {
      client_id: "1bnOnn5qY0HAwAJR9CN6sX_5D3JT3cSAFzB3seTyYiU",
      query: query,
    },
  });

  return response.data;
};
