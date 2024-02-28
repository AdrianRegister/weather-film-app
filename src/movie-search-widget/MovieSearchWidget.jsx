import { useState } from 'react';
import Search from '../components/Search';
import FilmCard from './film-card/FilmCard';

const url = 'http://www.omdbapi.com/?API_KEY_HERE';

const MovieSearchWidget = () => {
  const [filmName, setFilmName] = useState('');
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* useEffect(() => {
    console.log(data);
  }, [data]); */

  function handleSubmit(e) {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    fetch(url + filmName).then((response) =>
      response
        .json()
        .then((films) => {
          const onlyFilms = films.Search.filter(
            (film) => film.Type === 'movie'
          );
          setData(onlyFilms);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        })
    );
    setFilmName('');
  }

  return (
    <div className="bg-sky-200 w-full *:p-1 mt-5 ml-5 rounded-lg col-span-3 shadow-lg">
      <h1 className="bg-sky-100 text-center text-lg font-semibold rounded-t-lg">
        Movie Search Widget
      </h1>
      <Search
        labelText={'Enter film name:'}
        buttonText={'Search'}
        placeholder={'eg. Star Wars'}
        state={filmName}
        SetState={setFilmName}
        handleSubmit={handleSubmit}
      />
      {isLoading ? (
        'Fetching film information...'
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((film) => {
            const { Title, Year, Poster, imdbID } = film;
            return (
              <FilmCard
                key={imdbID}
                title={Title}
                year={Year}
                poster={Poster}
              />
            );
          })}
        </div>
      )}
      {isError && 'There was an error retrieving data.'}
    </div>
  );
};

export default MovieSearchWidget;
