import { useEffect } from "react";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ photos }) => {
  useEffect(() => {});
  return (
    <ul>
      {photos.map(({ id, alt_description, urls }) => {
        return (
          <li key={id}>
            <ImageCard alt_description={alt_description} small={urls.small} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
