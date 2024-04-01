import { useState, useEffect, useRef } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
// import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import initModImg from "./var/utils.js";

import { fetchImagesSearch } from "./services/api";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(initModImg);

  const listRef = useRef(null);
  const scrollHeight = useRef(0);

  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({
      behavior: "smooth",
      top: scrollHeight.current,
    });
    scrollHeight.current = listRef.current.clientHeight;
  }, [photos]);

  const handleModal = (id) => {
    {
      setImageModal(
        photos.find((photo) => {
          return photo.id === id;
        })
      );
      setModalIsOpen(true);
    }
  };
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
        setPhotos((photos) => [...photos, ...response.results]);
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
      <ImageGallery photos={photos} openModal={handleModal} ref={listRef} />
      {/* <LoadMoreBtn /> */}
      <ImageModal
        isOpen={modalIsOpen}
        imageModal={imageModal}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}
export default App;
