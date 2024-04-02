import { useState, useEffect, useRef } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { initModImg, pagination } from "./var/inits.js";

import { fetchImagesSearch } from "./services/api";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(initModImg);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

  const loadMore = () => setCurrentPage((prev) => prev + 1);

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
      setCurrentPage(1);
      setQuery(searchTerm);
    }
  };
  useEffect(() => {
    async function fetchImages() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetchImagesSearch(
          query,
          currentPage,
          pagination
        );
        setMaxPage(response.total_pages);
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
  }, [query, currentPage]);

  return (
    <div>
      <SearchBar onSubmit={onSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery photos={photos} openModal={handleModal} ref={listRef} />
      {photos.length !== 0 && currentPage < maxPage && (
        <LoadMoreBtn onLoadMore={loadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        imageModal={imageModal}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}
export default App;
