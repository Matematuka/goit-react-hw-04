import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
// import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
// import ImageModal from "./components/ImageModal/ImageModal";

import { fetchImagesSearch } from "./services/api";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSearchQuery = (searchTerm) => {
    if (query !== searchTerm) {
      setPhotos([]);
      setQuery(searchTerm);
    }
  };
  useEffect(() => {
    async function fetchImages() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetchImagesSearch(query);
        setPhotos(response.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (query !== "") {
      fetchImages();
    }
  }, [query]);

  return (
    <div>
      <SearchBar onSubmit={onSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {<ImageGallery photos={photos} />}
      {/* <LoadMoreBtn />
      <ImageModal />  */}
    </div>
  );
}
export default App;
