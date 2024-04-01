const ImageCard = ({ alt_description, small, id, openModal }) => {
  return (
    <div>
      <img
        id={id}
        src={small}
        alt={alt_description}
        onClick={() => openModal(id)}
        width="240px"
        height="280px"
      />
    </div>
  );
};

export default ImageCard;
