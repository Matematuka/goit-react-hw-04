import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
// import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
// import ImageGallery from "./components/ImageGallery/ImageGallery";
// import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
// import ImageModal from "./components/ImageModal/ImageModal";

// import { fetchImagesSearch } from "./services/api";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const onSearchQuery = (searchTerm) => {
    setQuery(searchTerm);
  };

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.unsplash.com/photos/?client_id=1bnOnn5qY0HAwAJR9CN6sX_5D3JT3cSAFzB3seTyYiU"
      );
      console.log(response);
      setPhotos(response.data);
      setIsLoading(false);
    }
    fetchImages();
  }, []);

  return (
    <div>
      <SearchBar onSubmit={onSearchQuery} />
      {isLoading && <Loader />}
      {/* {isError && <ErrorMessage />} */}
      {/* <ImageGallery />
      <LoadMoreBtn />
      <ImageModal /> */}
    </div>
  );
}
export default App;
