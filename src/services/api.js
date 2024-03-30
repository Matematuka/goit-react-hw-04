import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const fetchImagesSearch = async () => {
  const response = await instance.get(
    "/search/photos/q_ilJfeXbJ7aLVkUf1TArJA5EUScrQgLm08H3UJvYpI"
  );
  return response.data;
};
