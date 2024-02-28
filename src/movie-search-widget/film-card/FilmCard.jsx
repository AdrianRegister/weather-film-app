const FilmCard = ({ title, year, poster, id }) => {
  return (
    <div className="mx-auto bg-sky-300 rounded-lg" key={id}>
      <h2 className="w-56 text-center p-2">{title}</h2>
      {title.length < 25 ? <br /> : null}
      <p className="text-center">{year}</p>
      <br />
      <br />
      {poster === 'N/A' ? (
        <p className="text-center">No image found :(</p>
      ) : (
        <img src={poster} alt={title} className="w-40 mx-auto p-2" />
      )}
    </div>
  );
};

export default FilmCard;
